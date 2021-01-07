import React, { useState } from 'react';
import Page from 'components/Page/Page';
// import ShoppingView from 'pages/ShoppingPage/components/ShoppingView';
import ShoppingList from 'pages/ShoppingPage/components/ShoppingList';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import styles from './ShoppingSearchPage.module.scss';

export default function ShoppingSearch({ onItemClick }) {
  // const [itemView, setItemView] = useState('list');
  const [itemView] = useState('list');
  return (
    <Page noHeader noFooter>
      <div className={styles.root}>
        <div className={styles.content}>
          {/* <div className={styles.marginIcon}>
            <ShoppingView itemView={itemView} setItemView={setItemView} />
          </div> */}
          <div className={styles.detail}>
            {itemView === 'list' && <ShoppingList items="list" onItemClick={onItemClick} />}
            {itemView === 'location' && <GoogleMap height={600} center={[24.2028, 10.4418]} coords={[]} />}
          </div>
        </div>
      </div>
    </Page>
  );
}
