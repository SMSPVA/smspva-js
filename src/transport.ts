import { operations } from './contracts.js';
import { ApiError, ProtocolError, RequestTimeoutError, TransportError, ValidationError, type Family } from './errors.js';

export interface Schema { type?: string; enum?: unknown[]; minimum?: number; maximum?: number; minLength?: number; maxLength?: number; pattern?: string; [key: string]: unknown }
export interface Operation {
  family: Family; jsName: string; pyName: string; slug: string; path: string; method: string; baseUrl: string;
  auth: 'required' | 'optional' | 'none'; action?: string; stateful: boolean; pending: boolean; noStock: boolean;
  params: Array<{ name: string; in: string; required: boolean; omitEmpty?: boolean; schema: Schema }>;
}
export interface ClientOptions {
  apiKey?: string; timeoutMs?: number; activationBaseUrl?: string; rentalBaseUrl?: string; emailBaseUrl?: string;
  /** Injectable HTTP transport for tests. Account requests belong on your server. */
  fetch?: typeof globalThis.fetch;
}
export interface RequestOptions { timeoutMs?: number; signal?: AbortSignal; useApiKey?: boolean }
export function positiveTimeout(value: number): number {
  if (!Number.isFinite(value) || value <= 0 || value > 2_147_483_647) throw new ValidationError('timeoutMs must be finite, positive and at most 2147483647');
  return value;
}
function baseUrl(value: string): string {
  let url: URL;
  try { url = new URL(value); } catch { throw new ValidationError('Invalid SDK base URL'); }
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password || url.search || url.hash) throw new ValidationError('Base URL must use HTTP(S) without credentials, query or fragment');
  return url.href.replace(/\/$/, '');
}
export class Transport {
  readonly timeoutMs: number;
  #apiKey?: string;
  #fetch: typeof globalThis.fetch;
  #base: Partial<Record<Family, string>>;
  constructor(options: ClientOptions) {
    if (options.apiKey !== undefined && (typeof options.apiKey !== 'string' || !options.apiKey || /[\r\n]/.test(options.apiKey))) throw new ValidationError('apiKey must be a non-empty string without line breaks');
    this.#apiKey = options.apiKey;
    this.timeoutMs = positiveTimeout(options.timeoutMs ?? 30_000);
    this.#fetch = options.fetch ?? globalThis.fetch;
    if (!this.#fetch) throw new ValidationError('A fetch implementation is required');
    this.#base = {};
    for (const family of ['activation','rental','email'] as const) {
      const value = options[`${family}BaseUrl`];
      if (value !== undefined) this.#base[family] = baseUrl(value);
    }
  }
  async request(key: string, input: object, options: RequestOptions = {}): Promise<Record<string, unknown>> {
    const op = operations[key];
    if (!op) throw new ValidationError('Unknown SDK operation');
    if (!input || typeof input !== 'object' || Array.isArray(input)) throw new ValidationError('Parameters must be an object');
    const params = input as Record<string, unknown>;
    const allowed = new Set(op.params.map(p => p.name));
    if (Object.keys(params).some(name => !allowed.has(name))) throw new ValidationError('Unexpected request parameter');
    const query = new URLSearchParams();
    const headers: Record<string,string> = { Accept: 'application/json' };
    let path = op.path;
    if (op.action) query.set('method', op.action);
    for (const p of op.params) {
      const value = params[p.name];
      if (value === undefined || value === null || (p.omitEmpty && value === '')) {
        if (p.required) throw new ValidationError(`Missing required parameter: ${p.name}`);
        continue;
      }
      const s=p.schema;
      if ((s.type==='integer' && (typeof value!=='number' || !Number.isSafeInteger(value))) ||
          (s.type==='number' && (typeof value!=='number' || !Number.isFinite(value))) ||
          (s.type==='string' && typeof value!=='string') || (s.type==='boolean' && typeof value!=='boolean')) throw new ValidationError(`Invalid type for parameter: ${p.name}`);
      if ((s.enum && !s.enum.includes(value)) || (typeof value==='number' && ((s.minimum!==undefined && value<s.minimum)||(s.maximum!==undefined && value>s.maximum))) ||
          (typeof value==='string' && ((s.minLength!==undefined && value.length<s.minLength)||(s.maxLength!==undefined && value.length>s.maxLength)||(s.pattern && !new RegExp(s.pattern).test(value))))) throw new ValidationError(`Invalid value for parameter: ${p.name}`);
      const text=String(value);
      if (p.in==='path') { if(text==='.'||text==='..')throw new ValidationError(`Invalid path parameter: ${p.name}`); path=path.replace('{'+p.name+'}', encodeURIComponent(text)); }
      else if (p.in==='header') { if(/[\r\n]/.test(text))throw new ValidationError(`Invalid header: ${p.name}`); headers[p.name]=text; }
      else query.set(p.name,text);
    }
    if (op.auth==='required' && !this.#apiKey) throw new ValidationError('Set apiKey for this operation');
    if (this.#apiKey && op.auth!=='none' && (op.auth==='required' || options.useApiKey!==false)) {
      if (op.family==='activation') headers.apikey=this.#apiKey; else query.set('apikey',this.#apiKey);
    }
    const url=(this.#base[op.family]??baseUrl(op.baseUrl))+path+(query.size?'?'+query:'');
    const timeout=positiveTimeout(options.timeoutMs??this.timeoutMs);
    const controller=new AbortController();
    let timedOut=false;
    const abort=()=>controller.abort();
    options.signal?.addEventListener('abort',abort,{once:true});
    if(options.signal?.aborted) controller.abort();
    const timer=setTimeout(()=>{timedOut=true;controller.abort();},timeout);
    let response: Response, text: string;
    try {
      if (controller.signal.aborted) throw new Error('Aborted');
      response=await this.#fetch(url,{method:op.method,headers,signal:controller.signal,redirect:'manual',credentials:'omit'});
      text=await response.text();
    } catch {
      if(timedOut)throw new RequestTimeoutError(op.family,key,op.stateful,'timeout');
      throw new TransportError(op.family,key,op.stateful,options.signal?.aborted?'aborted':'network');
    } finally { clearTimeout(timer);options.signal?.removeEventListener('abort',abort); }
    let body: unknown;
    try { body=JSON.parse(text); } catch { throw new ProtocolError(op.family,key,response.status); }
    if(!body || typeof body!=='object' || Array.isArray(body))throw new ProtocolError(op.family,key,response.status);
    const result=body as Record<string,unknown>;
    const error=result.error && typeof result.error==='object' ? result.error as Record<string,unknown> : {};
    const status=op.family==='activation'?result.statusCode:result.status;
    const code=typeof error.type==='string'?error.type:typeof result.errorid==='number'?result.errorid:typeof status==='number'?status:response.status;
    if (!response.ok) throw new ApiError(op.family,key,response.status,code,result);
    if (typeof status!=='number' || !Number.isInteger(status))throw new ProtocolError(op.family,key,response.status);
    if (op.pending && response.status===202 && status===202 && error.type==='SMS_NOT_YET_RECEIVED') return result;
    if (op.noStock && response.status===200 && status===2) return result;
    if (op.family==='activation' ? (status!==200 || !!result.error) : status!==1) throw new ApiError(op.family,key,response.status,code,result);
    return result;
  }
}
