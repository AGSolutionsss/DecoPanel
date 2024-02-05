/**
 * Notification Advance UI Components
 */
import React from 'react';
import Button from '@material-ui/core/Button';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import {
	//TrendingNews,
	TopHeadlines,
	Visitors,
	Subscribers,
	NewslaterCampaign,
	CommentsWidget,
	SocialFeedsWidget,
	TopAuthors,
	RecentActivity,
	TopNews,
	TwitterFeedsV2,
	Notifications
} from "Components/Widgets";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

export default class Notification extends React.Component {
   createNotification = (type) => {
      return () => {
         switch (type) {
            case 'info':
               NotificationManager.info('Info message');
               break;
            case 'success':
               NotificationManager.success('Success message', 'Title here');
               break;
            case 'warning':
               NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
               break;
            case 'error':
               NotificationManager.error('Error message', 'Click me!', 5000, () => {
                  alert('callback');
               });
               break;
            default:
               NotificationManager.success('Success message', 'Title here');
               break;
         }
      };
   };

   render() {
      return (
         <div className="notification-wrapper">
            <PageTitleBar title={<IntlMessages id="sidebar.notification" />} match={this.props.match} />
            <RctCollapsibleCard
						heading="Notices"
						// colClasses="col-sm-12 col-md-12 col-lg-8"
						collapsible
						reloadable
						closeable
						fullBlock
					>
						<TopHeadlines />
					</RctCollapsibleCard>
            <NotificationContainer />
         </div>
      );
   }
}
