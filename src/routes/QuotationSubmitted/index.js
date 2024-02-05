import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import Listing from "./listings";
import Edit from "./editQuotation";
import View from "./viewQuotation";
import {
  AsyncEcommerceDashboardComponent,
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const NewListQuotationSubmitted = ({ match }) => (
  <div className="dashboard-wrapper">
    <Helmet>
      <title>Deco Panel</title>
      <meta name="description" content="Deco Panel" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/listing`} />
      <Route path={`${match.url}/listing`} component={Listing} />
      <Route path={`${match.url}/edit`} component={Edit} />
      <Route path={`${match.url}/view`} component={View} />
    </Switch>
  </div>
);

export default NewListQuotationSubmitted;