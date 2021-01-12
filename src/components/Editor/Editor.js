import React, { useState } from 'react';
import LzEditor from 'react-lz-editor';
import cx from 'classnames';
import { extractStringFromHTML } from 'helpers/utils';
import styles from './Editor.module.scss';

export default function Editor({
  active,
  value,
  image,
  video,
  audio,
  color,
  undoRedo,
  removeStyle,
  autoSave,
  pasteNoStyle,
  blockStyle,
  maxLength,
  onChange,
  className,
}) {
  const [wordCount, setWordCount] = useState(0);

  const handleKeyDown = (event) => {
    if (!maxLength) {
      return;
    }
    // not either of backspace or delete
    if (wordCount >= maxLength && event.code !== 8 && event.code !== 46) {
      event.preventDefault();
    }
  };
  const handleChange = (updatedValue) => {
    const newLength = extractStringFromHTML(updatedValue).length;
    onChange(value);
    setWordCount(newLength);
  };

  return (
    <div onKeyDown={handleKeyDown} className={cx(styles.root, className)}>
      <LzEditor
        active={!!active}
        image={!!image}
        video={!!video}
        audio={!!audio}
        color={!!color}
        undoRedo={!!undoRedo}
        removeStyle={!!removeStyle}
        autoSave={!!autoSave}
        pasteNoStyle={!!pasteNoStyle}
        blockStyle={!!blockStyle}
        importContent={value}
        cbReceiver={handleChange}
      />
      <span className={styles.limit}>{wordCount} Charactors</span>
    </div>
  );
}
