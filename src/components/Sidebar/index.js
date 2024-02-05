/**
 * Reactify Sidebar
 */
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';

// redux actions
import { collapsedSidebarAction } from 'Actions';

// components
import UserBlock from './UserBlock';
import SidebarContent from './SidebarContent';
import AgencySidebar from '../AgencyMenu/AgencySidebar';

class Sidebar extends Component {

	UNSAFE_componentWillMount() {
		this.updateDimensions();
	}

	shouldComponentUpdate(nextProps) {
		const { enableSidebarBackgroundImage, selectedSidebarImage, isDarkSidenav, locale } = this.props;
		if (enableSidebarBackgroundImage !== nextProps.enableSidebarBackgroundImage || selectedSidebarImage !== nextProps.selectedSidebarImage || isDarkSidenav !== nextProps.isDarkSidenav || locale) {
			return true
		} else {
			return false
		}
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { windowWidth } = this.state;
		if (nextProps.location !== this.props.location) {
			if (windowWidth <= 1199) {
				this.props.collapsedSidebarAction(false);
			}
		}
	}

	updateDimensions = () => {
		this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
	}

	render() {
		const { enableSidebarBackgroundImage, selectedSidebarImage, isDarkSidenav, agencySidebar } = this.props;
		return (
			<Fragment>
				<div
					className={classNames('rct-sidebar', { 'background-none': !enableSidebarBackgroundImage })}
					style={{ backgroundImage: enableSidebarBackgroundImage ? `url(${selectedSidebarImage})` : 'none' }}
				>
					<div className={classNames("rct-sidebar-content", { "sidebar-overlay-light": isDarkSidenav, 'sidebar-overlay-dark': !isDarkSidenav })}>
						
						<div className="rct-sidebar-wrap">
							<Scrollbars
								className="rct-scroll"
								autoHide
								autoHideDuration={100}
								style={{ height: 'calc(100vh - 60px)' }}
							>
								<UserBlock />
								{!agencySidebar ?
									<SidebarContent />
									:
									<AgencySidebar />
								}
							</Scrollbars>
							
						</div>
						
						<div className="site-logo">
							
							<Link to="/app/dashboard/news" className="logo-mini">
								{/* <img src={require('Assets/receipt/fts1.png')} className="mr-15" alt="site logo" width="80" height="35" /> */}
								<p style={{color:"white",fontSize:"12px",fontWeight:"700"}}>Updated On : Oct 17th, 2023</p>
							</Link>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {
	const { enableSidebarBackgroundImage, selectedSidebarImage, collapsedSidebar, isDarkSidenav, locale } = settings;
	return { enableSidebarBackgroundImage, selectedSidebarImage, collapsedSidebar, isDarkSidenav, locale };
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction,
})(Sidebar));
