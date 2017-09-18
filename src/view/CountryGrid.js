import React from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import {TextField as MuiTextField, DateField, ShowButton} from 'admin-on-rest';
import Flag from "react-flags";
import LinearProgress from 'material-ui/LinearProgress';

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

const CountryGrid = ({
    ids,
    isLoading,
    data,
    currentSort,
    basePath,
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
            source = "name" />}
                subtitle={< DateField record = {
                data[id]
            }
            source = "fetchedAt" showTime />}
                avatar={< div style = {{display: "block"}} > <Flag name={data[id].alpha3} format="png" pngSize={64} shiny={true}/> < /div>}/>
                <CardHeader                                
                title={`+${data[id].callingCode}`}
                subtitle="Calling Code"
                />   
            <CardActions>
                <ShowButton
                    label="Operators"
                    resource="countries"
                    basePath={basePath}
                    record={data[id]}/>
            </CardActions>
        </Card>)}
    </div>
);

export default CountryGrid;