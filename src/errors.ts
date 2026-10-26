export type Family = 'activation' | 'rental' | 'email';

export class SMSPVAError extends Error {
  constructor(message: string) { super(message); this.name = new.target.name; }
}
export class ValidationError extends SMSPVAError {}
export class ApiError extends SMSPVAError {
  constructor(public readonly family: Family, public readonly operation: string, public readonly httpStatus: number,
    public readonly code: string | number, public readonly response: Record<string, unknown>) {
    super(`SMSPVA ${family} request failed (HTTP ${httpStatus})`);
  }
}
export class ProtocolError extends SMSPVAError {
  constructor(public readonly family: Family, public readonly operation: string, public readonly httpStatus: number) {
    super(`SMSPVA ${family} returned an invalid response (HTTP ${httpStatus})`);
  }
}
export class TransportError extends SMSPVAError {
  constructor(public readonly family: Family, public readonly operation: string, public readonly outcomeUnknown: boolean,
    public readonly kind: 'network' | 'timeout' | 'aborted' = 'network') {
    super(`SMSPVA ${family} request ${kind === 'timeout' ? 'timed out' : kind === 'aborted' ? 'was aborted' : 'could not be completed'}; no automatic retry`);
  }
}
export class RequestTimeoutError extends TransportError {}
export class PollingTimeoutError extends SMSPVAError {
  constructor() { super('No SMS result before the saved order deadline'); }
}
