// Generated from docs/data. Edit sdk/scripts/generate.mjs.
export type ActivationGetBalanceResponse = { "statusCode"?: number; "data"?: { "balance"?: string } };
export type ActivationGetBalanceParams = Record<string, never>;

export type ActivationGetUserInfoResponse = { "statusCode"?: number; "data"?: { "balance"?: string; "name"?: string; "karma"?: number } };
export type ActivationGetUserInfoParams = Record<string, never>;

export type ActivationGetOperatorsResponse = { "statusCode"?: number; "data"?: { "country"?: string; "operators"?: Array<string> } };
export interface ActivationGetOperatorsParams { "country": string }

export type ActivationGetConversionsResponse = { "statusCode"?: number; "data"?: { "service"?: string; "conversions"?: Record<string, number> } };
export interface ActivationGetConversionsParams { "service": string }

export type ActivationGetMessageTypeSettingsResponse = { "statusCode": 200; "data": Array<{ "country": string; "service": string; "operator": string; "voice": 0 | 1; "caller": 0 | 1; "sms": 0 | 1 }> };
export type ActivationGetMessageTypeSettingsParams = Record<string, never>;

export type ActivationGetAllNumberCountsResponse = { "statusCode"?: number; "data"?: Array<{ "operator"?: string; "country"?: string; "services"?: Array<{ "service"?: string; "total"?: number }> }> };
export type ActivationGetAllNumberCountsParams = Record<string, never>;

export type ActivationGetCountryNumberCountsResponse = { "statusCode"?: number; "data"?: Array<{ "operator"?: string; "country"?: string; "services"?: Array<{ "service"?: string; "total"?: number }> }> };
export interface ActivationGetCountryNumberCountsParams { "country": string }

export type ActivationGetServicePriceResponse = { "statusCode"?: number; "data"?: { "service"?: string; "serviceDescription"?: string; "country"?: string; "price"?: string; "priceByOperators"?: Record<string, string> } };
export interface ActivationGetServicePriceParams { "country": string; "service": string; "voice"?: 0 | 1 | 2 }

export type ActivationGetCountryOperatorPricesResponse = { "statusCode"?: number; "data"?: Array<{ "s"?: string; "sd"?: string; "c"?: string; "p"?: string; "po"?: Record<string, string> }> };
export interface ActivationGetCountryOperatorPricesParams { "country": string; "voice"?: 0 | 1 | 2 }

export type ActivationGetServicePricesResponse = { "statusCode"?: number; "data"?: { "scode"?: string; "sname"?: string; "clist"?: Array<{ "ccode"?: string; "cname"?: string; "opers"?: Array<{ "opcode"?: string; "price"?: number; "count"?: number }> }> } };
export interface ActivationGetServicePricesParams { "service": string; "voice"?: 0 | 1 | 2 }

export type ActivationGetAllServicePricesResponse = { "statusCode"?: number; "data"?: Array<{ "service"?: string; "serviceDescription"?: string; "country"?: string; "price"?: string }> };
export interface ActivationGetAllServicePricesParams { "voice"?: 0 | 1 | 2 }

export type ActivationGetNumberResponse = { "statusCode"?: number; "data"?: { "orderId"?: number; "phoneNumber"?: number; "countryCode"?: string; "orderExpireIn"?: number } };
export interface ActivationGetNumberParams { "country": string; "service": string; "voice"?: 0 | 1 | 2 }

export type ActivationGetNumberByOperatorResponse = { "statusCode"?: number; "data"?: { "orderId"?: number; "phoneNumber"?: number; "countryCode"?: string; "orderExpireIn"?: number } };
export interface ActivationGetNumberByOperatorParams { "country": string; "service": string; "operator": string; "voice"?: 0 | 1 | 2 }

