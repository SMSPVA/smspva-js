// Generated named methods; wire names remain unchanged.
import { Transport, type RequestOptions } from './transport.js';
import { waitForSms, type WaitForSmsOptions } from './polling.js';
import type * as T from './types.js';

export class Activation {
  constructor(private readonly transport: Transport) {}
  getBalance(params: T.ActivationGetBalanceParams = {}, options: RequestOptions = {}): Promise<T.ActivationGetBalanceResponse> {
    return this.transport.request("activation.getBalance", params, options) as Promise<T.ActivationGetBalanceResponse>;
  }

  getUserInfo(params: T.ActivationGetUserInfoParams = {}, options: RequestOptions = {}): Promise<T.ActivationGetUserInfoResponse> {
    return this.transport.request("activation.getUserInfo", params, options) as Promise<T.ActivationGetUserInfoResponse>;
  }

  getOperators(params: T.ActivationGetOperatorsParams, options: RequestOptions = {}): Promise<T.ActivationGetOperatorsResponse> {
    return this.transport.request("activation.getOperators", params, options) as Promise<T.ActivationGetOperatorsResponse>;
  }

  getConversions(params: T.ActivationGetConversionsParams, options: RequestOptions = {}): Promise<T.ActivationGetConversionsResponse> {
    return this.transport.request("activation.getConversions", params, options) as Promise<T.ActivationGetConversionsResponse>;
  }

  getMessageTypeSettings(params: T.ActivationGetMessageTypeSettingsParams = {}, options: RequestOptions = {}): Promise<T.ActivationGetMessageTypeSettingsResponse> {
    return this.transport.request("activation.getMessageTypeSettings", params, options) as Promise<T.ActivationGetMessageTypeSettingsResponse>;
  }

  getAllNumberCounts(params: T.ActivationGetAllNumberCountsParams = {}, options: RequestOptions = {}): Promise<T.ActivationGetAllNumberCountsResponse> {
    return this.transport.request("activation.getAllNumberCounts", params, options) as Promise<T.ActivationGetAllNumberCountsResponse>;
  }

  getCountryNumberCounts(params: T.ActivationGetCountryNumberCountsParams, options: RequestOptions = {}): Promise<T.ActivationGetCountryNumberCountsResponse> {
    return this.transport.request("activation.getCountryNumberCounts", params, options) as Promise<T.ActivationGetCountryNumberCountsResponse>;
  }

  getServicePrice(params: T.ActivationGetServicePriceParams, options: RequestOptions = {}): Promise<T.ActivationGetServicePriceResponse> {
    return this.transport.request("activation.getServicePrice", params, options) as Promise<T.ActivationGetServicePriceResponse>;
  }

  getCountryOperatorPrices(params: T.ActivationGetCountryOperatorPricesParams, options: RequestOptions = {}): Promise<T.ActivationGetCountryOperatorPricesResponse> {
    return this.transport.request("activation.getCountryOperatorPrices", params, options) as Promise<T.ActivationGetCountryOperatorPricesResponse>;
  }

  getServicePrices(params: T.ActivationGetServicePricesParams, options: RequestOptions = {}): Promise<T.ActivationGetServicePricesResponse> {
    return this.transport.request("activation.getServicePrices", params, options) as Promise<T.ActivationGetServicePricesResponse>;
  }

  getAllServicePrices(params: T.ActivationGetAllServicePricesParams = {}, options: RequestOptions = {}): Promise<T.ActivationGetAllServicePricesResponse> {
    return this.transport.request("activation.getAllServicePrices", params, options) as Promise<T.ActivationGetAllServicePricesResponse>;
  }

  getNumber(params: T.ActivationGetNumberParams, options: RequestOptions = {}): Promise<T.ActivationGetNumberResponse> {
    return this.transport.request("activation.getNumber", params, options) as Promise<T.ActivationGetNumberResponse>;
  }

