import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import coreActions from 'store/core/actions';
import { ReactComponent as ArrowIcon } from 'icons/arrow-down-small.svg';
import { getLocale, getCurrentMenu } from '../../store/core/selectors';
import slogo from '../../images/snlogo.png';
import unitedLogo from '../../images/united-logo.png';
import profile from '../../images/profile.png';
import Select from '../Select/Select';
import { Languages } from '../../helpers/constants';
import styles from './Header.module.scss';

const languageOptions = Object.keys(Languages).map((value) => ({
  title: value,
  value: Languages[value],
}));

const Header = ({ location }) => {
  const dispatch = useDispatch();
  // const selectedRooms = useSelector(getSelectedRoomItems);
  const locale = useSelector(getLocale);
  const currentMenu = useSelector(getCurrentMenu);

  useEffect(() => {
    if (location?.pathname.includes('venues')) {
      dispatch(coreActions.setCurrentMenu('/venues'));
    } else {
      dispatch(coreActions.setCurrentMenu('/'));
    }
  }, []);

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
        <div className={styles.mainContainer}>
          <MenuOutlined className={styles.menubtn} onClick={handleMenuButtonClick} />
          <div className={styles.logo}>
            <img className={styles.logoImage} src={slogo} alt="logo" />
          </div>
        </div>
        <Menu onClick={onMenuChange} className={styles.menus} selectedKeys={[currentMenu]} mode="horizontal">
          <Menu.Item className={styles.menuItem} key="/">
            <FormattedMessage id="dashboard" defaultMessage="Dashboard" />
          </Menu.Item>
          <Menu.Item className={styles.menuItem} key="/venues">
            <FormattedMessage id="venues" defaultMessage="Venues" />
          </Menu.Item>
        </Menu>
        <div className={styles.profileWrapperMain}>
          <div className={styles.profileWrapper}>
            <img src={unitedLogo} alt="logo" />
            <div className={styles.bar} />
            <div>
              <img src={profile} alt="profile" />
            </div>
          </div>
          <div className={styles.dropdown}>
            <ArrowIcon />
          </div>
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
          {/* <div className={styles.cartWrapper} onClick={() => dispatch(coreActions.toggleDrawer(true))}> */}
          {/*  <span>{selectedRooms.length}</span> */}
          {/*  <img src={CartIcon} alt="" /> */}
          {/* </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