export type ActivationReceiveSmsResponse = { "statusCode"?: number; "data"?: { "sms"?: { "code"?: string; "fullText"?: string }; "orderId"?: number; "orderExpireIn"?: number } } | ActivationPending;
export interface ActivationReceiveSmsParams { "partnerkey"?: string; "orderid": number }

export type ActivationGetOrdersResponse = { "statusCode"?: number; "data"?: { "orders"?: Array<{ "orderId"?: number; "phoneNumber"?: number; "countryCode"?: string; "orderExpireIn"?: number; "service"?: string; "country"?: string; "status"?: string; "sms"?: { "code"?: string; "fullText"?: string } }> } };
export type ActivationGetOrdersParams = Record<string, never>;

export type ActivationGetNumberStatusResponse = { "statusCode"?: number; "data"?: { "number"?: string; "orderId"?: number; "countryCode"?: string } };
export interface ActivationGetNumberStatusParams { "number": string; "service": string }

export type ActivationClearSmsResponse = { "statusCode"?: number; "data"?: { "orderId"?: number; "orderExpireIn"?: number } };
export interface ActivationClearSmsParams { "orderid": number }

export type ActivationStopSmsResponse = { "statusCode"?: number; "data"?: { "orderId"?: number } };
export interface ActivationStopSmsParams { "orderid": number }

export type ActivationCancelOrderResponse = { "statusCode"?: number; "data"?: { "orderId"?: number } };
export interface ActivationCancelOrderParams { "orderid": number }

export type ActivationBlockNumberResponse = { "statusCode"?: number; "data"?: { "orderId"?: number } };
export interface ActivationBlockNumberParams { "orderid": number }

export type RentalGetCountriesResponse = { "status"?: number; "data"?: Array<{ "name"?: string; "code"?: string; "url_country_name"?: string; "rent_switch_type"?: string; "rent_avail_prolong"?: string }> };
export type RentalGetCountriesParams = Record<string, never>;

export type RentalGetDefaultServicesResponse = { "status"?: number; "data"?: Array<{ "name"?: string; "service"?: string; "priceForDay"?: string; "img"?: string; "DAYP"?: string; "PROC"?: string }>; "msg"?: string };
export type RentalGetDefaultServicesParams = Record<string, never>;

export type RentalGetCountriesByServiceResponse = { "status"?: number; "data"?: Record<string, { "service_name"?: string; "price"?: string; "procent_days"?: string; "procent"?: string; "day_step"?: string; "country"?: string; "phoneAmount"?: number }>; "msg"?: string };
export interface RentalGetCountriesByServiceParams { "service": string; "dtype": string; "dcount"?: number }

export type RentalGetDataResponse = { "status"?: number; "data"?: { "services"?: Array<{ "name"?: string; "service"?: string; "price_day"?: number; "count"?: number; "img"?: string; "procent_days"?: number; "procent"?: number; "day_step"?: number }>; "totalAmount"?: number }; "msg"?: string };
export interface RentalGetDataParams { "country": string; "dtype"?: string; "dcount"?: number; "extend"?: string }

export type RentalGetDataWithProvidersResponse = { "status"?: number; "data"?: { "services"?: Array<{ "name"?: string; "service"?: string; "price_day"?: number; "img"?: string; "procent_days"?: number; "procent"?: number; "day_step"?: number; "count"?: Record<string, number>; "totalCount"?: number }>; "totalAmount"?: number; "allOperators"?: Array<string> }; "msg"?: string };
export interface RentalGetDataWithProvidersParams { "country": string; "dtype"?: string; "dcount"?: number; "extend"?: string }

export type RentalGetCountResponse = { "status"?: number; "data"?: (Record<string, number> | number); "msg"?: string };
export interface RentalGetCountParams { "country": string; "dtype"?: string; "dcount"?: number }

export type RentalGetCountWithProvidersResponse = { "status"?: number; "data"?: Record<string, { "Amount"?: Record<string, number>; "Total"?: number }>; "msg"?: string };
export interface RentalGetCountWithProvidersParams { "country": string; "dtype"?: string; "dcount"?: number }

