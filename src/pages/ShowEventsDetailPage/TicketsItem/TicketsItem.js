import React from "react";
import Ticket from '../../../icons/tickets.png';
import NumberInput from "../../../components/NumberInput/NumberInput";
import {ReactComponent as InfoIcon} from "../../../icons/info.svg";
import {FormattedMessage} from "react-intl";
import styles from "./TicketsItem.module.scss";

const TicketsItem = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <img src={Ticket} alt={'ticket'}/>
        <div className={styles.detail}>
          <div className={styles.title}>
            <div className={styles.header}>Right</div>
            <div className={styles.time}>12:00 PM 3.00 PM <span>+2</span></div>
          </div>
          <div className={styles.priceDiv}>
            <div className={styles.price}>$ 190.00</div>
            <div className={styles.duration}>160 Min<span>Duration</span></div>
          </div>
          <div className={styles.learnDiv}>
            <div className={styles.learn}>
              <InfoIcon />
              <FormattedMessage id="learnMore" />
            </div>
            <div className={styles.countDiv}>
              <span className="mr-1">
                <FormattedMessage id="guests" />
              </span>
              <NumberInput defaultValue={2} onChange={() => null} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default TicketsItem;
