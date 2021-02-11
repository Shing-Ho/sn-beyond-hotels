import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import cx from 'classnames';
import _ from 'lodash';
import Input from 'components/Input/Input';
import venueActions from 'store/venue/actions';

import mentorImg from 'images/Icon_SupMan_Onboard_Arrow_Small.png';
import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import { ReactComponent as CloseIcon } from 'icons/Icon_Global_Action_Close.svg';
import { ReactComponent as AddIcon } from 'icons/plusBlue.svg';
import styles from './ProductsGroupAdd.module.scss';

export default function ProductsGroupAdd({
  placeholder = 'Add a product group name for this first group...',
  trash = false,
  equal = false,
  add = false,
  close = false,
  onboarding,
  closeProductGroupAdd,
  venue,
}) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState('');

  const debouncedFunction = useRef(
    _.debounce((name) => {
      setGroupName(name);
    }, 500),
  );

  useEffect(() => debouncedFunction.current(groupName), [groupName]);

  const onAddProductGroup = () => {
    if (venue && groupName !== '') {
      const payload = {
        venue: venue.id,
        name: groupName,
      };
      dispatch(venueActions.createVenueProductGroup(payload));
      closeProductGroupAdd(false);
    }
  };

  return (
    <div className={styles.openedHeader} onClick={(event) => event.stopPropagation()}>
      <div
        className={cx(styles.input, {
          [styles.onboarding]: onboarding,
        })}
      >
        <div className={styles.mentoring}>
          <p>Add similar products to Product Groups</p>
          <img src={mentorImg} alt="Arrow for mentoring" />
        </div>
        <Input placeholder={placeholder} value={groupName} onChange={setGroupName} maxLength={30} />
      </div>
      <div className={styles.actions}>
        {trash && (
          <div className={styles.item}>
            <TrashIcon width={14} />
          </div>
        )}
        {equal && (
          <div className={styles.item}>
            <DragIcon width={20} />
          </div>
        )}
        {add && (
          <div className={styles.item}>
            <AddIcon width={16} height={16} onClick={() => onAddProductGroup()} />
          </div>
        )}
        {close && (
          <div className={styles.item}>
            <CloseIcon width={15} height={15} onClick={() => closeProductGroupAdd(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
