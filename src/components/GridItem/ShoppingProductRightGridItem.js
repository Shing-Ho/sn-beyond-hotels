import React from 'react';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { getRandomImageUrl } from 'helpers/utils';
import Button from 'components/Button/Button';
import shoppingActions from 'store/shopping/actions';
import { push } from 'connected-react-router';
import { ReactComponent as ShoppingIcon } from 'icons/dashboardIcons/Icon_Category_Shopping.svg';
import snIcon from '../../icons/Icon_Global_Logo_SN_Icon.svg';
import styles from './ShoppingGridItems.module.scss';

export default function ShoppingProductRightGridItem({ className, data = {} }) {
  const dispatch = useDispatch();
  const onViewClick = () => {
    dispatch(shoppingActions.selectStore(data.store));
    dispatch(push(`${window.BASE_ROUTE || ''}/shopping/store/${data.store.id}`));
  };
  return (
    <div className={cx(styles.root, className)}>
      <div className={styles.banner}>
        <img src={data.store.image || getRandomImageUrl()} alt="other shpping item" />
      </div>
      <div className={styles.content}>
        {/* {data.icon && ( */}
        <span className={styles.icon}>
          <div className={styles.bagIconImg}>
            <ShoppingIcon />
          </div>
        </span>
        {/* )} */}
        <span className={styles.textAlign}>{data.store.title}</span>
        <br />
        <div className={styles.ratinginfo}>
          <span>
            <img className={styles.targetIcon} src={snIcon} alt="" />
          </span>
          <div className={styles.rating}>{data.store.rating}/5 </div>
          <FormattedMessage id="rating" defaultMessage="User Rating" />
        </div>
        <Button variant="btn btn-success" onClick={onViewClick}>
          View Store Page
        </Button>
      </div>
    </div>
  );
}
