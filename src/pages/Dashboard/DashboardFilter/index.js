import React from 'react';
import cx from "classnames";

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
							className={cx(styles.searchType, { [styles.selectedSearchType]: item.value === searchType })}
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
