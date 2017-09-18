import React, {Component} from 'react';
import {GET_LIST} from 'admin-on-rest/lib/rest/types';
import {apiClient, baseApiUrl} from '../../App';
import LinearProgress from 'material-ui/LinearProgress';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {jsonApiHttpClient, queryParameters} from 'aor-jsonapi-client/build/fetch';

import {green500, amber500, red500, blueGrey500} from 'material-ui/styles/colors';

const initialState = {
    callingCode: null,
    destinationNumber: '',
    loading: true,
    errorText: null,
    checkingDestination: false,
    isDestinationNumberValid: false
}

const styles = {
    errorStyle: {
        color: red500
    },
    successStyle: {
        color: green500
    },
    floatingLabelFocusStyle: {
        color: blueGrey500
    }
};

const defaultParams = {
    sort: {
        field: 'id',
        order: 'asc'
    },
    filter: {},
    pagination: {
        page: 1,
        perPage: 1000
    }
}

class Destination extends Component {

    state = initialState

    componentWillMount() {
        apiClient(GET_LIST, 'countries', defaultParams).then((response) => {
            this.setState({countries: response.data, loading: false})
            this
                .props
                .saveValues({availableCountries: response.data})
        })
    }

    checkDestination = () => {
        this.setState({checkingDestination: true})
        const {callingCode, destinationNumber} = this.state;
        const itzDestinationNumber = `+${callingCode}${destinationNumber}`;
        const params = {
            destination_number: itzDestinationNumber
        };
        jsonApiHttpClient(`${baseApiUrl}/msisdn_info?${queryParameters(params)}`).then((response) => {
            if (response.json.status === "ok") {
                this.setState({errorText: "Destination available", isDestinationNumberValid: true, checkingDestination: false})
                this
                    .props
                    .saveValues({itzDestinationNumber: itzDestinationNumber, msisdnInfo: response.json.data})
            } else { // Something's not right with the destination number
                this.setState({errorText: response.json.errors[0].detail, isDestinationNumberValid: false, checkingDestination: false})
            }
        })
    }

    render() {

        const {
            callingCode,
            destinationNumber,
            errorText,
            checkingDestination,
            isDestinationNumberValid,
            loading
        } = this.state;

        const {msisdnInfo, availableCountries, nextStep} = this.props;

        return loading
            ? <LinearProgress mode="indeterminate"/>
            : <span>
                <AutoComplete
                    onNewRequest={(chosenRequest, index) => {
                    this.setState({callingCode: chosenRequest.value})
                }}
                    dataSource={availableCountries.map(item => {
                    return {
                        value: parseInt(item.callingCode, 10),
                        text: item.name
                    }
                })}
                    floatingLabelText="Destination Number Country"
                    hintText="Start typing to select a Country.."/>
                <span
                    style={{
                    display: callingCode
                        ? 'block'
                        : 'none'
                }}>
                    <TextField floatingLabelText="Calling Code" value={`+${callingCode}`} disabled/>
                    <br/>
                    <TextField
                        floatingLabelText="Destination Number"
                        value={destinationNumber}
                        errorText={errorText}
                        errorStyle={isDestinationNumberValid === true
                        ? styles.successStyle
                        : styles.errorStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        onChange={(event, newValue) => {
                        this.setState({errorText: null, destinationNumber: newValue})
                    }}/>
                </span>
                <span
                    style={{
                    marginTop: 12,
                    display: (destinationNumber.length < 4)
                        ? 'none'
                        : 'block'
                }}>
                    <RaisedButton
                        label={checkingDestination === true
                        ? "Checking.."
                        : "Check Destination"}
                        backgroundColor={amber500}
                        disabled={checkingDestination}
                        onClick={this.checkDestination}/>
                </span>
                <span
                    style={{
                    marginTop: 12,
                    display: isDestinationNumberValid
                        ? 'block'
                        : 'none'
                }}>
                    <TextField
                        floatingLabelText="Chosen Number"
                        value={`+${msisdnInfo.msisdn}`}
                        disabled/>
                    <br/>
                    <TextField floatingLabelText="Operator" value={msisdnInfo.operator} disabled/>
                    <br/>
                    <RaisedButton
                        style={{
                        marginTop: 12
                    }}
                        label='Next'
                        primary={true}
                        onClick={nextStep}/>
                </span>
            </span>
    }

}

export default Destination;