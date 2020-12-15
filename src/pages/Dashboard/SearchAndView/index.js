import React from 'react';
import styles from './index.module.scss';
import cx from 'classnames';
import {Input, Dropdown} from "antd";
import { DownOutlined } from '@ant-design/icons';
import {FormattedMessage} from "react-intl";

const SearchAndView = ({ setSearchText, filterMenu, sortMenu, setItemView, itemView }) => {
	return (
		<div className={styles.content}>
			<div className={styles.searchBar}>
				<Input
					placeholder="Search"
					suffix={<span className="fa fa-search" style={{color: '#003398'}} />}
					onChange={(e) => setSearchText(e.target.value)}
			/>
			</div>
			<div className={styles.filterBar}>
				<div className={styles.filter}>
					<Dropdown overlay={filterMenu} trigger={['click']} className={styles.dropdown}>
						<div onClick={e => e.preventDefault()}>
							<div><FormattedMessage id="filter" defaultMessage="Filter" /></div>
							<DownOutlined />
						</div>
					</Dropdown>
				</div>
				<div className={styles.sort}>
					<Dropdown overlay={sortMenu} trigger={['click']} className={styles.dropdown}>
						<div onClick={e => e.preventDefault()}>
							<div><FormattedMessage id="sort" defaultMessage="Sort" /></div>
							<DownOutlined />
						</div>
					</Dropdown>
				</div>
				<div className={styles.layout}>
					<span
						className={ itemView === 'grid' ? cx("fa fa-th-large", styles.icon, styles.selectedIcon) : cx("fa fa-th-large", styles.icon)}
						onClick={() => setItemView('grid')}
					/>
					<span
						className={ itemView === 'list' ? cx("fa fa-bars", styles.icon, styles.selectedIcon) : cx("fa fa-bars", styles.icon)}
						onClick={() => setItemView('list')}
					/>
					<span
						className={ itemView === 'location' ? cx("fa fa-map-marker", styles.icon, styles.selectedIcon) : cx("fa fa-map-marker", styles.icon)}
						onClick={() => setItemView('location')}
					/>
				</div>
			</div>
		</div>
	)
};

export default SearchAndView;
