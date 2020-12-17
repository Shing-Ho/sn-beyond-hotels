import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button } from 'antd';
import Ticket from 'icons/tickets.png';
import NumberInput from 'components/NumberInput/NumberInput';
import { ReactComponent as InfoIcon } from 'icons/info.svg';
import styles from './SeatingItem.module.scss';

const SeatingItem = () => (
  <div className={styles.root}>
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <img src={Ticket} alt="ticket" />
        <div className={styles.detail}>
          <div className={styles.title}>
            <div className={styles.header}>Right</div>
            <div className={styles.time}>12:00 PM</div>
          </div>
          <div className={styles.priceDiv}>
            <div className={styles.price}>$190.00 - $240</div>
            <div className={styles.duration}>
              160 Min<span>Duration</span>
            </div>
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
      <div className={styles.seatContainer}>
        <div className={styles.seatHeader}>
          <span>
            <FormattedMessage id="seats" />
          </span>
          <span>
            <FormattedMessage id="guests" />
          </span>
        </div>
        <div className={styles.seatBody}>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
          <div className={styles.seatDetail}>
            <div className={styles.seatNames}>A 21, A22</div>
            <div className={styles.seatBook}>
              <div className={styles.seatPrice}>$190.00/Seat</div>
              <div className={styles.seatButton}>
                <Button>Add</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default SeatingItem;
