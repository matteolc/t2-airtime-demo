import React from 'react';
import {ImageField} from 'admin-on-rest';
import TextField from 'material-ui/TextField';
import {CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
    text: {
        marginLeft: 20
    },
    checkbox: {
        marginBottom: 16,
        maxWidth: 250
    }
};

const Result = ({record, nextStep}) => (record
    ? <span>
            <Paper zDepth={2}>
                <ImageField record={record} source="operatorLogo"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.balanceDisplay}
                    floatingLabelText="Balance"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={parseFloat(record.productRetailPrice).toLocaleString(undefined, {
                    style: 'currency',
                    currency: record.currency
                })}
                    floatingLabelText="Retail Price"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={parseFloat(record.productWholesalePrice).toLocaleString(undefined, {
                    style: 'currency',
                    currency: record.currency
                })}
                    floatingLabelText="Wholesale Price"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={parseFloat(record.actualProductSent).toLocaleString(undefined, {
                    style: 'currency',
                    currency: record.localCurrency
                })}
                    floatingLabelText="Amount Sent"/>
                <Divider/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.countryName}
                    floatingLabelText="Country"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.operatorName}
                    floatingLabelText="Operator"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.productName}
                    floatingLabelText="Product"/>
                <Divider/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.destinationMsisdn}
                    floatingLabelText="Destination"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.msisdn}
                    floatingLabelText="Sender"/>
                <Divider/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.transactionId}
                    floatingLabelText="Transaction ID"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.transactionAuthenticationKey}
                    floatingLabelText="Authorization Key"/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.transactionErrorTxt}
                    floatingLabelText="Response Status"/>
                <Divider/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={record.smsSent}
                    floatingLabelText="SMS Sent"/>
                <span
                    style={{
                    display: record.smsSent === 'yes'
                        ? 'block'
                        : 'none'
                }}>
                    <TextField
                        style={styles.text}
                        underlineShow={false}
                        defaultValue={record.sms}
                        floatingLabelText="SMS"/>
                </span>
                <Divider/>
                <TextField
                    style={styles.text}
                    underlineShow={false}
                    defaultValue={new Date(record.executedAt).toLocaleString()}
                    floatingLabelText="Executed At"/>
            </Paper>
            <CardText>
                <RaisedButton label="New Topup" primary onClick={nextStep}/>
            </CardText>
        </span>
    : <LinearProgress mode="indeterminate"/>);

export default Result;