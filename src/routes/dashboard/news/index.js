/**
 * News Dashboard
 */

 import React, { Component } from "react";
 import { Helmet } from "react-helmet";
 // intl messages
 import IntlMessages from 'Util/IntlMessages';
 import { Badge } from 'reactstrap';
 import List from '@material-ui/core/List';
 import ListItem from '@material-ui/core/ListItem';
 import IconButton from '@material-ui/core/IconButton';
 
 // rct collapsible card
 import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
 import Card1 from "../cards/card1";
 import Card2 from "../cards/card2";
 import Card3 from "../cards/card3";
 import Card4 from "../cards/card4";

 import NumberFormat from 'react-number-format';
 

 //Widgets
 import {
   //TrendingNews,
   TopHeadlines,
   SupportRequest,
   Visitors,
   Subscribers,
   NewslaterCampaign,
   CommentsWidget,
   SocialFeedsWidget,
   TopAuthors,
   RecentActivity,
   TopNews,
   TwitterFeedsV2,
   Notifications,
 } from "Components/Widgets";
 
 // widgets data
 import { newsVisitorsData, newslaterCampaignData } from "./data";
 import axios from "axios";
 

 export default class NewsDashboard extends Component {
   state = {
     results: [],
   };
   

   componentDidMount() {
     axios({
       url: "https://api.testags.com/api/fetch-dashboard-data",
       method: "GET",
       headers: {
         Authorization: `Bearer ${localStorage.getItem("login")}`,
       },
     })
       .then((res) => {
         this.setState({ results: res.data });
         console.log(res.data);
       })
       .catch((res) => {
         alert("Something Went Wrong!");
       });
   }

  

   
 
   render() {
    
     return (
       <div className="news-dashboard-wrapper">
         <Helmet>
           <title>FTS | Dashboard</title>
           <meta name="description" content="FTS Dashboard" />
         </Helmet>
         <div className="row">
         
         <div className="col-xs-6 col-sm-6 col-md-3 w-xs-half-block">
             {this.state.results.length != 0 && (
               <Card2
                 totalCompaniesCount={this.state.results.total_companies_count}
                 cardTitle="Total Companies Count"
               ></Card2>
             )}
           </div>

           <div className="col-sm-6 col-md-3 w-xs-half-block">
             {this.state.results.length != 0 && (
               <Card1
                 individualCompanyCount={this.state.results.individual_company_count}
                 cardTitle="Individual Company Count"
               ></Card1>
             )}
           </div>
           
           <div className="col-sm-6 col-md-3 w-xs-half-block">
             {this.state.results.length != 0 && (
               <Card3
                 otherCompaniesCount={this.state.results.other_companies_count}
                 cardTitle="Other Companies Count"
               ></Card3>
             )}
           </div>
           <div className="col-sm-6 col-md-3 w-xs-half-block">
                 {this.state.results.length != 0 && (

                <Card4                  

                     totalDonation={this.state.results.total_donation}
                                          
                   >
                     

                   </Card4>
                  )}
               </div>
         </div>

         {/* <TrendingNews /> */}
         <div className="row">
           <RctCollapsibleCard
             heading="Notices"
             colClasses="col-sm-12 col-md-12 col-lg-8"
             collapsible
             
             closeable
             fullBlock
           >
             <TopHeadlines />
           </RctCollapsibleCard>
           
           <div className="col-sm-12 col-md-12 col-lg-4">
             <div className="row">
 
             <div className="col-sm-6 col-md-6 col-lg-12">
                   <RctCollapsibleCard
                     heading="Total Donation Details"
                     collapsible
                     
                     closeable
                     fullBlock
                     customClasses="overflow-hidden" >
                     
                   
                   <div class="collapse show">
                   <div className="support-widget-wrap">
             {/* <div className="text-center py-10">
                <DoughnutChart />
             </div> */}
             <List className="list-unstyled p-0 ">
                <ListItem className=" px-15 py-0 d-flex p-5 justify-content-between align-content-center">
                   <p className="mb-0 content-title"><IntlMessages id="OTS" /></p>
                   <Badge style={{ fontSize: '18px' }} color="primary" className="px-4">
                   <NumberFormat 
                   thousandSeparator={true} 
                   thousandsGroupStyle="lakh"
                   displayType={'text'}
                   prefix={'₹ '} 
                   value={this.state.results.total_ots_donation}
                   
                   />
                     </Badge>
                   <IconButton color="default">
                      <p>{this.state.results.ots_receipts_count} </p>
                   </IconButton>
                </ListItem>
                <ListItem className="px-15 py-0 d-flex p-5 justify-content-between align-content-center">
                   <p className="mb-0 content-title"><IntlMessages id="Membership" /></p>
                   <Badge style={{ fontSize: '18px' }} color="warning" className="px-4">
                   
                   <NumberFormat 
                   thousandSeparator={true} 
                   thousandsGroupStyle="lakh"
                   displayType={'text'}
                   prefix={'₹ '} 
                   value={this.state.results.total_membership_donation}
                   
                   />

                    </Badge>
                   <IconButton color="default">
                      <p>{this.state.results.mem_receipts_count}</p>
                   </IconButton>
                </ListItem>
                <ListItem className=" px-15 py-0 d-flex p-5 justify-content-between align-content-center">
                   <p className="mb-0 content-title"><IntlMessages id="General" /></p>
                   <Badge style={{ fontSize: '18px' }} color="info" className="px-4">
                   <NumberFormat 
                   thousandSeparator={true} 
                   thousandsGroupStyle="lakh"
                   displayType={'text'}
                   prefix={'₹ '} 
                   value={this.state.results.total_general_donation}
                     />
                     </Badge>
                   <IconButton color="default">
                      <p>{this.state.results.gen_receipts_count}</p>
                   </IconButton>
                </ListItem>
             </List>
                   
                </div>
                  
             </div>
             </RctCollapsibleCard>
             </div>
             <div className="col-sm-6 col-md-6 col-lg-12">
                   <RctCollapsibleCard
                     heading="Last 30 Days Donation Details"
                     collapsible
                    
                     closeable
                     fullBlock
                     customClasses="overflow-hidden" >
                     
                   
                   <div class="collapse show">
                   <div className="support-widget-wrap">
             {/* <div className="text-center py-10">
                <DoughnutChart />
             </div> */}
             <List className="list-unstyled p-0 " style={{ fontSize: '20px' }} >
                <ListItem className=" px-15 py-0 d-flex p-5 justify-content-between align-content-center">
                   <p className="mb-0 content-title"><IntlMessages id="OTS" /></p>
                   <Badge color="primary" className="px-4">
                   <NumberFormat 
                   thousandSeparator={true} 
                   thousandsGroupStyle="lakh"
                   displayType={'text'}
                   prefix={'₹ '} 
                   value={this.state.results.thirty_ots}
                     />
                     </Badge>
                   {/* <IconButton color="default">
                      <i className="ti-eye"></i>
                   </IconButton> */}
                </ListItem>
                <ListItem className="px-15 py-0 d-flex p-5 justify-content-between align-content-center">
                   <p className="mb-0 content-title"><IntlMessages id="Membership" /></p>
                   <Badge  color="warning" className="px-4">
                   <NumberFormat 
                   thousandSeparator={true} 
                   thousandsGroupStyle="lakh"
                   displayType={'text'}
                   prefix={'₹ '} 
                   value={this.state.results.thirty_mem}
                     />
                    </Badge>
                   {/* <IconButton color="default">
                      <p>{this.state.results.ots_receipts_count}</p>
                   </IconButton> */}
                </ListItem>
                <ListItem className=" px-15 py-0 d-flex p-5 justify-content-between align-content-center">
                   <p className="mb-0 content-title"><IntlMessages id="General" /></p>
                   <Badge color="info" className="px-4">
                   <NumberFormat 
                   thousandSeparator={true} 
                   thousandsGroupStyle="lakh"
                   displayType={'text'}
                   prefix={'₹ '} 
                   value={this.state.results.thirty_gen}
                     />
                    </Badge>
                   {/* <IconButton color="default">
                      <i className="ti-eye"></i>
                   </IconButton> */}
                </ListItem>
             </List>
                   
                </div>
                  
             </div>
             </RctCollapsibleCard>
             </div>





               
 
               {/* <div className="col-sm-6 col-md-6 col-lg-12">
                 {this.state.results.length != 0 && (
                   <Card5
                     totalMembershipDonation={this.state.results.total_membership_donation}
                   ></Card5>
                 )}
               </div>
               <div className="col-sm-6 col-md-6 col-lg-12">
                 {this.state.results.length != 0 && (
                   <Card6
                     totalOtsDonation={this.state.results.total_ots_donation}
                   ></Card6>
                 )}
               </div> */}
               
 
               
               
               {/* <div className="col-sm-6 col-md-6 col-lg-12">
                 <Card3></Card3>
               </div>
               <div className="col-sm-6 col-md-6 col-lg-12">
                 <Card1></Card1>
               </div>
               <div className="col-sm-6 col-md-6 col-lg-12">
                 <Card2></Card2>
               </div> */}
             </div>
           </div>
         </div>
       </div>
     );
   }
 }
 