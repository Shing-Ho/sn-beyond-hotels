import React from 'react';
import styles from './index.module.scss';
import {Input, Dropdown} from "antd";
import { DownOutlined } from '@ant-design/icons';

const SearchAndView = ({ setSearchText, filterMenu, sortMenu, setItemView }) => {
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
							<div>Filter</div>
							<DownOutlined />
						</div>
					</Dropdown>
				</div>
				<div className={styles.sort}>
					<Dropdown overlay={sortMenu} trigger={['click']} className={styles.dropdown}>
						<div onClick={e => e.preventDefault()}>
							<div>Sort</div>
							<DownOutlined />
						</div>
					</Dropdown>
				</div>
				<div className={styles.layout}>
					<span className="fa fa-th-large" onClick={() => setItemView('grid')}/>
					<span className="fa fa-bars" onClick={() => setItemView('list')}/>
				</div>
			</div>
		</div>
	)
};

export default SearchAndView;