  getNumberByOperator(params: T.ActivationGetNumberByOperatorParams, options: RequestOptions = {}): Promise<T.ActivationGetNumberByOperatorResponse> {
    return this.transport.request("activation.getNumberByOperator", params, options) as Promise<T.ActivationGetNumberByOperatorResponse>;
  }

  receiveSms(params: T.ActivationReceiveSmsParams, options: RequestOptions = {}): Promise<T.ActivationReceiveSmsResponse> {
    return this.transport.request("activation.receiveSms", params, options) as Promise<T.ActivationReceiveSmsResponse>;
  }

  getOrders(params: T.ActivationGetOrdersParams = {}, options: RequestOptions = {}): Promise<T.ActivationGetOrdersResponse> {
    return this.transport.request("activation.getOrders", params, options) as Promise<T.ActivationGetOrdersResponse>;
  }

  getNumberStatus(params: T.ActivationGetNumberStatusParams, options: RequestOptions = {}): Promise<T.ActivationGetNumberStatusResponse> {
    return this.transport.request("activation.getNumberStatus", params, options) as Promise<T.ActivationGetNumberStatusResponse>;
  }

  clearSms(params: T.ActivationClearSmsParams, options: RequestOptions = {}): Promise<T.ActivationClearSmsResponse> {
    return this.transport.request("activation.clearSms", params, options) as Promise<T.ActivationClearSmsResponse>;
  }

  stopSms(params: T.ActivationStopSmsParams, options: RequestOptions = {}): Promise<T.ActivationStopSmsResponse> {
    return this.transport.request("activation.stopSms", params, options) as Promise<T.ActivationStopSmsResponse>;
  }

  cancelOrder(params: T.ActivationCancelOrderParams, options: RequestOptions = {}): Promise<T.ActivationCancelOrderResponse> {
    return this.transport.request("activation.cancelOrder", params, options) as Promise<T.ActivationCancelOrderResponse>;
  }

  blockNumber(params: T.ActivationBlockNumberParams, options: RequestOptions = {}): Promise<T.ActivationBlockNumberResponse> {
    return this.transport.request("activation.blockNumber", params, options) as Promise<T.ActivationBlockNumberResponse>;
  }
  waitForSms(options: WaitForSmsOptions): Promise<Exclude<T.ActivationReceiveSmsResponse, T.ActivationPending>> { return waitForSms(this.transport, options); }
}

export class Rental {
  constructor(private readonly transport: Transport) {}
  getCountries(params: T.RentalGetCountriesParams = {}, options: RequestOptions = {}): Promise<T.RentalGetCountriesResponse> {
    return this.transport.request("rental.getCountries", params, options) as Promise<T.RentalGetCountriesResponse>;
  }

  getDefaultServices(params: T.RentalGetDefaultServicesParams = {}, options: RequestOptions = {}): Promise<T.RentalGetDefaultServicesResponse> {
    return this.transport.request("rental.getDefaultServices", params, options) as Promise<T.RentalGetDefaultServicesResponse>;
  }

  getCountriesByService(params: T.RentalGetCountriesByServiceParams, options: RequestOptions = {}): Promise<T.RentalGetCountriesByServiceResponse> {
    return this.transport.request("rental.getCountriesByService", params, options) as Promise<T.RentalGetCountriesByServiceResponse>;
  }

  getData(params: T.RentalGetDataParams, options: RequestOptions = {}): Promise<T.RentalGetDataResponse> {
    return this.transport.request("rental.getData", params, options) as Promise<T.RentalGetDataResponse>;
  }

  getDataWithProviders(params: T.RentalGetDataWithProvidersParams, options: RequestOptions = {}): Promise<T.RentalGetDataWithProvidersResponse> {
    return this.transport.request("rental.getDataWithProviders", params, options) as Promise<T.RentalGetDataWithProvidersResponse>;
  }

  getCount(params: T.RentalGetCountParams, options: RequestOptions = {}): Promise<T.RentalGetCountResponse> {
    return this.transport.request("rental.getCount", params, options) as Promise<T.RentalGetCountResponse>;
  }

