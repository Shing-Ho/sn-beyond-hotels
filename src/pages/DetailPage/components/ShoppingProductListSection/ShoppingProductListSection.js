import React from 'react';
import cx from 'classnames';
import { Tabs, TabPane } from 'components/Tab/Tab';
import { ReactComponent as GlobalStarIcon } from 'icons/Icon_Global_Star.svg';
import { ReactComponent as GlobalLocationIcon } from 'icons/Icon_Global_Location.svg';
import styles from './ShoppingProductListSection.module.scss';

export default function ShoppingProductListSection({ className }) {
  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="DETAIL" key="1">
          <div className={cx(styles.rootDiv, className)}>
            <div className={styles.content}>
              <div className={styles.contentheader}>
                <div className={styles.leftcontent}>
                  <span className={styles.headertitle}>Highlights</span>
                </div>
                <div className={styles.rightcontent}>
                  <span className={styles.icon}>
                    <div className={styles.starIconImg}>
                      <GlobalStarIcon />
                    </div>
                  </span>
                </div>
              </div>
              <span className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida vehicula velit, quis sagittis dui.
                Ut ac dictum justo. Vestibulum consequat neque mattis turpis efficitur, et tempor arcu feugiat. Morbi
                quam tortor, dapibus et turpis malesuada, ultrices suscipit nibh.
              </span>
              <br />
              <span className={styles.description}>
                Aliquam vitae velit consectetur, maximus quam ac, sollicitudin nulla. Proin pellentesque tincidunt erat
                ut pharetra. Praesent at augue elit. Sed condimentum eget nisi sit amet pellentesque. Donec hendrerit
                consectetur sem at euismod. Duis convallis velit metus, a rutrum arcu bibendum.
              </span>
            </div>
          </div>
          <br />
          <div className={cx(styles.rootDiv, className)}>
            <div className={styles.content}>
              <div className={styles.contentheader}>
                <div className={styles.leftcontent}>
                  <span className={styles.headertitle}>Description</span>
                </div>
                <div className={styles.rightcontent}>
                  <span className={styles.icon}>
                    <div className={styles.starIconImg}>
                      <GlobalLocationIcon />
                    </div>
                  </span>
                </div>
              </div>
              <span className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida vehicula velit, quis sagittis dui.
                Ut ac dictum justo. Vestibulum consequat neque mattis turpis efficitur, et tempor arcu feugiat.
                Morbiquam tortor, dapibus et turpis malesuada, ultrices suscipit nibh.
              </span>
              <br />
              <span className={styles.description}>
                Aliquam vitae velit consectetur, maximus quam ac, sollicitudin nulla. Proin pellentesque tincidunt erat
                ut pharetra. Praesent at augue elit. Sed condimentum eget nisi sit amet pellentesque. Donec hendrerit
                consectetur sem at euismod. Duis convallis velit metus, a rutrum arcu bibendum.
              </span>
              <br />
              <span className={styles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam gravida vehicula velit, quis sagittis
                dui.Ut ac dictum justo. Vestibulum consequat neque mattis turpis efficitur, et tempor arcu feugiat.
                Morbiquam tortor, dapibus et turpis malesuada, ultrices suscipit nibh.
              </span>
              <br />
              <span className={styles.description}>
                Aliquam vitae velit consectetur, maximus quam ac, sollicitudin nulla. Proin pellentesque tincidunt erat
                ut pharetra. Present at augue elit. Sed condimentum eget nisi sit amet pellentesque. Donechendrerit
                consectetur sem at euismod. Duis convallis velit metus, a rutrum arcu bibendum.
              </span>
            </div>
          </div>
        </TabPane>
        <TabPane tab="REVIEWS" key="2">
          <h1>This is Reviews tab</h1>
        </TabPane>
        <TabPane tab="FAQ" key="3">
          <h1>This is FAQ tab</h1>
        </TabPane>
      </Tabs>
    </div>
  );
}
