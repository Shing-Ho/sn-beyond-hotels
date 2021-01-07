import React from 'react';
import Page from 'components/Page/Page';
import { useSelector } from 'react-redux';
import { getCurrency } from 'store/core/selectors';
import { Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import ShoppingLeftFilters from 'pages/Dashboard/SearchPage/components/Filters/ShoppingLeftFilters';
import ShoppingPage from 'pages/ShoppingPage/components/ShoppingPage';
import styles from './ShoppingList.module.scss';
import Button from '../../../components/Button/Button';
import Pagination from '../../../components/Pagination/Pagination';

export default function ShoppingList() {
  const currency = useSelector(getCurrency);
  return (
    <Page noHeader noFooter>
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.detail}>
            <ShoppingLeftFilters className={styles.left} currency={currency} />
            <ShoppingPage />
          </div>
          <Row className={styles.buttonWrap}>
            <Button className={styles.btn}>
              <FormattedMessage id="showMore" defaultMessage="Show More" />
            </Button>
          </Row>
          <Row className={styles.pagination}>
            <Pagination
              total={10}
              showSizeChanger
              showQuickJumper
              defaultPageSize={9}
              pageSizeOptions={[9, 18, 27, 45]}
            />
          </Row>
        </div>
      </div>
    </Page>
  );
}