  getCountWithProviders(params: T.RentalGetCountWithProvidersParams, options: RequestOptions = {}): Promise<T.RentalGetCountWithProvidersResponse> {
    return this.transport.request("rental.getCountWithProviders", params, options) as Promise<T.RentalGetCountWithProvidersResponse>;
  }

  getMultiServiceCount(params: T.RentalGetMultiServiceCountParams, options: RequestOptions = {}): Promise<T.RentalGetMultiServiceCountResponse> {
    return this.transport.request("rental.getMultiServiceCount", params, options) as Promise<T.RentalGetMultiServiceCountResponse>;
  }

  getCanadaPaypalDays(params: T.RentalGetCanadaPaypalDaysParams = {}, options: RequestOptions = {}): Promise<T.RentalGetCanadaPaypalDaysResponse> {
    return this.transport.request("rental.getCanadaPaypalDays", params, options) as Promise<T.RentalGetCanadaPaypalDaysResponse>;
  }

  getMinimumPaypalDays(params: T.RentalGetMinimumPaypalDaysParams, options: RequestOptions = {}): Promise<T.RentalGetMinimumPaypalDaysResponse> {
    return this.transport.request("rental.getMinimumPaypalDays", params, options) as Promise<T.RentalGetMinimumPaypalDaysResponse>;
  }

  create(params: T.RentalCreateParams, options: RequestOptions = {}): Promise<T.RentalCreateResponse> {
    return this.transport.request("rental.create", params, options) as Promise<T.RentalCreateResponse>;
  }

  createMulti(params: T.RentalCreateMultiParams, options: RequestOptions = {}): Promise<T.RentalCreateMultiResponse> {
    return this.transport.request("rental.createMulti", params, options) as Promise<T.RentalCreateMultiResponse>;
  }

  addServiceToOrder(params: T.RentalAddServiceToOrderParams, options: RequestOptions = {}): Promise<T.RentalAddServiceToOrderResponse> {
    return this.transport.request("rental.addServiceToOrder", params, options) as Promise<T.RentalAddServiceToOrderResponse>;
  }

  getOrders(params: T.RentalGetOrdersParams = {}, options: RequestOptions = {}): Promise<T.RentalGetOrdersResponse> {
    return this.transport.request("rental.getOrders", params, options) as Promise<T.RentalGetOrdersResponse>;
  }

  activate(params: T.RentalActivateParams, options: RequestOptions = {}): Promise<T.RentalActivateResponse> {
    return this.transport.request("rental.activate", params, options) as Promise<T.RentalActivateResponse>;
  }

  getSms(params: T.RentalGetSmsParams, options: RequestOptions = {}): Promise<T.RentalGetSmsResponse> {
    return this.transport.request("rental.getSms", params, options) as Promise<T.RentalGetSmsResponse>;
  }

  prolong(params: T.RentalProlongParams, options: RequestOptions = {}): Promise<T.RentalProlongResponse> {
    return this.transport.request("rental.prolong", params, options) as Promise<T.RentalProlongResponse>;
  }

  prolongByDays(params: T.RentalProlongByDaysParams, options: RequestOptions = {}): Promise<T.RentalProlongByDaysResponse> {
    return this.transport.request("rental.prolongByDays", params, options) as Promise<T.RentalProlongByDaysResponse>;
  }

  deleteOrder(params: T.RentalDeleteOrderParams, options: RequestOptions = {}): Promise<T.RentalDeleteOrderResponse> {
    return this.transport.request("rental.deleteOrder", params, options) as Promise<T.RentalDeleteOrderResponse>;
  }

  getHistory(params: T.RentalGetHistoryParams = {}, options: RequestOptions = {}): Promise<T.RentalGetHistoryResponse> {
    return this.transport.request("rental.getHistory", params, options) as Promise<T.RentalGetHistoryResponse>;
  }

  getRestoreCost(params: T.RentalGetRestoreCostParams, options: RequestOptions = {}): Promise<T.RentalGetRestoreCostResponse> {
    return this.transport.request("rental.getRestoreCost", params, options) as Promise<T.RentalGetRestoreCostResponse>;
  }

