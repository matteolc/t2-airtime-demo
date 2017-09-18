import React from 'react';
import {Admin, Resource} from 'admin-on-rest';
import jsonAPIRestClient from 'aor-jsonapi-client/build/restClient';
import {CountryList, CountryShow, CountryIcon} from './resource/countries';
import {TransactionList, TransactionShow, TransactionIcon} from './resource/transactions';
import {OperatorShow} from './resource/operators';
import Topup from './action/Topup'
import theme from './theme';

export const baseApiUrl = `${process.env.REACT_APP_API_PROTOCOL}://${process.env.REACT_APP_API_ADDRESS}:${process.env.REACT_APP_API_PORT}`
export const apiClient = jsonAPIRestClient(baseApiUrl);

const App = () => (
  <Admin
    title="Transfer-To Airtime API"
    restClient={apiClient}
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
