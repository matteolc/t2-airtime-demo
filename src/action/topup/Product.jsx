import React, {Component} from 'react';
import {GET_LIST} from 'admin-on-rest/lib/rest/types';
import {apiClient, baseApiUrl} from '../../App';
import LinearProgress from 'material-ui/LinearProgress';
import {jsonApiHttpClient} from 'aor-jsonapi-client/build/fetch';
import ProductGrid from '../../view/ProductGrid';

const initialState = {
    products: [],
    loading: true,
    reservingId: false
}

const defaultParams = {
    sort: {
        field: 'id',
        order: 'asc'
    },
    pagination: {
        page: 1,
        perPage: 1000
    }
}

class Product extends Component {

    state = initialState

    componentWillMount() {
        const {msisdnInfo} = this.props;
        apiClient(GET_LIST, 'products', {
            ...defaultParams,
            filter: {
                operator_id: msisdnInfo.operatorId
            }
        }).then((response) => {
            this.setState({products: response.data, loading: false})
        })
    }

    selectTopup = (product) => {
        this.setState({reservingId: true})
        jsonApiHttpClient(`${baseApiUrl}/reserve_id`).then((response) => {
            if (response.json.status === "ok") {
                this.setState({reservingId: false})
                this
                    .props
                    .saveValues({
                        reservedId: response.json.data.reserved_id,
                        productInfo: {
                            ...product
                        }
                    })
                this
                    .props
                    .nextStep()
            } else { // We didn't get a transaction ID
                this.setState({errorText: response.json.errors[0].detail, reservingId: false})
            }
        })
    }

    render() {

        const {products, loading, reservingId} = this.state;

        const {productInfo} = this.props;

        const dataProducts = products.reduce((prev, record) => {
            prev[record.id] = record;
            return prev;
        }, {});

        // TODO DISABLE PRODUCTS IF INSUFFICIENT FUNDS
        return loading || reservingId
            ? <LinearProgress mode="indeterminate"/>
            : <span>
                <ProductGrid
                    ids={products.map(product => product.id)}
                    data={dataProducts}
                    showLocalPrice={false}
                    showRetailPrice={true}
                    showWholesalePrice={false}
                    showTopupAction={true}
                    topupCallback={this.selectTopup}
                    productSelectedId={productInfo.id}
                    isLoading={reservingId}/>
            </span>
    }
}

export default Product;