import React from 'react';
import {Admin, Resource, fetchUtils} from 'admin-on-rest';
import jsonAPIRestClient from 'aor-jsonapi-client/build/restClient';
import {CountryList, CountryShow, CountryIcon} from './resource/countries';
import {TransactionList, TransactionShow, TransactionIcon} from './resource/transactions';
import {OperatorShow} from './resource/operators';
import Topup from './action/Topup'
import theme from './theme';
import authClient from './authClient';

const crypto = require('crypto');
export const tokenDigest = () => {
    let hmac = crypto.createHmac('sha256', process.env.REACT_APP_API_KEY);
    hmac.update(process.env.REACT_APP_API_TOKEN);    
    return hmac.digest('hex')
}
export const baseApiUrl = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}`
const httpClient = (url, options = {}) => {
    options.user = {
        authenticated: true,
        token: `Token token=${tokenDigest()}`
    }
    return fetchUtils.fetchJson(url, options);
}
export const apiClient = jsonAPIRestClient(baseApiUrl, httpClient);

const App = () => (
  <Admin
    title="Transfer-To Airtime API"
    restClient={apiClient}
    authClient={authClient}
    theme={theme}
    dashboard={Topup}>
    <Resource
      name="countries"
      list={CountryList}
      show={CountryShow}
      icon={CountryIcon}/>
    <Resource name="operators" show={OperatorShow}/>
    <Resource name="products"/>
    <Resource
      name="transactions"
      list={TransactionList}
      show={TransactionShow}
      icon={TransactionIcon}/>
  </Admin>
);

export default App;
