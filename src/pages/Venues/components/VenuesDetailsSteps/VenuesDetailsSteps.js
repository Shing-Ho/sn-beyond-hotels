import React from 'react';
import { Button } from 'antd';

import Input from 'components/Input/Input';
import { Steps, Step } from 'components/Steps/Steps';
import styles from './VenuesDetailsSteps.module.scss';

const steps = [
  {
    step: 1,
    title: 'Description',
  },
  {
    step: 2,
    title: 'Location',
  },
  {
    step: 3,
    title: 'Capacity',
  },
  {
    step: 4,
    title: 'Payment',
  },
  {
    step: 5,
    title: 'Hours',
  },
];

export default function VenuesDetailsSteps({ onCancel }) {
  const [currentStep, setCurrentStep] = React.useState(0);

  const handleStep = (step) => {
    if (step < 0 || step > 4) {
      onCancel();
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
              <Input
                placeholder="Describe Your Venue, Your Way"
                suffix={<div className={styles.suffix}>500 Word Limit</div>}
              />
            </div>
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
