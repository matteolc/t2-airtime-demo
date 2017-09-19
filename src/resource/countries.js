import React from 'react';
import {List, Show, SimpleShowLayout, ReferenceManyField} from 'admin-on-rest';
import CountryGrid from '../view/CountryGrid';
import OperatorGrid from '../view/OperatorGrid';
import LanguageIcon from 'material-ui/svg-icons/action/language';
export {LanguageIcon as CountryIcon};

export const CountryList = (props) => (
    <List pagination={''} title="Countries" {...props}>
        <CountryGrid/>
    </List>
);

const CountryTitle = ({record}) => record
    ? <span>Operators for Country #{record.id}</span>
    : null;

export const CountryShow = (props) => (
    <Show title={< CountryTitle />} {...props}>
        <SimpleShowLayout>
            <ReferenceManyField addLabel={false} reference="operators" target="country_id">
                <OperatorGrid/>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);
