import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuOutlined } from '@ant-design/icons';
import coreActions from 'store/core/actions';
import { getSelectedRoomItems } from '../../store/booking/selectors';
import { getLocale } from '../../store/core/selectors';
import logo from '../../images/simplenight-logo.png';
import CartIcon from '../../icons/cart.svg';
import styles from './Header.module.scss';
import Select from '../Select/Select';
import { Languages } from '../../helpers/constants';

const languageOptions = Object.keys(Languages).map((value) => ({
  title: value,
  value: Languages[value],
}));

const Header = () => {
  const dispatch = useDispatch();
  const selectedRooms = useSelector(getSelectedRoomItems);
  const locale = useSelector(getLocale);

  const handleMenuButtonClick = () => {
    // dispatch(coreActions.toggleDrawerOpen());
  };

  const onLanguageChange = (_locale) => {
    dispatch(coreActions.setLocale(_locale));
  };

  console.log('###', languageOptions, locale);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <MenuOutlined className={styles.menubtn} onClick={handleMenuButtonClick} />
        <div className={styles.logo}>
          <img className={styles.logoImage} src={logo} alt="logo" />
        </div>
        <div className={styles.itemWrapper}>
          <div className={styles.langWrapper}>
            <Select
              options={languageOptions}
              value={locale}
              showSearch={false}
              bordered={false}
              style={{ color: '#003398' }}
              defaultActiveFirstOption={false}
              onChange={onLanguageChange}
            />
          </div>
          <div className={styles.cartWrapper} onClick={() => dispatch(coreActions.toggleDrawer(true))}>
            <p>{selectedRooms.length}</p>
            <img src={CartIcon} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