export type RentalGetMultiServiceCountResponse = { "status"?: number; "data"?: { "count"?: number }; "msg"?: string };
export interface RentalGetMultiServiceCountParams { "country": string; "services": string; "dtype": string; "dcount": number }

export type RentalGetCanadaPaypalDaysResponse = { "status"?: number; "data"?: Array<{ "Days"?: number; "Amount"?: number }>; "msg"?: string };
export type RentalGetCanadaPaypalDaysParams = Record<string, never>;

export type RentalGetMinimumPaypalDaysResponse = { "status"?: number; "data"?: { "Days"?: number; "Status"?: number; "Message"?: string }; "msg"?: string };
export interface RentalGetMinimumPaypalDaysParams { "country": string; "service": string }

export type RentalCreateResponse = { "status"?: number; "data"?: { "id"?: number; "pnumber"?: string; "ccode"?: string; "service"?: string; "until"?: string }; "msg"?: string };
export interface RentalCreateParams { "dtype": string; "dcount": number; "country": string; "service": string; "provider"?: string; "partner_key"?: string }

export type RentalCreateMultiResponse = { "status"?: number; "data"?: { "id"?: number; "pnumber"?: string; "ccode"?: string; "service"?: string; "until"?: string }; "msg"?: string };
export interface RentalCreateMultiParams { "dtype": string; "dcount": number; "country": string; "services": string; "provider"?: string; "partner_key"?: string }

export type RentalAddServiceToOrderResponse = { "status"?: number; "data"?: { "id"?: number; "pnumber"?: string; "service"?: string; "until"?: number } };
export interface RentalAddServiceToOrderParams { "id": number; "service": string; "pnumber": string; "rent_days"?: number }

export type RentalGetOrdersResponse = { "status"?: number; "data"?: Array<{ "id"?: number; "scode"?: string; "sname"?: string; "state"?: number; "pnumber"?: string; "ccode"?: string; "cname"?: string; "hasnewsms"?: boolean; "until"?: number; "canprolong"?: boolean; "canprolongmax"?: number; "canprolonguntil"?: number; "lastonline"?: number }> };
export type RentalGetOrdersParams = Record<string, never>;

export type RentalActivateResponse = { "status"?: number; "data"?: Array<{ "id"?: number }> };
export interface RentalActivateParams { "id": number }

export type RentalGetSmsResponse = { "status"?: number; "data"?: { "SmsList"?: Array<{ "text"?: string; "sender"?: string; "date"?: number }>; "OtherSms"?: Array<unknown> } };
export interface RentalGetSmsParams { "id": number }

export type RentalProlongResponse = { "status"?: number };
export interface RentalProlongParams { "id": number; "dtype": string; "dcount": number }

export type RentalProlongByDaysResponse = { "status"?: number };
export interface RentalProlongByDaysParams { "id": number; "dtype": string; "dcount": number }

export type RentalDeleteOrderResponse = { "status"?: number; "data"?: { "id"?: number }; "msg"?: string };
export interface RentalDeleteOrderParams { "id": number }

export type RentalGetHistoryResponse = { "status"?: number; "data"?: Array<{ "orderId"?: number; "resourceCode"?: string; "number"?: string; "branchId"?: number; "haveSms"?: boolean; "isAvailForRestore"?: boolean; "days"?: number; "country"?: string; "begin"?: number; "end"?: number; "closed"?: number }> };
export interface RentalGetHistoryParams { "skip"?: number; "take"?: number }

export type RentalGetRestoreCostResponse = { "status"?: number; "data"?: { "ccode"?: string; "scode"?: string; "price"?: number; "sname"?: string; "pnumber"?: string; "outdays"?: number; "orderid"?: number; "prolongTo"?: number }; "msg"?: string };
export interface RentalGetRestoreCostParams { "id": number }

