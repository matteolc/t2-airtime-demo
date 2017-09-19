import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import AutoComplete from 'material-ui/AutoComplete';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';

const styles = {
    toggle: {
        maxWidth: 250,
        marginBottom: 16
    }
};

const initialState = {
    callingCode: null,
    optionalInfo: false,
}

class Review extends Component {

    state = initialState

    render() {

        const {callingCode, optionalInfo} = this.state;

        const {
            availableCountries,
            saveValues,
            topupMethod,
            senderNumber,
            sendSms,
            smsMessage,
            cid1,
            cid2,
            cid3,
            nextStep,
            prevStep
        } = this.props;

        

        let avaiableTopupMethods = [< MenuItem key = {
                1
            }
            value = {
                "simulation"
            }
            primaryText = "Simulation" />
        ];

        if (process.env.REACT_APP_SIMULATION_ONLY==='no') {
            avaiableTopupMethods.push(< MenuItem key = {
                2
            }
            value = {
                "topup"
            }
            primaryText = "Topup" />

            )
        }

        return (
            <span>
                <CardText>
                    <SelectField
                        value={topupMethod}
                        onChange={(event, key, payload) => {
                        saveValues({topupMethod: payload})
                    }}
                        floatingLabelText="Topup Method"
                        floatingLabelFixed={true}
                        hintText="Choose a Topup Method..">
                        {avaiableTopupMethods}
                    </SelectField>
                    <br/>
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
                        floatingLabelText="Sender Number Country"
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
                            hintText='Enter Sender Number..'
                            floatingLabelText='Sender Number'
                            value={senderNumber}
                            onChange={(event, newValue) => {
                            saveValues({senderNumber: newValue, itzSenderNumber: `+${callingCode}${newValue}`})
                        }}/>
                    </span>
                </CardText>
                <CardText>
                    <Toggle
                        style={styles.toggle}
                        label="Send confirmation SMS"
                        defaultToggled={sendSms}
                        onToggle={(event, isInputChecked) => {
                        saveValues({sendSms: isInputChecked})
                    }}/>
                    <span
                        style={{
                        display: sendSms
                            ? 'block'
                            : 'none'
                    }}>

                        <br/>
                        <TextField
                            hintText='Enter SMS message..'
                            floatingLabelText='SMS Message'
                            floatingLabelFixed={true}
                            value={smsMessage}
                            multiLine={true}
                            onChange={(event, newValue) => {
                            saveValues({smsMessage: newValue})
                        }}/>
                    </span>
                </CardText>
                <CardText>
                    <Toggle
                        style={styles.toggle}
                        label="Record optional information"
                        defaultToggled={optionalInfo}
                        onToggle={(event, isInputChecked) => {
                        this.setState({optionalInfo: isInputChecked})
                    }}/>
                    <span
                        style={{
                        display: optionalInfo
                            ? 'block'
                            : 'none'
                    }}>
                        <TextField
                            hintText='Enter optional info 1..'
                            floatingLabelText='Optional info 1'
                            floatingLabelFixed={true}
                            value={cid1}
                            fullWidth
                            onChange={(event, newValue) => {
                            saveValues({cid1: newValue})
                        }}/>
                        <br/>
                        <TextField
                            hintText='Enter optional info 2..'
                            floatingLabelText='Optional info 2'
                            floatingLabelFixed={true}
                            value={cid2}
                            fullWidth
                            onChange={(event, newValue) => {
                            saveValues({cid2: newValue})
                        }}/>
                        <br/>
                        <TextField
                            hintText='Enter optional info 3..'
                            floatingLabelText='Optional info 3'
                            floatingLabelFixed={true}
                            value={cid3}
                            fullWidth
                            onChange={(event, newValue) => {
                            saveValues({cid3: newValue})
                        }}/>
                    </span>
                </CardText>
                <FlatButton
                    label="Back"
                    onClick={prevStep}
                    style={{
                    marginRight: 12
                }}/>
                <span
                    style={{
                    marginTop: 12,
                    display: (senderNumber && senderNumber.length > 3)
                        ? 'inline'
                        : 'none'
                }}>
                    <RaisedButton
                        style={{
                        marginTop: 12
                    }}
                        label='Next'
                        primary={true}
                        onClick={nextStep}/>
                </span>
            </span>
        )

    }

}

export default Review;