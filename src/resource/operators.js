import React from 'react';
import {Show, SimpleShowLayout, ReferenceManyField} from 'admin-on-rest';
import ProductGrid from '../view/ProductGrid';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import {CardActions} from 'material-ui/Card';

const OperatorTitle = ({record}) => record
    ? <span>Products for Operator #{record.id}</span>
    : null;

const cardActionStyle = {
    zIndex: 2,
    padding: 8,
    position: 'relative',
    display: 'inline-block',
    float: 'right'
};

const OperatorActions = ({
    resource,
    filters,
    displayedFilters,
    filterValues,
    basePath,
    showFilter,
    refresh,
    history
}) => (
    <CardActions style={cardActionStyle}>
        {filters && React.cloneElement(filters, {resource, showFilter, displayedFilters, filterValues, context: 'button'})}       
        <FlatButton
            primary
            label="refresh"
            onClick={refresh}
            icon={< NavigationRefresh />}/>
    </CardActions>
);

export const OperatorShow = (props) => (
    <Show actions={< OperatorActions />} title={< OperatorTitle />} {...props}>
        <SimpleShowLayout>
            <ReferenceManyField addLabel={false} reference="products" target="operator_id">
                <ProductGrid/>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);
