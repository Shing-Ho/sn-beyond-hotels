import React from "react";
import styles from "./index.module.scss";
import { ReactComponent as BedIcon } from "icons/bed3.svg";
import {FormattedMessage} from "react-intl";
import {useSelector} from "react-redux";
import { commaFormat } from "helpers/utils";
import Rating from "components/Rating/Rating";
import { getCurrency } from "store/core/selectors";

const Item = ({ item }) => {
  const currency = useSelector(getCurrency);
  return(
  <div className={styles.resultContainer}>
    <div className={styles.resultItem}>
      <div className={styles.mainImage}>
        <img src={"//mobileimg.priceline.com/htlimg/31/31720604/thumbnail-300-square.jpg"} alt="Result Item" />
      </div>

      <div className={styles.right}>
        <div className={styles.circle}>
          <BedIcon />
        </div>
        <div className={styles.content}>
          <div className={styles.line}>
            <h3 className={styles.itemName}>{item.name}</h3>
          </div>

          <div>
            <Rating
              scoreonly
              score={item.start}
              className={styles.rating}
            />
          </div>
          <div className={`${styles.line} ${styles.baseline}`}>
              <span className={styles.description}>
                {item.description}
              </span>
          </div>
          <div className={styles.rateInfo}>
          <div className="flex-vertical-center">
            <span>
              <FormattedMessage id="from" defaultMessage="FROM" />
            </span>
            <span className={styles.itemRate}>
              {currency?.symbol + commaFormat(item.from)}
            </span>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
  )
};
export default Item;
