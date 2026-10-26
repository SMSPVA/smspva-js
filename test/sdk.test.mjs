import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
import { SMSPVA, ApiError, ProtocolError, TransportError, RequestTimeoutError, ValidationError, PollingTimeoutError, isPending, isNoStock } from '../dist/esm/index.js';

const cases=JSON.parse(await readFile(new URL('./cases.json',import.meta.url),'utf8'));
const secret='sdk-local-key-+&?=/';
async function mock(t) {
  const received=[];
  const state={http:200,body:{},delay:0,redirect:false};
  const server=createServer((request,response)=>{
    received.push({method:request.method,url:new URL(request.url,'http://localhost'),headers:request.headers});
    const send=()=>{response.writeHead(state.http,{'Content-Type':'application/json',...(state.redirect?{Location:'/redirect-target'}:{})});response.end(typeof state.body==='string'?state.body:JSON.stringify(state.body));};
    if(state.delay)setTimeout(send,state.delay);else send();
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  t.after(()=>new Promise(resolve=>{server.closeAllConnections();server.close(resolve);}));
  const base=`http://127.0.0.1:${server.address().port}`;
  const client=new SMSPVA({apiKey:secret,activationBaseUrl:base,rentalBaseUrl:base,emailBaseUrl:base});
  return {state,received,client,base};
}
test('all 56 methods use the original wire paths, verbs, names, parameters and auth',async t=>{
  const {state,received,client}=await mock(t);
  assert.equal(cases.length,56);
  for(const c of cases) {
    received.length=0;state.body=c.response;
    const result=await client[c.family][c.jsName](c.params);
    assert.deepEqual(result,c.response);
    assert.equal(received.length,1,c.key);
    const request=received[0];
    assert.equal(request.method,c.method,c.key);
    const expectedPath=c.path.replace(/\{(\w+)\}/g,(_,k)=>encodeURIComponent(String(c.params[k])));
    assert.equal(request.url.pathname,expectedPath,c.key);
    assert.equal(request.url.searchParams.get('method'),c.action??null,c.key);
    assert.equal(request.headers.apikey,c.family==='activation'?secret:undefined,c.key);
    assert.equal(request.url.searchParams.get('apikey'),c.family!=='activation'&&c.auth!=='none'?secret:null,c.key);
    for(const [name,value] of Object.entries(c.params)) {
      if(c.path.includes('{'+name+'}'))continue;
      if(name==='partnerkey')assert.equal(request.headers[name],String(value));
      else assert.equal(request.url.searchParams.get(name),String(value),c.key+'/'+name);
    }
  }
  assert.equal(client.alternative,undefined);
  assert.ok(!JSON.stringify(client).includes(secret));
});
test('public/optional auth, URL encoding and absent/empty provider values',async t=>{
  const {state,received,client,base}=await mock(t);state.body={status:1,data:[]};
  await client.email.getData();assert.equal(received.at(-1).url.searchParams.has('pcode'),false);
  await client.email.getData({pcode:''});assert.equal(received.at(-1).url.searchParams.has('pcode'),false);
  await client.email.getData({pcode:undefined});assert.equal(received.at(-1).url.searchParams.has('pcode'),false);
  await client.email.getData({pcode:'provider.new'});assert.equal(received.at(-1).url.searchParams.get('pcode'),'provider.new');
  await client.rental.getData({country:'UK'},{useApiKey:false});assert.equal(received.at(-1).url.searchParams.has('apikey'),false);
  const publicClient=new SMSPVA({rentalBaseUrl:base,emailBaseUrl:base});
  await publicClient.rental.getCountries();await publicClient.email.getProviders();
  await client.email.getMails({orderid:123,t:50,s:0,sq:'code: a+b & 中文 /?'});
  assert.equal(received.at(-1).url.searchParams.get('sq'),'code: a+b & 中文 /?');
  state.body={statusCode:200,data:[]};
  await client.activation.getOperators({country:'UK /+&?中文'});
  assert.equal(decodeURIComponent(received.at(-1).url.pathname),'/activation/operators/UK /+&?中文');
});
test('pending SMS and no-stock creation retain their original result codes',async t=>{
  const {state,client}=await mock(t);
  state.http=202;state.body={statusCode:202,error:{type:'SMS_NOT_YET_RECEIVED',description:'Waiting for SMS'}};
  const pending=await client.activation.receiveSms({orderid:123});assert.ok(isPending(pending));assert.equal(pending.statusCode,202);
  state.http=200;state.body={status:2};
  const empty=await client.email.createOrder({scode:'twitter',dtype:'week',dcount:1});assert.ok(isNoStock(empty));assert.equal(empty.status,2);
  await assert.rejects(client.email.getOrders(),ApiError);
});
test('API, HTTP and invalid-response errors remain distinguishable and redact credentials',async t=>{
  const {state,received,client}=await mock(t);
  for(const body of [{status:0,msg:'Incorrect order id'},{status:0,errorid:9,errormsg:'Provider not found'}]) {
    state.body=body;
    await assert.rejects(client.email.getOrders(),e=>{assert.ok(e instanceof ApiError);assert.deepEqual(e.response,body);assert.equal(e.httpStatus,200);assert.ok(!String(e).includes(secret));return true;});
  }
  state.http=410;state.body={statusCode:410,error:{type:'ORDER_CLOSED',description:'Closed'}};
  await assert.rejects(client.activation.receiveSms({orderid:123}),e=>e instanceof ApiError&&e.code==='ORDER_CLOSED'&&e.httpStatus===410);
  state.http=402;state.body={statusCode:402,error:{type:'ACCESS_LIMITED'}};
  await assert.rejects(client.activation.getBalance(),e=>e instanceof ApiError&&e.httpStatus===402);
  state.http=503;state.body={status:1,data:[]};await assert.rejects(client.rental.getCountries(),ApiError);
  state.http=200;
  for(const body of ['', '<html>not JSON</html>', 'null','[]',{}, {status:'1'}, {status:true}]) {state.body=body;await assert.rejects(client.rental.getCountries(),ProtocolError);}
  state.body={statusCode:200,error:{type:'OTHER'}};await assert.rejects(client.activation.getBalance(),ApiError);
  received.length=0;state.http=302;state.redirect=true;state.body={};
  await assert.rejects(client.rental.getCountries(),ApiError);assert.equal(received.length,1,'redirects must never be followed');
});
test('validation rejects mistakes before making any request',async t=>{
  const {received,client}=await mock(t);
  for(const run of [
    ()=>client.activation.getNumber({country:'UK',service:'opt20',voice:3}),
    ()=>client.activation.receiveSms({orderid:1.5}),
    ()=>client.activation.getOperators({country:'..'}),
    ()=>client.email.createOrder({scode:'twitter',dtype:'week',dcount:0}),
    ()=>client.email.getOrders({method:'cancel_order'}),
    ()=>client.activation.getBalance({}, {timeoutMs:NaN}),
    ()=>client.rental.getMultiServiceCount({country:'UK',services:'opt20,opt29'}),
    ()=>new SMSPVA().activation.getBalance(),
  ])await assert.rejects(run,ValidationError);
  assert.equal(received.length,0);
  assert.throws(()=>new SMSPVA({apiKey:'key\r\nheader: injected'}),ValidationError);
  assert.throws(()=>new SMSPVA({emailBaseUrl:'https://secret:password@example.com'}),ValidationError);
});
test('timeouts and cancellation never retry; paid-request outcome remains explicit',async t=>{
  const {state,received,client}=await mock(t);state.delay=150;state.body={status:1,data:{}};
  await assert.rejects(client.email.createOrder({scode:'twitter',dtype:'week',dcount:1},{timeoutMs:25}),e=>e instanceof RequestTimeoutError&&e.outcomeUnknown===true);
  assert.equal(received.length,1);
  const controller=new AbortController();controller.abort();
  await assert.rejects(client.email.getOrders({}, {signal:controller.signal}),e=>e instanceof TransportError&&e.kind==='aborted');
  assert.equal(received.length,1);
  const failing=new SMSPVA({apiKey:secret,fetch:async()=>{throw new Error('URL contains '+secret);}});
  await assert.rejects(failing.activation.getNumber({country:'UK',service:'opt20'}),e=>e instanceof TransportError&&e.outcomeUnknown&&!String(e).includes(secret));
});
test('polling uses a saved deadline, returns success, and stops on terminal responses',async t=>{
  const {state,received,client}=await mock(t);state.body={statusCode:200,data:{sms:{code:'12:34',fullText:'code: 12:34'}}};
  const value=await client.activation.waitForSms({orderid:123,expiresAt:Date.now()+1000});assert.equal(value.data.sms.code,'12:34');
  received.length=0;
  await assert.rejects(client.activation.waitForSms({orderid:123,expiresAt:Date.now()-1}),PollingTimeoutError);assert.equal(received.length,0);
  state.http=202;state.body={statusCode:202,error:{type:'SMS_NOT_YET_RECEIVED'}};
  await assert.rejects(client.activation.waitForSms({orderid:123,expiresAt:Date.now()+80}),PollingTimeoutError);assert.equal(received.length,1);
  received.length=0;state.http=410;state.body={statusCode:410,error:{type:'ORDER_CLOSED'}};
  await assert.rejects(client.activation.waitForSms({orderid:123,expiresAt:Date.now()+1000}),ApiError);assert.equal(received.length,1);
});
test('both ESM import and CommonJS require expose the packaged client',async()=>{
  const require=createRequire(import.meta.url);const cjs=require('smspva-sdk');
  assert.equal(typeof cjs.SMSPVA,'function');assert.equal(typeof (await import('smspva-sdk')).SMSPVA,'function');
  assert.equal(new cjs.SMSPVA().alternative,undefined);
});
