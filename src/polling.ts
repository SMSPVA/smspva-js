import { PollingTimeoutError, TransportError, ValidationError } from './errors.js';
import { Transport, type RequestOptions } from './transport.js';
import type { ActivationPending, ActivationReceiveSmsResponse, EmailNoStock } from './types.js';

export function isPending(value: unknown): value is ActivationPending {
  const v=value as ActivationPending|null;
  return !!v && v.statusCode===202 && v.error?.type==='SMS_NOT_YET_RECEIVED';
}
export function isNoStock(value: unknown): value is EmailNoStock { return !!value && (value as EmailNoStock).status===2; }
export interface WaitForSmsOptions extends RequestOptions { orderid: number; expiresAt: number; intervalMs?: number; partnerkey?: string }
function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve,reject)=>{
    const stop=()=>{clearTimeout(timer);signal?.removeEventListener('abort',stop);reject(new TransportError('activation','activation.receiveSms',true,'aborted'));};
    const timer=setTimeout(()=>{signal?.removeEventListener('abort',stop);resolve();},ms);
    signal?.addEventListener('abort',stop,{once:true});
    if(signal?.aborted)stop();
  });
}
export async function waitForSms(transport: Transport, options: WaitForSmsOptions): Promise<Exclude<ActivationReceiveSmsResponse, ActivationPending>> {
  const interval=options.intervalMs??5000;
  if(!Number.isFinite(interval)||interval<5000)throw new ValidationError('intervalMs must be at least 5000 in this helper');
  if(!Number.isFinite(options.expiresAt))throw new ValidationError('expiresAt must be a finite epoch timestamp in milliseconds');
  const deadline=performance.now()+(options.expiresAt-Date.now());
  while(performance.now()<deadline) {
    const remaining=deadline-performance.now();
    const result=await transport.request('activation.receiveSms',{orderid:options.orderid,partnerkey:options.partnerkey},{...options,timeoutMs:Math.max(1,Math.min(options.timeoutMs??transport.timeoutMs,remaining))});
    if(!isPending(result))return result as Exclude<ActivationReceiveSmsResponse, ActivationPending>;
    const left=deadline-performance.now();
    await sleep(Math.max(0,Math.min(interval,left)),options.signal);
    if(left<=interval)throw new PollingTimeoutError();
  }
  throw new PollingTimeoutError();
}
