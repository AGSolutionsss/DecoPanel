import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import QuotationForm from "./quotationForm";
import QuotationsReport from './quotationReport';
 
const QuotationReport = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>Deco Panel</title>
            <meta name="description" content="FTS Donations" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/orderForm`} />
      <Route path={`${match.url}/orderForm`} component={QuotationForm} />
      <Route path={`${match.url}/quotationReport`} component={QuotationsReport} />
    </Switch>
  </div>
);

export default QuotationReport;