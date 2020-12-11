import React from "react";
import _ from 'lodash'

import FormWithHeader from "components/FormWithHeader/FormWithHeader";
import SummaryDetailForm from "../SummaryDetailForm/SummaryDetailForm";
// import { ReactComponent as BedIcon } from "icons/bed3.svg";
// import { ReactComponent as PlusIcon } from "icons/plusBlue.svg";
// import { ReactComponent as CarIcon } from "icons/pin.svg";
// import { ReactComponent as InfoIcon } from 'icons/info.svg';
// import styles from './SummaryLeft.module.scss';

// const vendor = [
//   {
//     headerTitle: "Masa of Echo Park",
//     Icon: BedIcon,
//     id: "23234653465",
//     startDate: 1599220069211,
//     endDate: 1599223069211,
//     additional: [
//       {
//         title: "Car Protection",
//         price: 5.23,
//         OtherIcon: PlusIcon,
//       },
//       {
//         title: "Extra Driver",
//         price: 39.43,
//         OtherIcon: PlusIcon,
//       },
//       {
//         title: "P85D",
//         price: 162.23,
//         OtherIcon: CarIcon,
//       },
//     ],
//   },
// ];

export default function SummaryLeft({ detail, penalty, ...props }) {
  return (
    <div>
      <FormWithHeader
        left="Hotels"
      >
        <SummaryDetailForm
          startDate={_.get(detail, 'start_date')}
          endDate={_.get(detail, 'end_date')}
          penalty={penalty}
          {...detail}
          {...props}
          index={0}
        />
      </FormWithHeader>
      {/* <FormWithHeader left="Needs Vendor Summary" right={`${vendor.length} Item${vendor.length > 1 ? 's' : ''} Pending`}>
        {
          vendor.map((each, index) => (
            <SummaryDetailForm {...each} index={index} />
          ))
        }
        <div className={styles.infoContainer}>
          <InfoIcon />
          <span>Then Vendor(s) will provide Summary shortly. you will not be charged until a Summary is received.</span>
        </div>
      </FormWithHeader> */}
    </div>
  );
}
