# SDK method index

All six packages cover these same 56 methods. Both Python clients use the Python names. PHP and Java use the JavaScript camelCase method names, with their own resource access syntax. Go capitalizes the first letter (for example, `GetBalance`); C# also appends `Async` (`GetBalanceAsync`). See each package README for request types and working usage. Parameters retain their API spelling.

## activation

| Python (sync and async) | JavaScript / TypeScript | HTTP |
| --- | --- | --- |
| `client.activation.get_balance` | `client.activation.getBalance` | `GET /activation/balance` |
| `client.activation.get_user_info` | `client.activation.getUserInfo` | `GET /activation/userinfo` |
| `client.activation.get_operators` | `client.activation.getOperators` | `GET /activation/operators/{country}` |
| `client.activation.get_conversions` | `client.activation.getConversions` | `GET /activation/conversions/{service}` |
| `client.activation.get_message_type_settings` | `client.activation.getMessageTypeSettings` | `GET /activation/countryservicesettings` |
| `client.activation.get_all_number_counts` | `client.activation.getAllNumberCounts` | `GET /activation/countnumbers` |
| `client.activation.get_country_number_counts` | `client.activation.getCountryNumberCounts` | `GET /activation/countnumbers/{country}` |
| `client.activation.get_service_price` | `client.activation.getServicePrice` | `GET /activation/serviceprice/{country}/{service}` |
| `client.activation.get_country_operator_prices` | `client.activation.getCountryOperatorPrices` | `GET /activation/serviceprice/{country}` |
| `client.activation.get_service_prices` | `client.activation.getServicePrices` | `GET /activation/serviceprices/{service}` |
| `client.activation.get_all_service_prices` | `client.activation.getAllServicePrices` | `GET /activation/servicesprices` |
| `client.activation.get_number` | `client.activation.getNumber` | `GET /activation/number/{country}/{service}` |
| `client.activation.get_number_by_operator` | `client.activation.getNumberByOperator` | `GET /activation/number/{country}/{service}/{operator}` |
| `client.activation.receive_sms` | `client.activation.receiveSms` | `GET /activation/sms/{orderid}` |
| `client.activation.get_orders` | `client.activation.getOrders` | `GET /activation/orders` |
| `client.activation.get_number_status` | `client.activation.getNumberStatus` | `GET /activation/numberstatus/{number}/{service}` |
| `client.activation.clear_sms` | `client.activation.clearSms` | `PUT /activation/clearsms/{orderid}` |
| `client.activation.stop_sms` | `client.activation.stopSms` | `PUT /activation/stopsms/{orderid}` |
| `client.activation.cancel_order` | `client.activation.cancelOrder` | `PUT /activation/cancelorder/{orderid}` |
| `client.activation.block_number` | `client.activation.blockNumber` | `PUT /activation/blocknumber/{orderid}` |

## rental

| Python (sync and async) | JavaScript / TypeScript | HTTP |
| --- | --- | --- |
| `client.rental.get_countries` | `client.rental.getCountries` | `GET /api/rent.php?method=getcountries` |
| `client.rental.get_default_services` | `client.rental.getDefaultServices` | `GET /api/rent.php?method=get_default_services` |
| `client.rental.get_countries_by_service` | `client.rental.getCountriesByService` | `GET /api/rent.php?method=get_country_by_service` |
| `client.rental.get_data` | `client.rental.getData` | `GET /api/rent.php?method=getdata` |
| `client.rental.get_data_with_providers` | `client.rental.getDataWithProviders` | `GET /api/rent.php?method=getdataWithProviders` |
| `client.rental.get_count` | `client.rental.getCount` | `GET /api/rent.php?method=getcount` |
| `client.rental.get_count_with_providers` | `client.rental.getCountWithProviders` | `GET /api/rent.php?method=getCountWithProviders` |
| `client.rental.get_multi_service_count` | `client.rental.getMultiServiceCount` | `GET /api/rent.php?method=get_count_multi` |
| `client.rental.get_canada_paypal_days` | `client.rental.getCanadaPaypalDays` | `GET /api/rent.php?method=get_days_canada_paypal` |
| `client.rental.get_minimum_paypal_days` | `client.rental.getMinimumPaypalDays` | `GET /api/rent.php?method=get_min_paypal_days` |
| `client.rental.create` | `client.rental.create` | `GET /api/rent.php?method=create` |
| `client.rental.create_multi` | `client.rental.createMulti` | `GET /api/rent.php?method=create_multi` |
| `client.rental.add_service_to_order` | `client.rental.addServiceToOrder` | `GET /api/rent.php?method=add_service_to_order` |
| `client.rental.get_orders` | `client.rental.getOrders` | `GET /api/rent.php?method=orders` |
| `client.rental.activate` | `client.rental.activate` | `GET /api/rent.php?method=activate` |
| `client.rental.get_sms` | `client.rental.getSms` | `GET /api/rent.php?method=sms` |
| `client.rental.prolong` | `client.rental.prolong` | `GET /api/rent.php?method=prolong` |
| `client.rental.prolong_by_days` | `client.rental.prolongByDays` | `GET /api/rent.php?method=prolong_max` |
| `client.rental.delete_order` | `client.rental.deleteOrder` | `GET /api/rent.php?method=delete` |
| `client.rental.get_history` | `client.rental.getHistory` | `GET /api/rent.php?method=get_rent_history` |
| `client.rental.get_restore_cost` | `client.rental.getRestoreCost` | `GET /api/rent.php?method=restore_user_precalc` |
| `client.rental.restore` | `client.rental.restore` | `GET /api/rent.php?method=restore_user` |

## email

| Python (sync and async) | JavaScript / TypeScript | HTTP |
| --- | --- | --- |
| `client.email.get_providers` | `client.email.getProviders` | `GET /api/rent_email.php?method=get_providers` |
| `client.email.get_data` | `client.email.getData` | `GET /api/rent_email.php?method=get_data` |
| `client.email.get_count` | `client.email.getCount` | `GET /api/rent_email.php?method=get_count` |
| `client.email.create_order` | `client.email.createOrder` | `GET /api/rent_email.php?method=create_order` |
| `client.email.get_orders` | `client.email.getOrders` | `GET /api/rent_email.php?method=get_orders` |
| `client.email.get_mails` | `client.email.getMails` | `GET /api/rent_email.php?method=get_mails` |
| `client.email.get_mail_body` | `client.email.getMailBody` | `GET /api/rent_email.php?method=get_mail_body` |
| `client.email.buy_alias` | `client.email.buyAlias` | `GET /api/rent_email.php?method=buy_alias` |
| `client.email.get_mails_by_alias` | `client.email.getMailsByAlias` | `GET /api/rent_email.php?method=get_mails_by_alias` |
| `client.email.prolong_order` | `client.email.prolongOrder` | `GET /api/rent_email.php?method=prolong_order` |
| `client.email.cancel_order` | `client.email.cancelOrder` | `GET /api/rent_email.php?method=cancel_order` |
| `client.email.get_archived_orders` | `client.email.getArchivedOrders` | `GET /api/rent_email.php?method=get_archived_orders` |
| `client.email.calc_restore_order` | `client.email.calcRestoreOrder` | `GET /api/rent_email.php?method=calc_restore_order` |
| `client.email.restore_order` | `client.email.restoreOrder` | `GET /api/rent_email.php?method=restore_order` |

Activation also provides `wait_for_sms` / `waitForSms`. It polls an existing order until a caller-supplied expiry, without purchasing or cancelling an order.
