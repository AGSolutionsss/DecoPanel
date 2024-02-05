import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Helmet } from "react-helmet";
import Profile from './Profile';
import Address from './Address';
import UserBlock from './UserBlock';
import { RctCard } from 'Components/RctCard';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import IntlMessages from 'Util/IntlMessages';
function TabContainer(props) {
   return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
         {props.children}
      </Typography>
   );
}

export default class UserProfile extends Component {

   state = {
      activeTab: this.props.location.state ? this.props.location.state.activeTab : 0
   }

   handleChange = (event, value) => {
      this.setState({ activeTab: value });
   }

   render() {
      const { activeTab } = this.state;
      return (
         <div className="userProfile-wrapper">
            <Helmet>
               <title>User Profile</title>
               <meta name="description" content="User Profile" />
            </Helmet>
            <PageTitleBar title={<IntlMessages id="sidebar.userProfile" />} match={this.props.match} />
            <RctCard>
            <UserBlock />
               <div className="rct-tabs">
                  <AppBar position="static">
                     <Tabs
                        value={activeTab}
                        onChange={this.handleChange}
                        variant="scrollable"
                        scrollButtons="off"
                        indicatorColor="primary"
                     >
                        <Tab
                           icon={<i className="ti-user"></i>}
                           label={<IntlMessages id="components.myProfile" />}
                        />
                        <Tab
                           icon={<i className="ti-key"></i>}
                           label={<IntlMessages id="Change Password" />}
                        />
                     </Tabs>
                  </AppBar>
                  {activeTab === 0 &&
                     <TabContainer>
                        <Profile />
                     </TabContainer>}
                  {activeTab === 1 &&
                     <TabContainer>
                     <Address />
                  </TabContainer>}
               </div>
            </RctCard>
         </div>
      );
   }
}
