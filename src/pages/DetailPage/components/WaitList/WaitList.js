import React from 'react';
import { Input } from 'antd';
import { FormattedMessage } from 'react-intl';
import { Chart } from 'react-charts';

import { ReactComponent as CloseIcon } from 'icons/close-fill-gray.svg';
import CustomCollapse from 'components/Collapse/Collapse';
import { Checkbox } from 'components/CheckboxGroup/CheckboxGroup';
import Button from 'components/Button/Button';
import styles from './WaitList.module.scss';

const WaitList = ({ onBack }) => {
  const onMakeChange = () => {
    //
  };

  const series = React.useMemo(
    () => ({
      type: 'bar',
    }),
    [],
  );

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { position: 'left', type: 'linear', stacked: false, show: true, tickPadding: 5 },
    ],
    [],
  );

  const data = [
    {
      data: [{ primary: 'Average Wait Time', radius: undefined, secondary: 5 }],
      label: '4 PM',
    },
    {
      data: [{ primary: 'Average Wait Time', radius: undefined, secondary: 15 }],
      label: '4:30 PM',
    },
    {
      data: [{ primary: 'Average Wait Time', radius: undefined, secondary: 20 }],
      label: '5 PM',
    },
    {
      data: [{ primary: 'Average Wait Time', radius: undefined, secondary: 30 }],
      label: '5:30 PM',
    },
    {
      data: [{ primary: 'Average Wait Time', radius: undefined, secondary: 25 }],
      label: '6 PM',
    },
  ];

  // Based off my chart bars
  const getSeriesStyle = React.useCallback(() => {
    '#6684c1';
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.bookContent}>
        <div className={styles.header}>
          <span className={styles.headerText}>Join the WaitList</span>
          <Button onClick={onBack}>
            <CloseIcon />
          </Button>
        </div>
        <div className={styles.main}>
          <div className={styles.top}>
            <span>
              <span className={styles.boldText}>4 </span>
              <span className={styles.normalText}>Guests</span>
            </span>
            <span>
              <span className={styles.boldText}>00/00/2019 </span>
              <span className={styles.normalText}>at </span>
              <span className={styles.boldText}>5:00 PM</span>
            </span>
          </div>
          <div className={styles.waitDiv}>
            <span className={styles.boldText}>20-30 </span>
            <span className={styles.normalText}>MINUTE WAIT</span>
          </div>
          <div className={styles.collapse}>
            <CustomCollapse header="Average Wait Times">
              <div className={styles.chartDiv}>
                <Chart data={data} series={series} axes={axes} getSeriesStyle={getSeriesStyle} />
              </div>
            </CustomCollapse>
          </div>
          <div className={styles.inputGroup}>
            <Input placeholder="John Smith" />
            <div className={styles.rightInput}>
              <span className={styles.inputText}>Under My Name</span>
              <Checkbox />
            </div>
          </div>
        </div>
        <Button className={styles.bookNow} onClick={onMakeChange}>
          <FormattedMessage id="makeChange" defaultMessage="Make a Change" />
        </Button>
        <Button className={styles.addToItinerary}>
          <FormattedMessage id="confirmWaitList" defaultMessage="Confirm Waitlist" />
        </Button>
      </div>
    </div>
  );
};

export default WaitList;
