import React from 'react';

import Button from 'components/Button/Button';
import { ReactComponent as EmailIcon } from 'icons/Email.svg';
import { ReactComponent as PhoneIcon } from 'icons/Phone.svg';
import { ReactComponent as ChatIcon } from 'icons/Chat.svg';
import styles from './FlightSearchSupport.module.scss';

export default function FlightSearchSupport() {
  return (
    <div className={styles.main}>
      <div className={styles.topText}>Need Some Help?</div>
      <div className={styles.description}>Do you need some help? Just email, call, or start a live chat with us!</div>
      <div className={styles.orderRow}>
        <div className={styles.eachItem}>
          <div className={styles.iconWrapper}>
            <EmailIcon className={styles.icon} />
          </div>
          <Button
            onClick={() => {
              const url = 'mailto:support@simplenight.zendesk.com';
              window.location.href = url;
            }}
          >
            Email Support
          </Button>
          <div className={styles.borderRight} />
        </div>
        <div className={styles.eachItem}>
          <div className={styles.iconWrapper}>
            <PhoneIcon className={styles.icon} />
          </div>
          <div className={styles.phoneText}>(800) 555-55555</div>
          <div className={styles.borderRight} />
        </div>
        <div className={styles.eachItem}>
          <div className={styles.iconWrapper}>
            <ChatIcon className={styles.icon} />
          </div>
          <Button>Start Chat</Button>
        </div>
      </div>
    </div>
  );
}
