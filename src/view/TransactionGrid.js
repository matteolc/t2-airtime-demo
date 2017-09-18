import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {TextField as MuiTextField, DateField, ShowButton, ImageField, NumberField} from 'admin-on-rest';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import {
    redA700,
    greenA700,
} from 'material-ui/styles/colors';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start'
    },
    card: {
        margin: '0.5em'
    }
};

const TransactionGrid = ({
    ids,
    isLoading,
    data,
    currentSort,
    basePath,
    showLocalPrice,
    showRetailPrice,
    showWholesalePrice,
    rowStyle
}) => (
    isLoading 
    ? <LinearProgress mode="indeterminate"/>
    : <div style={styles.root}>
        {ids.map((id) => <Card key={id} style={styles.card}>
            <CardHeader
                title={< MuiTextField record = {
                data[id]
            }
            source = "destinationMsisdn" />}
                subtitle={< DateField record = {
                data[id]
            }
            source = "date" showTime />}
                avatar={< ImageField record = {
                data[id]
            }
            source = "operatorLogo" />}/>
            <CardHeader                                
                title={< MuiTextField record = {
                    data[id]
                }
                elStyle={{
                        color: data[id].transactionErrorCode === 0
                            ? greenA700
                            : redA700
                    }}                
                source = "transactionErrorTxt" />}
                subtitle={"Transaction status"}
                />            
            <CardHeader
            style={{
                        display: showLocalPrice
                            ? 'block'
                            : 'none'
                    }}                                
                title={< NumberField record = {
                    data[id]
                }
                source = "productLocalPrice" options = {{ style: 'currency', currency: data[id].localCurrency }}/>}
                subtitle={"Retail Price"}
                />             
            <CardHeader
            style={{
                        display: showRetailPrice
                            ? 'block'
                            : 'none'
                    }}                                
                title={< NumberField record = {
                    data[id]
                }
                source = "productRetailPrice" options = {{ style: 'currency', currency: data[id].currency }}/>}
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
                source = "productWholesalePrice" options = {{ style: 'currency', currency: data[id].currency }}/>}
                subtitle={"Wholesale Price"}
                />  
            <CardText>
                <TextField floatingLabelText="Transfer-To #ID" defaultValue={id} disabled/>
            </CardText>
            <CardActions>
                <ShowButton resource="transactions" basePath={basePath} record={data[id]}/>
            </CardActions>
        </Card>)}
    </div>
);

TransactionGrid.defaultProps = {
    showLocalPrice: true,
    showRetailPrice: true,
    showWholesalePrice: true
}

export default TransactionGrid;