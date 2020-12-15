import React from 'react';

import { ReactComponent as BedIcon } from '../../../icons/bed.svg';
import { ReactComponent as WhiteBedIcon } from '../../../icons/bed3.svg';

import styles from "./index.module.scss";

const DashboardFilter = ({ searchTypeData, setSearchType, searchType }) => {
	return(
		<div className={styles.content}>
			{
				searchTypeData.map((item) => {
					return (
						<div
							className={item.value === searchType ? (styles.selectedSearchType) : styles.searchType}
							onClick={() => setSearchType(item.value)}
						>
							<div className={styles.icon}>
								{
									item.value === searchType ?
										<WhiteBedIcon/>
										: <BedIcon/>
								}
							</div>
							<div>{item.name}</div>
						</div>
					)
				})
			}
		</div>
	)
};

export default DashboardFilter;
