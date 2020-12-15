import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import CartDrawer from '../CartDrawer';
import styles from './Page.module.scss';

const Page = ({ children, noHeader, noFooter }) => {
  return (
    <div className={styles.root}>
      <CartDrawer />
      {!noHeader ? <Header /> : null}
      <div className={styles.content}>
        {children}
      </div>
      {!noFooter ? <Footer/> : null}
    </div>
  );
}

export default Page;
