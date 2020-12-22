import React from 'react';
import GoogleMap from 'components/GoogleMap/GoogleMap';
import GridView from './GridView';
import ListView from './ListView';
import styles from './index.module.scss';

const ContainerView = ({ itemView, items, total, currency, onPageChange, onItemClick }) => {
  if (items.length === 0) return <div className={styles.container}>No results found...</div>;
  return (
    <div>
      {itemView === 'grid' && (
        <GridView
          items={items}
          onPageChange={onPageChange}
          total={total}
          currency={currency}
          onItemClick={onItemClick}
        />
      )}
      {itemView === 'list' && (
        <ListView items={items} onPageChange={onPageChange} currency={currency} onItemClick={onItemClick} />
      )}
      {itemView === 'location' && <GoogleMap height={600} center={[24.2028, 10.4418]} coords={[]} />}
    </div>
  );
};

export default ContainerView;
