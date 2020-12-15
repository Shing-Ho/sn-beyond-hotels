import React, { useState, useEffect } from 'react';
import moment from "moment";
import _ from 'lodash';

import styles from "../SearchPage/SearchPage.module.scss";
import TopFilters from "../../components/TopFilters/TopFilters";
import Page from "../../components/Page/Page";
import DashboardFilter from "./DashboardFilter";
import SearchAndView from "./SearchAndView";
import ContainerView from "./ContainerView";
import {Menu} from 'antd';
import SearchPage from "../SearchPage/SearchPage";

const menu = (click) =>
	<Menu onClick={click}>
		 {/*Add menu item for filter here*/}
	</Menu>


const sortMenu = (click) => (
	<Menu onClick={click}>
		<Menu.Item key={'asc'}>
			Ascending
		</Menu.Item>
		<Menu.Item key={'desc'}>
			Descending
		</Menu.Item>
	</Menu>
);

const initialFilterData = {
	location: {
		location_id: "5128581",
		location_name: "New York City",
		iso_country_code: "USA",
	},
	start_date: moment().add(1, "day").format("YYYY-MM-DD"),
	end_date: moment().add(2, "day").format("YYYY-MM-DD"),
};

const HotelsData = [
	{
		name: "Taix Restaurent",
		start: 3,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "19.99"
	},
	{
		name: "Masa of Echo Park",
		start: 5,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "25"
	},
	{
		name: "Thrill FAll Bungee",
		start: 2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "15.25"
	},
	{
		name: "Cats Musical",
		start: 5,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "25"
	},
	{
		name: "ALTA NightClub",
		start: 4,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "30"
	},
	{
		name: "Tesla car rental",
		start: 5,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "40"
	},
	{
		name: "Taix Restaurent",
		start: 3,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "19.99"
	},
	{
		name: "Masa of Echo Park",
		start: 5,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "25"
	},
	{
		name: "Thrill FAll Bungee",
		start: 2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "15.25"
	},
	{
		name: "Cats Musical",
		start: 5,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "25"
	},
	{
		name: "ALTA NightClub",
		start: 4,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "30"
	},
	{
		name: "Tesla car rental",
		start: 5,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec orci enim, luctus vel nisl Bibendum.",
		from: "40"
	},
];

const searchTypeData = [
	{
		id: 1,
		name: 'Show All',
		value: 'show-all'
	},
	{
		id: 2,
		name: 'Hotels',
		value: 'hotels'
	},
	{
		id: 3,
		name: 'Transportation',
		value: 'transportation'
	},
	{
		id: 4,
		name: 'Tours & Activities',
		value: 'tours-activities'
	},
	{
		id: 5,
		name: 'Shows & Events',
		value: 'shows-events'
	},
	{
		id: 6,
		name: 'Dining',
		value: 'dining'
	},
	{
		id: 7,
		name: 'NightLife',
		value: 'nightLife'
	}
];

const initialState = {
	location: {
		location_id: "5128581",
		location_name: "New York City",
		iso_country_code: "USA",
	},
	start_date: moment().add(1, "day").format("YYYY-MM-DD"),
	end_date: moment().add(2, "day").format("YYYY-MM-DD"),
	occupancy: {
		adults: 2,
		children: 0,
	},
	nights: 1,
	language: "en",
	currency: "USD",
};

const DashboardPage = () => {
	const [filter, setFilter] = useState(initialFilterData);
	const [searchType, setSearchType] = useState('show-all');
	const [searchText, setSearchText] = useState('');
	const [filterBy, setFilterBy] = useState('');
	const [sortBy, setSortBy] = useState('');
	const [itemView, setItemView] = useState('grid');
	const [items, setItems] = useState(HotelsData);

	useEffect(() => {}, [searchType])

	useEffect(() => {
		setItems(HotelsData.filter(item => item.name.toLowerCase().includes(searchText)))
	}, [searchText])

	useEffect(() => {}, [filterBy])

	useEffect(() => {
		setItems(_.orderBy(items, 'name', sortBy))
	}, [sortBy])

	const handleFilterBy = (e) => {
		setFilterBy(e.key)
	};

	const handleSortBy = (e) => {
		setSortBy(e.key)
	};

	const onPageChange = (page, size) => (current, size) => {
		console.log("page-----");
	};

	return (
		<Page>
			<div className={styles.root}>
				<div className={styles.container}>
					<TopFilters filter={filter} setFilter={setFilter} initialState={initialState} displayCount={searchType === 'hotels'} />
					<DashboardFilter
						searchType={searchType}
						setSearchType={setSearchType}
						searchTypeData={searchTypeData}
					/>
					<SearchAndView
						searchText={searchText}
						filterBy={filterBy}
						sortby={sortBy}
						itemView={itemView}
						setSearchText={setSearchText}
						filterMenu={menu(handleFilterBy)}
						sortMenu={sortMenu(handleSortBy)}
						setItemView={setItemView}
					/>
					{
						searchType === 'hotels' ?
							<SearchPage noHeader noFooter display={!searchType === 'hotels'}/> :
							<ContainerView
								filterBy={filterBy}
								itemView={itemView}
								searchText={searchText}
								searchType={searchType}
								filter={filter}
								items={items}
								onPageChange={onPageChange}
							/>
					}
				</div>
			</div>
		</Page>
	)
};

export default DashboardPage;