  restore(params: T.RentalRestoreParams, options: RequestOptions = {}): Promise<T.RentalRestoreResponse> {
    return this.transport.request("rental.restore", params, options) as Promise<T.RentalRestoreResponse>;
  }
}

export class Email {
  constructor(private readonly transport: Transport) {}
  getProviders(params: T.EmailGetProvidersParams = {}, options: RequestOptions = {}): Promise<T.EmailGetProvidersResponse> {
    return this.transport.request("email.getProviders", params, options) as Promise<T.EmailGetProvidersResponse>;
  }

  getData(params: T.EmailGetDataParams = {}, options: RequestOptions = {}): Promise<T.EmailGetDataResponse> {
    return this.transport.request("email.getData", params, options) as Promise<T.EmailGetDataResponse>;
  }

  getCount(params: T.EmailGetCountParams = {}, options: RequestOptions = {}): Promise<T.EmailGetCountResponse> {
    return this.transport.request("email.getCount", params, options) as Promise<T.EmailGetCountResponse>;
  }

  createOrder(params: T.EmailCreateOrderParams, options: RequestOptions = {}): Promise<T.EmailCreateOrderResponse> {
    return this.transport.request("email.createOrder", params, options) as Promise<T.EmailCreateOrderResponse>;
  }

  getOrders(params: T.EmailGetOrdersParams = {}, options: RequestOptions = {}): Promise<T.EmailGetOrdersResponse> {
    return this.transport.request("email.getOrders", params, options) as Promise<T.EmailGetOrdersResponse>;
  }

  getMails(params: T.EmailGetMailsParams, options: RequestOptions = {}): Promise<T.EmailGetMailsResponse> {
    return this.transport.request("email.getMails", params, options) as Promise<T.EmailGetMailsResponse>;
  }

  getMailBody(params: T.EmailGetMailBodyParams, options: RequestOptions = {}): Promise<T.EmailGetMailBodyResponse> {
    return this.transport.request("email.getMailBody", params, options) as Promise<T.EmailGetMailBodyResponse>;
  }

  buyAlias(params: T.EmailBuyAliasParams, options: RequestOptions = {}): Promise<T.EmailBuyAliasResponse> {
    return this.transport.request("email.buyAlias", params, options) as Promise<T.EmailBuyAliasResponse>;
  }

  getMailsByAlias(params: T.EmailGetMailsByAliasParams, options: RequestOptions = {}): Promise<T.EmailGetMailsByAliasResponse> {
    return this.transport.request("email.getMailsByAlias", params, options) as Promise<T.EmailGetMailsByAliasResponse>;
  }

  prolongOrder(params: T.EmailProlongOrderParams, options: RequestOptions = {}): Promise<T.EmailProlongOrderResponse> {
    return this.transport.request("email.prolongOrder", params, options) as Promise<T.EmailProlongOrderResponse>;
  }

  cancelOrder(params: T.EmailCancelOrderParams, options: RequestOptions = {}): Promise<T.EmailCancelOrderResponse> {
    return this.transport.request("email.cancelOrder", params, options) as Promise<T.EmailCancelOrderResponse>;
  }

  getArchivedOrders(params: T.EmailGetArchivedOrdersParams = {}, options: RequestOptions = {}): Promise<T.EmailGetArchivedOrdersResponse> {
    return this.transport.request("email.getArchivedOrders", params, options) as Promise<T.EmailGetArchivedOrdersResponse>;
  }

  calcRestoreOrder(params: T.EmailCalcRestoreOrderParams, options: RequestOptions = {}): Promise<T.EmailCalcRestoreOrderResponse> {
    return this.transport.request("email.calcRestoreOrder", params, options) as Promise<T.EmailCalcRestoreOrderResponse>;
  }

  restoreOrder(params: T.EmailRestoreOrderParams, options: RequestOptions = {}): Promise<T.EmailRestoreOrderResponse> {
    return this.transport.request("email.restoreOrder", params, options) as Promise<T.EmailRestoreOrderResponse>;
  }
}
