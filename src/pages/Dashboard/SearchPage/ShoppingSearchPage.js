import React from 'react';
import Page from 'components/Page/Page';
// import ShoppingView from 'pages/ShoppingPage/components/ShoppingView';
import ShoppingList from 'pages/ShoppingPage/components/ShoppingList';
// import GoogleMap from 'components/GoogleMap/GoogleMap';
import styles from './ShoppingSearchPage.module.scss';

export default function ShoppingSearch({ onItemClick }) {
  // const [itemView] = useState('list');
  // const [itemView] = useState('list');
  return (
    <Page noHeader noFooter>
      <div className={styles.root}>
        <div className={styles.content}>
          <ShoppingList items="list" onItemClick={onItemClick} />
        </div>
      </div>
    </Page>
  );
}
