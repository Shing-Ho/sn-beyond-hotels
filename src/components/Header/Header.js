import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import coreActions from 'store/core/actions';
import { getSelectedRoomItems } from '../../store/booking/selectors';
import { getLocale, getCurrentMenu } from '../../store/core/selectors';
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
  const currentMenu = useSelector(getCurrentMenu);

  const handleMenuButtonClick = () => {
    // dispatch(coreActions.toggleDrawerOpen());
  };

  const onLanguageChange = (_locale) => {
    dispatch(coreActions.setLocale(_locale));
  };

  const onMenuChange = (menu) => {
    dispatch(coreActions.setCurrentMenu(menu.key || '/'));
    dispatch(push(menu.key));
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <MenuOutlined className={styles.menubtn} onClick={handleMenuButtonClick} />
        <div className={styles.logo}>
          <img className={styles.logoImage} src={logo} alt="logo" />
        </div>
        <Menu onClick={onMenuChange} className={styles.menus} selectedKeys={[currentMenu]} mode="horizontal">
          <Menu.Item className={styles.menuItem} key="/">
            <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
          </Menu.Item>
          <Menu.Item className={styles.menuItem} key="/venues">
            <FormattedMessage id="venues" defaultMessage="Venues" />
          </Menu.Item>
        </Menu>
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
