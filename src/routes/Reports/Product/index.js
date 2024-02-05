import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import ProductReport from './productReport';
import {
   AsyncEcommerceDashboardComponent,
   AsyncSaasDashboardComponent,
   AsyncAgencyDashboardComponent,
   AsyncNewsDashboardComponent,
} from "Components/AsyncComponent/AsyncComponent";

const ProductListReport = ({ match }) => (
  <div className="dashboard-wrapper">
   <Helmet>
            <title>Onzone</title>
            <meta name="description" content="Onzone" />
        </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/productReport`} />
      <Route path={`${match.url}/productReport`} component={ProductReport} />
    </Switch>
  </div>
);

export default ProductListReport;