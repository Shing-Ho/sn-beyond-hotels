import React from 'react';
import { Button } from 'antd';

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

export default function VenuesDetailsSteps() {
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className={styles.venuesDetailsSteps}>
      <div className={styles.stepsContainer}>
        <Steps current={currentStep} className="venues" labelPlacement="vertical">
          {steps.map((item) => (
            <Step key={item.title} title={item.title} icon={<div>{item.step}</div>} />
          ))}
        </Steps>
      </div>
      <div className={styles.content}>
        <div>{steps[currentStep].step}</div>
      </div>
      <div className={styles.actions}>
        <Button className={[styles.btn, styles.cancel]} onClick={prevStep}>
          Cancel
        </Button>
        <Button className={[styles.btn, styles.continue]} onClick={nextStep}>
          Continue
        </Button>
      </div>
    </div>
  );
}
