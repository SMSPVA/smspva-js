import { Transport, type ClientOptions } from './transport.js';
import { Activation, Rental, Email } from './resources.js';
export * from './types.js';
export * from './errors.js';
export { isPending, isNoStock } from './polling.js';
export type { WaitForSmsOptions } from './polling.js';
export type { ClientOptions, RequestOptions } from './transport.js';

export class SMSPVA {
  readonly activation: Activation;
  readonly rental: Rental;
  readonly email: Email;
  constructor(options: ClientOptions = {}) {
    const transport=new Transport(options);
    this.activation=new Activation(transport);
    this.rental=new Rental(transport);
    this.email=new Email(transport);
  }
}