export type RentalRestoreResponse = ({ "status": number; "data": { "id": number } } | { "status": number; "msg": string });
export interface RentalRestoreParams { "id": number }

export type EmailGetProvidersResponse = ({ "status": 1; "data": Array<{ "id"?: number; "pcode"?: string; "name"?: string }> });
export type EmailGetProvidersParams = Record<string, never>;

export type EmailGetDataResponse = ({ "status": 1; "data": Array<{ "count"?: number; "scode"?: string; "sname"?: string; "price"?: number; "alias_price"?: number; "icon"?: string; "months_discount"?: number }> });
export interface EmailGetDataParams { "pcode"?: string }

export type EmailGetCountResponse = ({ "status": 1; "data": Array<{ "count"?: number; "scode"?: string }> });
export interface EmailGetCountParams { "pcode"?: string }

export type EmailCreateOrderResponse = ({ "status": 1; "data": { "id"?: number; "email"?: string; "scode"?: string; "pcode"?: string; "expireDate"?: number } } | { "status": 2 });
export interface EmailCreateOrderParams { "scode": string; "pcode"?: string; "dtype": "day" | "week" | "month"; "dcount": number }

export type EmailGetOrdersResponse = ({ "status": 1; "data": Array<{ "id"?: number; "address"?: string; "scode"?: string; "pcode"?: string; "expireDate"?: number; "mesCount"?: number; "aliases"?: Array<{ "id"?: number; "address"?: string; "mesCount"?: number; "isPaid"?: boolean }>; "sname"?: string }> });
export type EmailGetOrdersParams = Record<string, never>;

export type EmailGetMailsResponse = ({ "status": 1; "data": Array<{ "id"?: number; "sender"?: string; "subject"?: string; "preview"?: string; "addedAt"?: string }> });
export interface EmailGetMailsParams { "orderid": number; "t"?: number; "s"?: number; "sq"?: string }

export type EmailGetMailBodyResponse = ({ "status": 1; "data": { "id"?: number; "sender"?: string; "subject"?: string; "body"?: string; "addedAt"?: string } });
export interface EmailGetMailBodyParams { "orderid": number; "emailid": number }

export type EmailBuyAliasResponse = ({ "status": 1; "data": { "alias"?: string } });
export interface EmailBuyAliasParams { "orderid": number; "aliasid": number }

export type EmailGetMailsByAliasResponse = ({ "status": 1; "data": Array<{ "id"?: number; "sender"?: string; "subject"?: string; "preview"?: string; "addedAt"?: string }> });
export interface EmailGetMailsByAliasParams { "orderid": number; "aliasid": number; "t"?: number; "s"?: number; "sq"?: string }

export type EmailProlongOrderResponse = ({ "status": 1; "data": { "id"?: number; "email"?: string; "service"?: string } });
export interface EmailProlongOrderParams { "orderid": number; "dtype": "day" | "week" | "month"; "dcount": number }

export type EmailCancelOrderResponse = ({ "status": 1; "data": boolean });
export interface EmailCancelOrderParams { "orderid": number }

export type EmailGetArchivedOrdersResponse = ({ "status": 1; "data": Array<{ "id"?: number; "address"?: string; "scode"?: string; "pcode"?: string; "expireDate"?: number; "sname"?: string }> });
export type EmailGetArchivedOrdersParams = Record<string, never>;

export type EmailCalcRestoreOrderResponse = ({ "status": 1; "data": number });
export interface EmailCalcRestoreOrderParams { "orderid": number }

export type EmailRestoreOrderResponse = ({ "status": 1; "data": { "id"?: number; "email"?: string; "service"?: string } });
export interface EmailRestoreOrderParams { "orderid": number }

export interface ActivationPending { statusCode: 202; error: { type: "SMS_NOT_YET_RECEIVED"; description?: string } }
export interface EmailNoStock { status: 2 }
