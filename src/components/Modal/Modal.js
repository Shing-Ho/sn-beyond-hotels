import React from 'react';
import { Modal } from 'antd';

import { ReactComponent as CloseIcon } from 'icons/Icon_Global_Action_Close.svg';
import styles from './Modal.module.scss';

export default function CustomModal({ title, footer = null, visible, centered = false }) {
  return (
    <Modal
      title={title}
      footer={footer}
      centered={centered}
      visible={visible}
      closeIcon={<CloseIcon className={styles.closeIcon} width={24} height={24} />}
    />
  );
}
