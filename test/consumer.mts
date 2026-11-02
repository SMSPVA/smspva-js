import { SMSPVA, isPending } from 'smspva-sdk';
const client = new SMSPVA({ apiKey: 'example' });
const compact = await client.activation.getAllNumberCountsCompact();
const byCountry = await client.activation.getCountryNumberCountsCompact({ country: 'ua' });
const count: number | undefined = compact.data[0]?.Services.opt20;
const rating: unknown = byCountry.data[0]?.Rating;
void count; void rating;
// @ts-expect-error The country variant requires a country.
await client.activation.getCountryNumberCountsCompact({});
const balance = await client.activation.getBalance();
void balance;
await client.rental.getCountries();
await client.email.getProviders();
const sms = await client.activation.receiveSms({ orderid: 123 });
if (!isPending(sms)) void sms.data;
const completed = await client.activation.waitForSms({ orderid: 123, expiresAt: Date.now() + 60_000 });
void completed.data;
// @ts-expect-error Required path parameter is missing.
await client.activation.getNumber({});
// @ts-expect-error API order IDs are numeric in this operation.
await client.activation.receiveSms({ orderid: '123' });
// @ts-expect-error Unknown query parameter must be rejected.
await client.email.getProviders({ madeUp: true });
