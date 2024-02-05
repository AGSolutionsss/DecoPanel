/**
 * Today Orders Stats
 */
import React from "react";
import CountUp from "react-countup";

// intl messages
import IntlMessages from "Util/IntlMessages";

// rct card box
import { RctCardContent } from "Components/RctCard";

const TotalOrderStats = (props) => (
  <div className="current-widget bg-success">
    <RctCardContent>
      <div className="d-flex justify-content-between">
        <div className="align-items-start">
          <h3 className="cardHead">Companies/Trusts</h3>
          <h2 className="mb-0">
            <CountUp start={0} end={props.otherCompaniesCount} />
          </h2>
        </div>
        <div className="align-items-end">
          <i className="zmdi zmdi-time"></i>
        </div>
      </div>
    </RctCardContent>
  </div>
);

export default TotalOrderStats;
