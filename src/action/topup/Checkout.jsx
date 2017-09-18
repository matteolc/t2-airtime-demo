import React from 'react';
import {ImageField} from 'admin-on-rest';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {green500} from 'material-ui/styles/colors';
import RaisedButton from 'material-ui/RaisedButton';
import {CardText} from 'material-ui/Card';

const styles = {
    text: {
        marginLeft: 20
    },
    button: {
        color: "#FAFAFA"
    }
};

const Checkout = ({itzDestinationNumber, productInfo, loading, nextStep}) => (
    <span>
        <Paper zDepth={2}>
            <ImageField
                style={{
                marginLeft: 18
            }}
                record={productInfo}
                source="operatorLogo"/>
            <TextField
                style={styles.text}
                underlineShow={false}
                defaultValue={itzDestinationNumber}
                floatingLabelText="Destination"/>
            <TextField
                style={styles.text}
                underlineShow={false}
                defaultValue={itzDestinationNumber}
                floatingLabelText="Operator"/>
            <TextField
                style={styles.text}
                underlineShow={false}
                defaultValue={itzDestinationNumber}
                floatingLabelText="Product"/>
            <Divider/>
            <TextField
                style={styles.text}
                underlineShow={false}
                defaultValue={parseFloat(productInfo.retailPrice).toLocaleString(undefined, {
                style: 'currency',
                currency: productInfo.currency
            })}
                floatingLabelText="Retail Price"/>
            <TextField
                style={styles.text}
                underlineShow={false}
                defaultValue={parseFloat(productInfo.wholesalePrice).toLocaleString(undefined, {
                style: 'currency',
                currency: productInfo.currency
            })}
                floatingLabelText="Wholesale Price"/>
        </Paper>
        <CardText>
            <RaisedButton
                label={loading === true
                ? "Sending Topup.."
                : "Topup"}
                backgroundColor={green500}
                labelStyle={styles.button}
                disabled={loading}
                onClick={nextStep}/>
        </CardText>
    </span>

);

export default Checkout;