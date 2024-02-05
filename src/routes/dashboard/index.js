import React, { Component } from "react";
 import { Helmet } from "react-helmet";
 import IntlMessages from 'Util/IntlMessages';
 import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
 import {baseURL} from '../../api';
 import dateyear from '.././dateyear';

 import {
   VisitorAreaChartWidget,
   OrdersAreaChartWidget,
   SalesAreaChartWidget,
   RecentOrdersWidget,
   TopSellingWidget,
 } from "Components/Widgets";

 import axios from "axios";

 export default class NewsDashboard extends Component {
   state = {
     results: [],
   };
   

   componentDidMount() {

    var isLoggedIn = localStorage.getItem("id");
    if(!isLoggedIn){
      browserHistory.push("/logout");
      
    }else{

    
    }
     
     axios({
       url: baseURL+"/web-fetch-dashboard-data-by/"+dateyear,
       method: "GET",
       headers: {
         Authorization: `Bearer ${localStorage.getItem("login")}`,
       },
     })
       .then((res) => {
         this.setState({ results: res.data });
         localStorage.setItem("productsCount",res.data.productsCount);
         localStorage.setItem("ordersCount",res.data.ordersCount);
         localStorage.setItem("usersCount",res.data.usersCount);
       })
       .catch((res) => {
         alert("Something Went Wrong!");
         
       });
   }

  render() {
    
     return (
       <div className="news-dashboard-wrapper">
         <Helmet>
           <title>Deco Panel</title>
           <meta name="description" content="Onzone Dashboard" />
         </Helmet>
         <div className="row">
            <div className="col-sm-6 col-md-4 w-xs-half-block">
              <VisitorAreaChartWidget
                 productCount={this.state.results.productsCount}
              />
            </div>
            <div className="col-sm-12 col-md-4 w-xs-half-block">
						  <OrdersAreaChartWidget
							    clientCount={this.state.results.usersCount}
						/>
					</div>
					<div className="col-sm-6 col-md-4 w-xs-full">
						<SalesAreaChartWidget
							orderCount={this.state.results.ordersCount}
						/>
					</div>
					
				</div>
        <div class="row">
        <RctCollapsibleCard
						colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
						heading={<IntlMessages id="Recent Pending Orders" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<RecentOrdersWidget />
					</RctCollapsibleCard>
          <RctCollapsibleCard
						colClasses="col-sm-12 col-md-4 col-lg-4 w-xs-full"
						heading={<IntlMessages id="Categories" />}
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<TopSellingWidget data={this.state.results.categoryBanner} />
					</RctCollapsibleCard>
        </div>
      </div>
       
     );
   }
 }
 