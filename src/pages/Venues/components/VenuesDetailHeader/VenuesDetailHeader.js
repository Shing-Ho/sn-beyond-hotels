import React, { useState, useRef, useEffect } from 'react';
import { Select, Button } from 'antd';
import cx from 'classnames';
import _ from 'lodash';

import Input from 'components/Input/Input';
import mentorImg from 'images/Icon_SupMan_Onboard_Arrow_Large.png';
import { ReactComponent as SafetyIcon } from 'icons/Icon_SupMan_Safety.svg';
import styles from './VenuesDetailHeader.module.scss';

export default function VenuesDetailHeader({ onboarding, mainIcon, venue, onUpdateVenue }) {
  const [venueName, setVenueName] = useState(venue.name || '');
  const debouncedFunction = useRef(
    _.debounce((key) => {
      if (venue && key !== '' && venueName !== key) {
        onUpdateVenue(key, null);
      }
    }, 500),
  );

  useEffect(() => debouncedFunction.current(venueName), [venueName]);

  const handleTags = (tags) => {
    if (venue) {
      onUpdateVenue(venue.name, JSON.stringify(tags));
    }
  };
  return (
    <div
      className={cx(styles.detailHeader, {
        [styles.onboarding]: onboarding,
      })}
    >
      <div className={styles.title}>
        <div className={styles.mentoring1}>
          <p>Add the name of your venue</p>
          <img src={mentorImg} alt="Arrow for mentoring" />
        </div>
        <div className={styles.icon}>{mainIcon}</div>
        <div className={styles.input}>
          <Input
            value={venueName}
            placeholder="Add the name of the venue here..."
            maxLength={40}
            onChange={setVenueName}
          />
        </div>
      </div>
      <div className={styles.tags}>
        <div className={styles.mentoring2}>
          <img src={mentorImg} alt="Arrow for mentoring" />
          <p>Add tags that describe your venue</p>
        </div>
        <div className={styles.select}>
          <Select
            className={styles.tagsBox}
            placeholder="Add tags that describe traits of this venue..."
            mode="tags"
            onChange={(e) => handleTags(e)}
            defaultValue={venue && venue.tags !== '' && JSON.parse(venue.tags).length > 0 ? JSON.parse(venue.tags) : []}
          />
        </div>
        <div className={styles.button}>
          <Button className={styles.btn} icon={<SafetyIcon width={11} height={14} />}>
            Edit Safety
          </Button>
        </div>
      </div>
    </div>
  );
}
