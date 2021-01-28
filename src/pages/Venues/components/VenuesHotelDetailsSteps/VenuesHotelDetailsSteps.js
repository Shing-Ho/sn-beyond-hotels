import React from 'react';
import { Button, Input } from 'antd';
import cx from 'classnames';

import { Steps, Step } from 'components/Steps/Steps';
import { Tabs, TabPane } from 'components/Tab/Tab';
import DynamicComboList from 'components/DynamicComboList/DynamicComboList';
import ProductPhoto from '../ProductPhoto/ProductPhoto';
import VenueAddRoomPricing from '../VenueAddRoomPricing/VenueAddRoomPricing';

import styles from './VenuesHotelDetailsSteps.module.scss';

const { TextArea } = Input;
const steps = [
  {
    step: 1,
    title: 'General',
  },
  {
    step: 2,
    title: 'Description',
  },
  {
    step: 3,
    title: 'Room Type',
  },
  {
    step: 4,
    title: 'Price',
  },
  {
    step: 5,
    title: 'Photos',
  },
];

const bedroomOptions = [
  {
    name: 'Air Conditioning',
    value: false,
    default: true,
  },
  {
    name: 'Free Cribs/Infant Bed',
    value: false,
    default: true,
  },
  {
    name: 'Linens',
    value: false,
    default: true,
  },
  {
    name: 'Pillow-top Mattress',
    value: false,
    default: true,
  },
  {
    name: 'Premium Bedding',
    value: false,
    default: true,
  },
];

export default function VenuesDetailsSteps({ onCancel }) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [roomTypeActiveTab, setRoomTypeActiveTab] = React.useState('1');

  const handleStep = (step) => {
    if (step < 0 || step > 4) {
      onCancel();
      setCurrentStep(0);
    } else {
      setCurrentStep(step);
    }
  };

  return (
    <div className={styles.venuesDetailsSteps}>
      <div className={styles.stepsContainer}>
        <Steps current={currentStep} venuesMode labelPlacement="vertical">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} icon={<div>{item.step}</div>} />
          ))}
        </Steps>
      </div>
      <div className={styles.content}>
        {currentStep === 0 && (
          <div className={styles.step1}>
            <h1>Add Venue Description</h1>
            <div className={styles.input}>
              <TextArea
                placeholder="Describe Your Venue, Your Way"
                suffix="500 Word Limit"
                autoSize
                maxLength={500}
                showCount
              />
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className={styles.step2}>
            <h1>Add Venue Location</h1>
            <div className={styles.input}>
              <Input
                placeholder="Enter Venue Location"
                suffix={
                  <div className={styles.suffix}>
                    <i className="fa fa-search" />
                  </div>
                }
              />
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className={styles.step3}>
            <h1>Add Room Type Details</h1>
            <Tabs
              className={cx(styles.tabPane)}
              defaultActiveKey="1"
              activeKey={roomTypeActiveTab}
              onChange={(key) => setRoomTypeActiveTab(key)}
            >
              <TabPane tab="BEDROOM" key="1">
                <div className={styles.tabPaneData}>
                  <DynamicComboList list={bedroomOptions} />
                </div>
              </TabPane>
              <TabPane tab="BATHROOM" key="2">
                <div>Bathroom</div>
              </TabPane>
              <TabPane tab="ENTERTAINMENT" key="3">
                <div>Bathroom</div>
              </TabPane>
              <TabPane tab="FOOD AND DRINK" key="4">
                <div>Bathroom</div>
              </TabPane>
              <TabPane tab="MORE" key="5">
                <div>Bathroom</div>
              </TabPane>
            </Tabs>
          </div>
        )}
        {currentStep === 3 && (
          <div className={styles.step4}>
            <h1>Add Room Pricing</h1>
            <VenueAddRoomPricing />
            {/* <Button className={styles.addBtn}>
              <i className="fa fa-plus" aria-hidden="true" /> Add New Form Of Payment
            </Button> */}
          </div>
        )}
        {currentStep === 4 && (
          <div className={styles.step5}>
            <h1>Add Product Photos</h1>
            <ProductPhoto />
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <Button className={[styles.btn, styles.cancel]} onClick={() => handleStep(currentStep - 1)}>
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>
        <Button className={[styles.btn, styles.continue]} onClick={() => handleStep(currentStep + 1)}>
          {currentStep === 4 ? 'Finish' : 'Continue'}
        </Button>
      </div>
    </div>
  );
}
