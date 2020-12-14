import React from "react";
import cx from "classnames";
import { Tabs, TabPane } from "components/Tab/Tab";
import styles from "./eventsListSection.module.scss";
import TicketsItem from "../TicketsItem/TicketsItem";
import GoogleMap from "../../../components/GoogleMap/GoogleMap";
import SeatingItem from "../SeatingItem/SeatingItem";

const location = {
  lat: 27.2046,
  lng: 77.4977
};

export default function EventsListSection(props) {
  return (
    <div className={cx(styles.root)}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="Tickets" key="1">
          <div className={styles.title}>Orchestra Seats</div>
          <TicketsItem/>
          <TicketsItem/>
          <TicketsItem/>
        </TabPane>
        <TabPane tab="Seating" key="2">
          <SeatingItem />
        </TabPane>
        <TabPane tab="Details" key="3">
          <h1>This is Details tab</h1>
        </TabPane>
        <TabPane tab="Map" key="4">
          <div className={styles.googleMapContainer}>
            <GoogleMap className={styles.googleMap} center={location} coords={[location]} />
          </div>
        </TabPane>
        <TabPane tab="Reviews" key="5">
          <div>
            <h1>This is review tab</h1>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
}
