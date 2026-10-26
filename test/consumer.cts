import { SMSPVA } from 'smspva-sdk';
const client = new SMSPVA();
void client.email.getProviders();
// @ts-expect-error Required parameters must be supplied.
void client.activation.getOperators();
