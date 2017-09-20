import React, {Component} from 'react';
import {Step, Stepper, StepLabel} from 'material-ui/Stepper';
import {Card, CardText} from 'material-ui/Card';
import {jsonApiHttpClient, queryParameters} from 'aor-jsonapi-client/build/fetch';
import {ViewTitle} from 'admin-on-rest/lib/mui';
import {GET_LIST} from 'admin-on-rest/lib/rest/types';
import {apiClient, baseApiUrl, tokenDigest} from '../App';
import {userLogout as userLogoutAction} from 'admin-on-rest/lib/actions/authActions';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import Destination from './topup/Destination'
import Product from './topup/Product'
import Review from './topup/Review'
import Checkout from './topup/Checkout'
import Result from './topup/Result'

const initialState = {
    stepIndex: 0,
    steps: 4,
    title: 'Topup',
    stepTitles: [
        'Enter Destination', 'Choose Product', 'Review Options', 'Checkout'
    ],
    loading: true,
    wizard: {
        availableCountries: [],
        msisdnInfo: {},
        productInfo: {},
        topupMethod: 'simulation',
        sendSms: false
    }
};

const styles = {
    content: {
        margin: '0 16px'
    },
    backButton: {
        marginRight: 12
    },
    cardText: {
        padding: 0
    },
    actions: {
        position: 'relative',
        paddingLeft: 16,
        paddingTop: 32,
        paddingBottom: 16
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

class Topup extends Component {

    state = initialState

    componentWillMount() {
        apiClient(GET_LIST, 'countries', defaultParams).then((response) => {
            this.setState({loading: false})
            this.saveValues({availableCountries: response.data})
        }).catch((reason) => {
            this
                .props
                .userLogout()
        })
    }

    getStepContent(stepIndex) {
        const {loading, result, wizard} = this.state;
        switch (stepIndex) {
            case 0:
                return <Destination
                    {...wizard}
                    saveValues={this.saveValues}
                    nextStep={this.handleNext}/>;
            case 1:
                return <Product {...wizard} saveValues={this.saveValues} nextStep={this.handleNext}/>;
            case 2:
                return <Review
                    {...wizard}
                    saveValues={this.saveValues}
                    nextStep={this.handleNext}
                    prevStep={this.handlePrev}/>;
            case 3:
                return <Checkout
                    {...wizard}
                    saveValues={this.saveValues}
                    nextStep={this.handleFinish}
                    loading={loading}/>;
            default:
                return <Result record={result} nextStep={this.handleRestart}/>
        }
    }

    saveValues = (values) => {
        this.setState({
            wizard: {
                ...this.state.wizard,
                ...values
            }
        })
    }

    handleRestart = () => this.setState(initialState);

    handleFinish = () => {
        this.setState({loading: true})
        const {wizard} = this.state;
        const params = {
            msisdn: wizard.itzSenderNumber,
            destination_number: wizard.itzDestinationNumber,
            product: wizard.productInfo.id,
            method: wizard.topupMethod,
            reserved_id: wizard.reservedId,
            send_sms: wizard.sendSms,
            sms: wizard.smsMessage,
            cid1: wizard.cid1,
            cid2: wizard.cid2,
            cid3: wizard.cid3
        };
        let options = {}
        options.method = 'POST'
        options.headers = new Headers({ 'Authorization': `Token token=${tokenDigest()}` });         
        jsonApiHttpClient(`${baseApiUrl}/topup?${queryParameters(params)}`, options).then((response) => {
            if (response.json.status === "ok") {
                this.setState({result: response.json.data, loading: false})
                this.handleNext()
            } else { // Something's gone wrong
                this.setState({errorText: response.json.errors[0].detail, loading: false})
            }
        })
    }

    handleNext = () => {
        const {stepIndex, steps} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= steps - 1
        });
    };

    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({
                stepIndex: stepIndex - 1
            });
        }
    };

    render() {

        const {stepIndex, steps, stepTitles, title} = this.state;

        return (
            <Card>
                <ViewTitle title={title}/>
                <CardText style={styles.cardText}>
                    <Stepper activeStep={stepIndex}>
                        {[...Array(steps)].map((_, i) => (
                            <Step key={i}>
                                <StepLabel>
                                    {stepTitles[i]}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <div style={styles.content}>
                        {this.getStepContent(stepIndex)}
                    </div>
                </CardText>
            </Card>
        );
    }

}

const mapStateToProps = state => ({});

const enhance = compose(connect(mapStateToProps, {userLogout: userLogoutAction}));

export default enhance(Topup);