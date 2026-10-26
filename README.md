# SMSPVA JavaScript / TypeScript SDK

[![CI](https://github.com/SMSPVA/smspva-js/actions/workflows/ci.yml/badge.svg)](https://github.com/SMSPVA/smspva-js/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) ![Status: alpha](https://img.shields.io/badge/status-alpha-orange.svg)

Node.js 22.16+, ESM and CommonJS, with TypeScript declarations. Covers all 56 methods: Activation V2 (20), Rental (22) and Private Email (14). Alternative API is excluded. This is an alpha release. Use the explicit version or the `alpha` tag when installing.

## Installation

```sh
npm install smspva-sdk@alpha
# Or pin the first alpha:
npm install smspva-sdk@0.1.0-alpha.1
```

Build and install from source:

```sh
git clone https://github.com/SMSPVA/smspva-js.git
cd smspva-js
npm ci
npm run build
# In the application that will use the SDK:
npm install /absolute/path/to/smspva-js
```

```js
import { SMSPVA } from 'smspva-sdk';

const client = new SMSPVA({ apiKey: process.env.SMSPVA_API_KEY });
console.log(await client.activation.getBalance());
console.log(await client.rental.getCountries());
console.log(await client.email.getProviders());
```

CommonJS: `const { SMSPVA } = require('smspva-sdk')`. Use the SDK on your server; keep account keys out of browser code. The package has no runtime dependencies and uses Node's native fetch.

## Requests and results

- Wire methods, parameter names and response values follow the source documentation. Price strings, timestamps and IDs are not converted. Optional source fields remain optional in the generated types.
- Activation V2 sends the key in the `apikey` header. Rental and Email use query `apikey`. Public methods send no key. Optional-key Rental methods can omit it with a second argument `{ useApiKey: false }`.
- All documented optional parameters are available, including `partnerkey`, `partner_key`, `provider`, `extend`, pagination and search. Query and path values are encoded. Omitted, undefined or empty Email `pcode` is not sent.
- `rental.getMultiServiceCount` requires `dtype` and `dcount` explicitly: the docs warn against relying on backend defaults for this method. The wire method stays `get_count_multi`.
- No request is retried automatically and no redirect is followed. This includes GET operations that create orders, modify state or trigger charges.

```js
// No key needed for public reference lists.
const publicClient = new SMSPVA();
const providers = await publicClient.email.getProviders();
```

Paid example (run only when you intend to create a rental):

```ts
import { SMSPVA, isNoStock } from 'smspva-sdk';

const client = new SMSPVA({ apiKey: process.env.SMSPVA_API_KEY });
const result = await client.email.createOrder({
  scode: 'CODE_FROM_GET_DATA', dtype: 'week', dcount: 1,
});
if (isNoStock(result)) {
  console.log('No mailbox available; refresh counts before trying again.');
} else {
  console.log(result.data);
}
```

## Waiting for SMS

`activation.receiveSms({ orderid })` returns the original pending envelope for HTTP 202 / `SMS_NOT_YET_RECEIVED`. Use `isPending(result)` to recognise it. Email creation `status=2` similarly stays an ordinary no-stock result, recognised by `isNoStock`.

For repeated waiting requests, calculate an expiry once when your number is created:

```js
// numberResult is the successful response from your own getNumber request.
const expiresAt = Date.now() + numberResult.data.orderExpireIn * 1000;
const result = await client.activation.waitForSms({
  orderid: numberResult.data.orderId,
  expiresAt,
});
```

The helper polls only Receive SMS. It uses a five-second interval by default and does not allow a shorter one; this is a helper policy, not an API-wide rate limit. It stops at the saved deadline, on terminal API errors, transport failures or cancellation. It never creates or cancels an order for you. Reading a newly received SMS can trigger payment.

## Errors, timeouts and cancellation

```js
import { ApiError, TransportError } from 'smspva-sdk';

try {
  console.log(await client.activation.getBalance());
} catch (error) {
  if (error instanceof ApiError) {
    console.error(error.family, error.httpStatus, error.code);
  } else if (error instanceof TransportError) {
    console.error(error.kind, error.outcomeUnknown);
  } else {
    throw error;
  }
}
```

`ApiError.response` retains the original API body. `ProtocolError` means invalid JSON or a missing/invalid status envelope. `RequestTimeoutError` extends `TransportError`; for state-changing operations, `outcomeUnknown` reminds you to check orders before trying again. `PollingTimeoutError` means the saved order deadline passed without a result. Exception messages omit request URLs and keys; redact credentials if your own fetch/logging layer logs query URLs.

The default request timeout is 30 seconds, covering fetch and body reading. Set `timeoutMs` in the constructor or a method's second argument. Pass an `AbortSignal` as `{ signal }` to cancel a request or polling. You can inject `fetch` and override `activationBaseUrl`, `rentalBaseUrl`, `emailBaseUrl` for proxies and local testing.

All generated request and response types are exported from the package. The complete method index is in `METHODS.md`. The generated source is committed. `npm run build` compiles it without needing the documentation source.

## License

MIT. See [LICENSE](LICENSE).

## Development

```sh
npm ci
npm run build
npm test
npm run test:types
npm pack
```

Tests use synthetic fixtures and local HTTP servers; they do not buy numbers or call the production API.

## Documentation

[API documentation](https://docs.smspva.com)

The new documentation is being prepared in English, Spanish and Chinese. Localized links will be added when it is deployed.

The SDK covers Activation V2, Rental and Private Email. Alternative API is not supported.
