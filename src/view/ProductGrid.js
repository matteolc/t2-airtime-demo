import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {TextField as MuiTextField, DateField, ImageField, NumberField} from 'admin-on-rest';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';

import {green500, grey100, blueGrey500} from 'material-ui/styles/colors';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    card: {
        margin: '0.5em'
    },
    currency: {
        float: 'right'
    }
};

const ProductGrid = ({
    ids,
    isLoading,
    data,
    currentSort,
    basePath,
    rowStyle,
    showLocalPrice,
    showRetailPrice,
    showWholesalePrice,
    showTopupAction,
    topupCallback,
    productSelectedId
}) => (
    <div style={styles.root}>
        {ids.map((id) => <Card key={id} style={styles.card}>
            <CardHeader
                title={< MuiTextField record = {
                data[id]
            }
            source = "name" />}
                subtitle={< DateField record = {
                data[id]
            }
            source = "fetchedAt" showTime />}
                avatar={< ImageField record = {
                data[id]
            }
            source = "operatorLogo" />}/>
            <CardHeader
            style={{
                        display: showRetailPrice
                            ? 'block'
                            : 'none'
                    }}                                
                title={< NumberField record = {
                    data[id]
                }
                source = "retailPrice" options = {{ style: 'currency', currency: data[id].currency }}/>}
                subtitle={"Retail Price"}
                />    
            <CardHeader
            style={{
                        display: showWholesalePrice
                            ? 'block'
                            : 'none'
                    }}                                
                title={< NumberField record = {
                    data[id]
                }
                source = "wholesalePrice" options = {{ style: 'currency', currency: data[id].currency }}/>}
                subtitle={"Wholesale Price"}
                /> 
            <CardActions
                style={{
                display: showTopupAction
                    ? 'block'
                    : 'none'
            }}>
                <RaisedButton
                    label={productSelectedId === id
                    ? "Selected"
                    : "Select"}
                    backgroundColor={productSelectedId === id
                    ? green500
                    : blueGrey500}
                    labelColor={grey100}
                    disabled={isLoading || (productSelectedId === id)}
                    fullWidth
                    onClick={() => topupCallback(data[id])}/>
            </CardActions>
        </Card>)}
    </div>
);

ProductGrid.defaultProps = {
    showLocalPrice: true,
    showRetailPrice: true,
    showWholesalePrice: true,
    showTopupAction: false
}

export default ProductGrid;