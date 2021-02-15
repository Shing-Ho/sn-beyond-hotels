import React from 'react';
import { Tabs, TabPane } from 'components/Tab/Tab';
import styles from './ToursListSection.module.scss';

export default function ToursListSection({ data }) {
  return (
    <div className={styles.root}>
      <Tabs className={styles.tabPane} defaultActiveKey="1">
        <TabPane tab="Details" key="1">
          <div dangerouslySetInnerHTML={{ __html: data?.Introduction }} />
          <h3>Highlights</h3>
          <div dangerouslySetInnerHTML={{ __html: data?.HighLights }} />
          <div className={styles.inline}>
            <span>Language:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.ActiveLang }} />
          </div>
          <div className={styles.inline}>
            <span>Inclusions:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.Inclusion }} />
          </div>
          <div className={styles.inline}>
            <span>Exclusions:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.Exclusion }} />
          </div>
          <div className={styles.inline}>
            <span>Pickup location:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.PickupLocation }} />
          </div>
          <div className={styles.inline}>
            <span>Drop off location:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.DropoffLocation }} />
          </div>
        </TabPane>
        <TabPane tab="ITINERARY" key="2">
          <div dangerouslySetInnerHTML={{ __html: data?.Itinerary }} />
          <h3>Additional information</h3>
          <div className={styles.inline}>
            <span>Dress standard:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.DressStandard }} />
          </div>
          <div className={styles.inline}>
            <span>Your Trip:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.YourTrip }} />
          </div>
          <div className={styles.inline}>
            <span>Confirmation of booking:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.Confirmation }} />
          </div>
          <div className={styles.inline}>
            <span>Child Policy:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.ChildPolicy }} />
          </div>
          <div className={styles.inline}>
            <span>Drop off location:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.DropoffLocation }} />
          </div>
          <h3>Local contact</h3>
          <div className={styles.inline}>
            <span>Office phone number:</span>
            <div dangerouslySetInnerHTML={{ __html: data?.ContactPhone }} />
          </div>
        </TabPane>
        <TabPane tab="CULTURE SHOCK" key="3">
          <h3>Culture shock rating</h3>
          <p>
            Worried we’re going to shock your senses? Relax! We believe part of the fun of travel is immersing yourself
            in the destination and its culture, meeting the people, and learning what makes the place tick. We’ve got a
            wide range of tours with something for everybody. The cultural shock rating ranks how different the
            experience is from most Western cultures. But no matter the level, don’t worry, you’ll have a local,
            in-the-know guide with you every step of the way.
          </p>
          <h3>Low</h3>
          <p>
            Consider these tours your 101 intro to a place. Transportation might be private or a very comfortable public
            option, and the activities are usually visits to iconic sites and locations that are familiar to most
            Western cultures – but that will still give you fantastic insight into a destination.
          </p>
          <h3>Medium</h3>
          <p>
            Expect to rough it for parts of this tour, whether that’s on a packed public bus or in a local market off
            the tourist trail. There might be a few language barriers or unfamiliar cultural customs, and you’ll get an
            experience different from what you’re used to at home.
          </p>
          <h3>High</h3>
          <p>
            You’re out there in the global community! We’re going to take you down streets you’d rarely explore on your
            own, introduce you to local customs and languages, and take you for a ride in whatever transport is
            available. Get ready to take it as it comes, whatever comes. There might be a shock, but oh man, it’s worth
            it.
          </p>
        </TabPane>
        <TabPane tab="PHYSICALITY" key="4">
          <h3>Physical rating</h3>
          <p>
            Worried our tours are too tough? Relax! From leisurely strolls to muscle-burning treks, we’ve got a wide
            range of tours with something for everybody. The physical grading gives you an idea of how much huffing and
            puffing you can expect on the tour.
          </p>
          <h3>Low</h3>
          <p>
            Slow and steady is all you need here. These tours have very limited physical activity, such as walking
            relatively flat streets, sites, or markets, and climbing in and out of the transport provided.
          </p>
          <h3>Medium</h3>
          <p>
            Not too hard, not too soft, these tours are just right! You can expect a bit of physical activity, but
            nothing overly challenging – perhaps walking up and down hills, riding a bike for up to 30 kilometers along
            mostly flat terrain, or jumping in a kayak for a gentle paddle on flat water.
          </p>
          <h3>High</h3>
          <p>
            Get ready for a workout! These tours are our most challenging and involve intense walking, hiking, kayaking,
            swimming, or bike riding. You could be making steep climbs by foot or pedal, or working your core in the
            water. We recommend you have a good level of fitness to join this tour.
          </p>
        </TabPane>
      </Tabs>
    </div>
  );
}
