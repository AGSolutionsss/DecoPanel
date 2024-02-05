import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import OrderForm from "./orderForm";
import OrdersReport from './orderReport';
 
const OrderReport = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>Deco Panel</title>
            <meta name="description" content="FTS Donations" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/orderForm`} />
      <Route path={`${match.url}/orderForm`} component={OrderForm} />
      <Route path={`${match.url}/orderReport`} component={OrdersReport} />
    </Switch>
  </div>
);

export default OrderReport;