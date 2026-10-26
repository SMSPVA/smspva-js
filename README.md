# SMSPVA JavaScript and TypeScript SDK

[![CI](https://github.com/SMSPVA/smspva-js/actions/workflows/ci.yml/badge.svg)](https://github.com/SMSPVA/smspva-js/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SMSPVA/smspva-js/blob/main/LICENSE) ![Status: alpha](https://img.shields.io/badge/status-alpha-orange.svg)

Official JavaScript and TypeScript client for [SMSPVA](https://smspva.com/), a service for receiving verification SMS, renting phone numbers and renting private email addresses. Use the asynchronous client in Node.js applications, with ESM and CommonJS builds and TypeScript declarations included.

Requires Node.js 22.16 or later. Uses native fetch and has no runtime dependencies. This package is an alpha release.

## Installation

```sh
npm install smspva-sdk@alpha
# Or pin this release:
npm install smspva-sdk@0.1.0-alpha.2
```

## API coverage

The SDK provides 56 methods across three APIs:

| API | Methods | Use it to |
| --- | --- | --- |
| Activation V2 | 20 | Request a number, check availability and receive verification SMS. |
| Rental | 22 | Manage [phone number rentals](https://smspva.com/rent) and retrieve messages for existing orders. |
| Private Email | 14 | Check providers and services, manage [private email rentals](https://smspva.com/rent-mail.html), and read incoming messages. |

Country, service and provider lists come from the live API. Availability and prices can change. Alternative API is not included.

## Quickstart

[Sign in to your SMSPVA account](https://smspva.com/signin.html) and open **Profile and ApiKey** from the account menu. Set the key as the **SMSPVA_API_KEY** environment variable before running a protected request. Keep it on your server and out of source control.

The examples below read your balance and reference data; they do not create an order.

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

## Development

To build from source and run the local checks:

```sh
git clone https://github.com/SMSPVA/smspva-js.git
cd smspva-js
npm ci
npm run build
npm test
npm run test:types
npm pack
```

Tests use synthetic fixtures and local HTTP servers; they do not buy numbers or call the production API.

## Documentation and support

Read the [SMSPVA API documentation](https://docs.smspva.com/) for endpoint parameters, response codes and the activation, rental and email workflows. The [method index](https://github.com/SMSPVA/smspva-js/blob/main/METHODS.md) maps every SDK method to its API operation.

For account, billing or service questions, visit the [SMSPVA help center](https://smspva.com/help.html). Report SDK bugs through this repository's issues, without API keys or private message content.

## License

MIT. See [LICENSE](https://github.com/SMSPVA/smspva-js/blob/main/LICENSE).
