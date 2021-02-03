import React from 'react';
import { Button, Input, Select, Switch } from 'antd';
import cx from 'classnames';

import { Steps, Step } from 'components/Steps/Steps';
import { Tabs, TabPane } from 'components/Tab/Tab';
import DynamicComboList from 'components/DynamicComboList/DynamicComboList';
import VenueItem from 'components/VenueItem/VenueItem';
import { ReactComponent as TrashIcon } from 'icons/secondaryTrash.svg';
import { ReactComponent as PlusIcon } from 'icons/plusBlue.svg';
import ProductPhoto from '../ProductPhoto/ProductPhoto';
import VenueAddRoomPricing from '../VenueAddRoomPricing/VenueAddRoomPricing';

import styles from './VenuesHotelDetailsSteps.module.scss';

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

const nameGroupOptions = [
  {
    title: 'Group 1',
    value: 'group1',
  },
  {
    title: 'Group 2',
    value: 'group2',
  },
  {
    title: 'Group 3',
    value: 'group3',
  },
  {
    title: 'Group 4',
    value: 'group4',
  },
];

const squareFeetOptions = [
  {
    title: '60',
    value: '60',
  },
  {
    title: '80',
    value: '80',
  },
  {
    title: '100',
    value: '100',
  },
  {
    title: '120',
    value: '120',
  },
  {
    title: '140',
    value: '140',
  },
];

const maxGuestsOptions = [
  {
    title: '10',
    value: '10',
  },
  {
    title: '20',
    value: '20',
  },
  {
    title: '30',
    value: '30',
  },
  {
    title: '40',
    value: '40',
  },
  {
    title: '50',
    value: '50',
  },
];

export default function VenuesDetailsSteps({ onCancel }) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [nameGroup, setNameGroup] = React.useState();
  const [squareFeet, setSquareFeet] = React.useState();
  const [maxGuests, setMaxGuests] = React.useState();
  const [balcony, setBalcony] = React.useState(false);
  const [highlightProduct, setHighlightProduct] = React.useState(false);
  const [roomTypeActiveTab, setRoomTypeActiveTab] = React.useState('1');
  const [roomPricing, setRoomPricing] = React.useState([{ id: 1, activeTab: '1', roomDate: null }]);

  const handleStep = (step) => {
    if (step < 0 || step > 4) {
      onCancel();
      setCurrentStep(0);
    } else {
      setCurrentStep(step);
    }
  };

  const onAddRoomPricing = (index) => {
    setRoomPricing([...roomPricing, roomPricing[index]]);
  };

  const onRemoveAddRoomPricing = (index) => {
    const temp = Object.assign([], roomPricing);
    temp.splice(index, 1);
    setRoomPricing(temp);
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
            <h1>Add General Product Information</h1>
            <div className={styles.productName}>
              <VenueItem left="Product Name" right="REQUIRED">
                <Input placeholder="Double Queen Bed" />
              </VenueItem>
            </div>
            <div className={styles.rowBetween}>
              <div className={styles.halfItem}>
                <VenueItem left="Product Group">
                  <Select
                    placeholder="Name Of Group"
                    value={nameGroup}
                    options={nameGroupOptions}
                    onChange={setNameGroup}
                  />
                </VenueItem>
              </div>
              <div className={styles.halfItem}>
                <VenueItem left="Item Code" right="REQUIRED">
                  <Input placeholder="Item Code" />
                </VenueItem>
              </div>
            </div>
            <div className={styles.rowBetween}>
              <div className={styles.halfBetween}>
                <div className={styles.halfHalfItem}>
                  <VenueItem left="Square Feet">
                    <Select
                      placeholder="Square Feet"
                      value={squareFeet}
                      options={squareFeetOptions}
                      onChange={setSquareFeet}
                    />
                  </VenueItem>
                </div>
                <div className={styles.halfHalfItem}>
                  <VenueItem left="Max Guests">
                    <Select
                      placeholder="Max Guests"
                      value={maxGuests}
                      options={maxGuestsOptions}
                      onChange={setMaxGuests}
                    />
                  </VenueItem>
                </div>
              </div>
              <div className={styles.halfBetween}>
                <div className={styles.halfHalfItem}>
                  <VenueItem left="Highlight Product">
                    <div className={styles.balcony}>
                      <Switch onChange={setHighlightProduct} />
                      <span>{highlightProduct ? 'YES' : 'NO'}</span>
                    </div>
                  </VenueItem>
                </div>
                <div className={styles.halfHalfItem}>
                  <VenueItem left="Balcony">
                    <div className={styles.balcony}>
                      <Switch onChange={setBalcony} />
                      <span>{balcony ? 'YES' : 'NO'}</span>
                    </div>
                  </VenueItem>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className={styles.step2}>
            <h1>Add Product Description</h1>
            <div className={styles.input}>
              <Input
                placeholder="Describe Your Product, Your Way"
                suffix={<span className={styles.suffix}>500 Word Limit</span>}
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
            {roomPricing.map((each, index) => (
              <div className={styles.main}>
                <VenueAddRoomPricing data={each} key={each.id} />
                <div className={styles.icons}>
                  <Button className={styles.trash} onClick={() => onRemoveAddRoomPricing(index)}>
                    <TrashIcon />
                  </Button>
                  <Button className={styles.copy} onClick={() => onAddRoomPricing(index)}>
                    <PlusIcon />
                  </Button>
                </div>
              </div>
            ))}
            <Button className={styles.addCustom}>
              <i className="fa fa-plus" aria-hidden="true" />
              Add Another Price Set
            </Button>
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
