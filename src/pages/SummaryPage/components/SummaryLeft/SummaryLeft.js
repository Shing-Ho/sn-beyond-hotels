import React from 'react';
import _ from 'lodash';

import FormWithHeader from 'components/FormWithHeader/FormWithHeader';
import SummaryDetailForm from '../SummaryDetailForm/SummaryDetailForm';

export default function SummaryLeft({ detail, penalty, ...props }) {
  return (
    <div>
      <FormWithHeader left="Hotels">
        <SummaryDetailForm
          startDate={_.get(detail, 'start_date')}
          endDate={_.get(detail, 'end_date')}
          penalty={penalty}
          {...detail}
          {...props}
          index={0}
        />
      </FormWithHeader>
    </div>
  );
}
