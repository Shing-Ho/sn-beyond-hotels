import React, { useState } from 'react';
import Page from 'components/Page/Page';
import { useSelector } from 'react-redux';
import { getCurrency } from 'store/core/selectors';
import { Row, Drawer } from 'antd';
import { FormattedMessage } from 'react-intl';
import ShoppingLeftFilters from 'pages/Dashboard/SearchPage/components/Filters/ShoppingLeftFilters';
import ShoppingPage from 'pages/ShoppingPage/components/ShoppingPage';
import styles from './ShoppingList.module.scss';
import Button from '../../../components/Button/Button';
import Pagination from '../../../components/Pagination/Pagination';

export default function ShoppingList() {
  const currency = useSelector(getCurrency);
  const [showDrawer, toggleDrawer] = useState(false);
  return (
    <Page noHeader noFooter>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.detail}>
            <Drawer
              className="left-filter-drawer"
              visible={showDrawer}
              placement="bottom"
              closable
              onClose={() => toggleDrawer(false)}
              height="90%"
              width="100%"
            >
              <ShoppingLeftFilters className={styles.left} currency={currency} />
            </Drawer>
            <div className={styles.leftFilter}>
              <ShoppingLeftFilters className={styles.left} currency={currency} />
            </div>
            <div className={styles.right}>
              <ShoppingPage toggleDrawer={toggleDrawer} />
            </div>
          </div>
          <Row className={styles.buttonWrap}>
            <Button className={styles.btn}>
              <FormattedMessage id="showMore" defaultMessage="Show More" />
            </Button>
          </Row>
        </div>
      </div>
      <div className={styles.pagination}>
        <Pagination
          total={10}
          showSizeChanger
          defaultPageSize={9}
          pageSizeOptions={[9, 18, 27, 45]}
          className={styles.paginationContent}
        />
      </div>
    </Page>
  );
}
