import React from 'react';
import styles from './index.module.scss';
import GridView from './GridView/index';

const ContainerView = ({ itemView, items }) => {
	if(items.length === 0) return (<div className={styles.container}>No results found...</div>)
	return(
		<div>
			{ itemView === 'grid' && <GridView items={items} /> }
			{ itemView === 'list' && <GridView items={items} /> }
		</div>
	)
};

export default ContainerView;
