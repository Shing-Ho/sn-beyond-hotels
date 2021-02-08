import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import adventureActions from 'store/adventure/actions';
import { getTripInfo, getTripAvailabilities, getStandardCountries } from 'store/adventure/selectors';
import { ReactComponent as ToursActivitiesWhite } from 'icons/dashboardIcons/ToursActivitiesWhite.svg';

import Page from 'components/Page/Page';
import Carousel from 'components/Carousel/Carousel';
import ToursListSection from './components/ToursListSection/ToursListSection';
import ToursBookingSection from './components/ToursBookingSection/ToursBookingSection';
import DetailHeader from './components/DetailHeader/DetailHeader';
import styles from './ToursDetailPage.module.scss';

const ToursDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getTripInfo);
  const availabilities = useSelector(getTripAvailabilities);
  const [images, setImages] = useState([]);
  const standardCountries = useSelector(getStandardCountries);

  useEffect(() => {
    if (standardCountries.length === 0) {
      dispatch(adventureActions.getStandardCountries());
    }
    dispatch(adventureActions.getTripInfo({ trip_code: params.id }));
    dispatch(adventureActions.getTripAvailabilities({ trip_code: params.id }));
  }, []);

  useEffect(() => {
    if (data) {
      if (data.Photo) {
        setImages(
          data.Photo.map((p, i) => ({
            url: p.Url,
            type: '',
            display_order: i,
          })),
        );
      }
    }
  }, [data]);

  useEffect(() => {
    console.log(availabilities);
  }, [availabilities]);

  return (
    <Page>
      <div className={styles.carousel}>
        <Carousel image={images} />
        <DetailHeader
          className={styles.detailHeader}
          details={{ name: data.TripName }}
          icon={<ToursActivitiesWhite width="26px" height="29px" />}
        />
      </div>
      <div className={styles.root}>
        <div className={styles.content}>
          <Row justify="center">
            <Col md={16} sm={24} flex={1}>
              <Row>
                <DetailHeader
                  className={styles.detailHeader}
                  details={{
                    name: data.TripName,
                    tags: data.Style.split(','),
                    duration: data.Duration,
                    startTime: data.Departure?.DepMin,
                    cultureShock: data.CulturalRate,
                    physicality: data.PhysicalRate,
                    type: 'tours',
                  }}
                  icon={<ToursActivitiesWhite width="26px" height="29px" />}
                />
              </Row>
              <Row>
                <ToursListSection className={styles.left} data={data} />
              </Row>
            </Col>
            <Col md={8} sm={24} flex={1}>
              <div className={styles.detail}>
                {availabilities && <ToursBookingSection tourInfo={data} />}
                {!availabilities && <h3 className={styles.noAvailable}>Not available</h3>}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Page>
  );
};

export default ToursDetailPage;
