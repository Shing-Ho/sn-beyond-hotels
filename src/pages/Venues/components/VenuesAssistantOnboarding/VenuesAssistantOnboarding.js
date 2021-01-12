import React from 'react';
import { Button } from 'antd';
import cx from 'classnames';

import item1Img from 'images/Venue-image@2x@2x.png';
import item2Img from 'images/Venue-product@2x@2x.png';
import item3Img from 'images/Venue-tab@2x@2x.png';
import { ReactComponent as PhotoIcon } from 'icons/Icon_SupMan_Photos.svg';
import { ReactComponent as SupplyIcon } from 'icons/Icon_SupMan_SupplyManager.svg';
import { ReactComponent as CheckIcon } from 'icons/Icon_Global_Check.svg';
import { ReactComponent as CloseIcon } from 'icons/Icon_Global_Action_Close.svg';
import styles from './VenuesAssistantOnboarding.module.scss';

export default function VenuesAssistantOnboarding({ currentStep, handleOnboarding }) {
  return (
    <div className={styles.assistantOnboarding}>
      <div className={styles.onboardingContainer}>
        {currentStep === 1 && (
          <div className={styles.explanations}>
            <h1>Easily build your venue and products</h1>
            <h3>Seamlessly add your venue details and showcase your products and services.</h3>
            <div className={styles.screens}>
              <div className={styles.item}>
                <img src={item1Img} alt="Add Photos and Video" />
                <div className={styles.content}>
                  <div className={styles.icon}>
                    <PhotoIcon width={22} />
                  </div>
                  <p>Add your venue details, photos, videos and availability.</p>
                </div>
              </div>
              <div className={styles.item}>
                <img src={item2Img} alt="Create Product" />
                <div className={styles.content}>
                  <div className={styles.icon}>
                    <SupplyIcon width={20} />
                  </div>
                  <p>Create Product Groups to easily bundle similar products.</p>
                </div>
              </div>
              <div className={styles.item}>
                <img src={item3Img} alt="Publish your completed venue" />
                <div className={styles.content}>
                  <div className={styles.icon}>
                    <CheckIcon width={24} />
                  </div>
                  <p>Publish your completed venue and products to make them Active to sell.</p>
                </div>
              </div>
            </div>
            <div className={styles.actions}>
              <Button className={styles.btn} onClick={() => handleOnboarding(0)}>
                Skip
              </Button>
              <Button className={[styles.btn, styles.primary]} onClick={() => handleOnboarding(2)}>
                Show Me
              </Button>
            </div>
            <CloseIcon width={16} height={16} className={styles.close} onClick={() => handleOnboarding(0)} />
          </div>
        )}
        {currentStep > 1 && (
          <div className={styles.stepActions}>
            <div className={styles.container}>
              <div className={styles.dots}>
                <span
                  className={cx(styles.dot, {
                    [styles.active]: currentStep === 2,
                  })}
                  onClick={() => handleOnboarding(2)}
                />
                <span
                  className={cx(styles.dot, {
                    [styles.active]: currentStep === 3,
                  })}
                  onClick={() => handleOnboarding(3)}
                />
                <span
                  className={cx(styles.dot, {
                    [styles.active]: currentStep === 4,
                  })}
                  onClick={() => handleOnboarding(4)}
                />
                <span
                  className={cx(styles.dot, {
                    [styles.active]: currentStep === 5,
                  })}
                  onClick={() => handleOnboarding(5)}
                />
              </div>
              <div className={styles.actions}>
                <Button className={styles.btn} onClick={() => handleOnboarding(0)}>
                  Skip
                </Button>
                <Button
                  className={[styles.btn, styles.primary]}
                  onClick={() => handleOnboarding(currentStep === 5 ? 0 : currentStep + 1)}
                >
                  {currentStep === 5 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
