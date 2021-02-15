import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import cx from 'classnames';
import _ from 'lodash';
import Input from 'components/Input/Input';
import venueActions from 'store/venue/actions';

import { ReactComponent as TrashIcon } from 'icons/trash.svg';
import { ReactComponent as DragIcon } from 'icons/Icon_SupMan_Drag.svg';
import { ReactComponent as CloseIcon } from 'icons/Icon_Global_Action_Close.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import styles from './ProductsGroupCollapsedHeader.module.scss';

export default function ProductsGroupCollapsedHeader({
  title = 'Hightlights',
  venue,
  amount = 0,
  trash = false,
  equal = false,
  edit = false,
  group,
  drag,
}) {
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState((group && group.name) || '');

  const handleCancelEdit = () => {
    setGroupName((group && group.name) || '');
    setIsEdit(false);
  };

  const onEditProductGroup = (newName) => {
    if (venue && group && newName !== '') {
      const payload = {
        venue: venue.id,
        name: newName,
        id: group.id,
      };
      dispatch(venueActions.updateVenueProductGroup(payload));
      // setIsEdit(false);
    }
  };

  const { confirm } = Modal;
  const onRemoveProductGroup = () => {
    if (venue && group) {
      const payload = {
        venue: venue.id,
        id: group.id,
      };
      confirm({
        title: 'Are you sure delete this group?',
        content: 'We will remove all products of this group.',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          dispatch(venueActions.removeVenueProductGroup(payload));
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }
  };

  const debouncedFunction = useRef(_.debounce(onEditProductGroup, 1000));
  const handleGroupNameChange = (newName) => {
    setGroupName(newName);
    debouncedFunction.current(newName);
  };

  return (
    <div className={styles.collapsedHeader} onClick={(event) => event.stopPropagation()}>
      {isEdit ? (
        <>
          <div className={styles.input}>
            <Input value={groupName} onChange={handleGroupNameChange} maxLength={30} />
          </div>
          <div
            className={cx(styles.actions, {
              [styles.edit]: true,
            })}
          >
            <div className={styles.item}>
              <CloseIcon width={15} height={15} onClick={() => handleCancelEdit()} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.title}>{title}</div>
          <div className={styles.amount}>
            <div className={styles.val}>{amount}</div>
          </div>
          <div className={styles.actions}>
            {edit && (
              <div className={styles.item}>
                <EditIcon width={16} height={16} onClick={() => setIsEdit(true)} />
              </div>
            )}
            {trash && (
              <div className={styles.item}>
                <TrashIcon width={14} onClick={() => onRemoveProductGroup()} />
              </div>
            )}
            {equal && drag && (
              <div className={styles.item} {...drag.dragHandleProps}>
                <DragIcon width={20} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
