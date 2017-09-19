import React from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import {TextField as MuiTextField, DateField, ShowButton, ImageField} from 'admin-on-rest';

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
    },
    card: {
        margin: '0.5em'
    }
};

const OperatorGrid = ({
    ids,
    isLoading,
    data,
    currentSort,
    basePath,
    rowStyle
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
            source = "logo" />}/>
            <CardActions>
                <ShowButton
                    label="Products"
                    resource="operators"
                    basePath={basePath}
                    record={data[id]}/>
            </CardActions>
        </Card>)}
    </div>
);

export default OperatorGrid;