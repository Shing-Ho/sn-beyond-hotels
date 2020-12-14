import React from "react";
import cx from "classnames";
import { ReactComponent as BedIcon } from "icons/bed3.svg";
import { ReactComponent as CleanIcon } from "icons/cleaner.svg";
import { ReactComponent as UserGroupIcon } from "icons/user-group.svg";
import Tag from "components/Tag/Tag";
import styles from "./DetailHeader.module.scss";

const DetailHeader = ({ className, details, headerOnly }) => {
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.title}>
        <div className={styles.bedIcon}>
          <BedIcon />
        </div>
        {details.name}
      </div>
      {!headerOnly && (
        <div className={styles.tags}>
          <div className={styles.left}>
            <Tag text="Tag" />
            <Tag text="Longer Tag" />
            <Tag text="Tag" />
            <Tag text="Longer Tag" />
          </div>
          <div className={styles.right}>
            <Tag text="Very Clean" color="#00d6a3" icon={<CleanIcon />} />
            <Tag text="Crowded" color="#b94b19" icon={<UserGroupIcon />} />
            <Tag color="#7b7c7e" icon={<UserGroupIcon />} />
            <Tag color="#7b7c7e" icon={<UserGroupIcon />} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailHeader;
