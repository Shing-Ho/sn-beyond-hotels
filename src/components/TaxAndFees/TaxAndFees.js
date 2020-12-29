import React from 'react';
import { FormattedMessage } from 'react-intl';
import { commaFormat } from 'helpers/utils';
import './index.scss';

const taxesFees = ({ data, currency }) => (
  <div>
    <p>
      <FormattedMessage
        id="searchPage.filters.resultList.resultItem.rate"
        values={{ rate: commaFormat(data.rate.toFixed(currency?.decimal)) }}
      />
    </p>
    <p>
      <FormattedMessage
        id="searchPage.filters.resultList.resultItem.base"
        values={{ base: commaFormat(data.base.toFixed(currency?.decimal)) }}
      />
    </p>
    <p>
      <FormattedMessage
        id="searchPage.filters.resultList.resultItem.tax"
        values={{ tax: commaFormat(data.tax.toFixed(currency?.decimal)) }}
      />
    </p>
  </div>
);

export default taxesFees;
