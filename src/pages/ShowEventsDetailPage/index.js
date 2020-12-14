import React from "react"
import { Row, Col} from "antd";
import Page from "components/Page/Page";
import Carousel from "components/Carousel/Carousel";
import EventsListSection from "./EventsListSection/eventsListSection";
import EventBookingSection from "./EventBookingSection/EventBookingSection";

import styles from "./EventsDetailPage.module.scss";
import DetailHeader from "./DetailHeader/DetailHeader";

const images =
  [ {url: "//media.iceportal.com/34323/photos/60150742_XL.jpg", type: "", display_order: 0},
    {url: "//media.iceportal.com/34323/photos/60150744_XL.jpg", type: "", display_order: 1},
    {url: "//media.iceportal.com/34323/photos/60150756_XL.jpg", type: "", display_order: 2},
    {url: "//media.iceportal.com/34323/photos/60150758_XL.jpg", type: "", display_order: 3},
    {url: "//media.iceportal.com/34323/photos/60150750_XL.jpg", type: "", display_order: 4},
    {url: "//media.iceportal.com/34323/photos/60150752_XL.jpg", type: "", display_order: 5}];

const ShowEventsDetailPage = () => {
  return (
    <Page>
      <Carousel image={images} />
      <div className={styles.root}>
        <div className={styles.content}>
          <Row justify="center" >
            <Col md={16}>
              <Row>
                <DetailHeader
                  className={styles.detailHeader}
                  details={{name: 'Hamilton - The Musical'}}
                />
              </Row>
              <Row>
                <EventsListSection
                  className={styles.left}
                />
              </Row>

            </Col>
            <Col md={8}>
              <div className={styles.detail}>
                <EventBookingSection />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Page>
  )
};

export default ShowEventsDetailPage;
