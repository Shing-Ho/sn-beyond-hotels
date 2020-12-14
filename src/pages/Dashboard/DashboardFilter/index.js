import React from 'react';

import { ReactComponent as BedIcon } from '../../../icons/bed.svg';

import styles from "./index.module.scss";

const DashboardFilter = ({ searchTypeData, setSearchType }) => {
	return(
		<div className={styles.content}>
			{
				searchTypeData.map((item) => {
					return (
						// <div className={item.value === searchType ? cx(styles.searchType, styles.selectedSearchType) : styles.selectedSearchType} onClick={() => setSearchType(item.value)}>
						<div className={styles.searchType} onClick={() => setSearchType(item.value)}>
							<div className={styles.icon}><BedIcon/></div>
							<div>{item.name}</div>
						</div>
					)
				})
			}
		</div>
	)
};

export default DashboardFilter;
