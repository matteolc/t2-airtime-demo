import React from 'react';
import {
    Filter,
    TextInput,
    DateInput,
    List,
    Show,
    SimpleShowLayout,
    TextField,
    DateField,
    ImageField
} from 'admin-on-rest';
import TransactionGrid from '../view/TransactionGrid';
import ShoppingCartIcon from 'material-ui/svg-icons/action/shopping-cart';
export {ShoppingCartIcon as TransactionIcon};

var moment = require('moment');

const TransactionFilters = (props) => (
    <Filter {...props}>
        <DateInput
            label="From Date"
            source="start"
            defaultValue={(moment().startOf('day').format())}/>
        <DateInput
            label="To Date"
            source="stop"
            defaultValue={(moment().endOf('day').format())}/>
        <TextInput label="Sender" source="msisdn"/>
        <TextInput label="Destination" source="destination"/>
        <TextInput label="Transaction Error Code" source="code"/>
    </Filter>
);

export const TransactionList = (props) => (
    <List title="Transactions" filters={< TransactionFilters />} {...props}>
        <TransactionGrid/>
    </List>
);

const TransactionTitle = ({record}) => record
    ? <span>Transaction #{record.id}</span>
    : null;

export const TransactionShow = (props) => (
    <Show title={< TransactionTitle />} {...props}>
        <SimpleShowLayout>
            <ImageField source="attributes.operatorLogo" label="Operator Logo"/>
            <TextField source="attributes.countryName" label="Country"/>
            <TextField source="attributes.operatorName" label="Operator"/>
            <TextField source="attributes.productName" label="Product"/>
            <TextField source="attributes.destinationMsisdn" label="Destination"/>
            <TextField source="attributes.msisdn" label="Sender"/>
            <TextField
                source="attributes.transactionAuthenticationKey"
                label="Authorization Key"/>
            <TextField source="attributes.transactionErrorTxt" label="Transaction Status"/>
            <DateField source="attributes.date" label="Date"/>
        </SimpleShowLayout>
    </Show>
);
