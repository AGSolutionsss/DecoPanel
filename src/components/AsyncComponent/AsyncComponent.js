/**
 * AsyncComponent
 * Code Splitting Component / Server Side Rendering
 */
import React from "react";
import Loadable from "react-loadable";

// rct page loader
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";



// agency dashboard
const AsyncSaasDashboardComponent = Loadable({
  loader: () => import("Routes/dashboard/saas"),
  loading: () => <RctPageLoader />,
});

// agency dashboard
const AsyncAgencyDashboardComponent = Loadable({
  loader: () => import("Routes/dashboard/agency"),
  loading: () => <RctPageLoader />,
});

// boxed dashboard
const AsyncNewsDashboardComponent = Loadable({
  loader: () => import("Routes/dashboard/news"),
  loading: () => <RctPageLoader />,
});

const AsyncUserWidgetComponent = Loadable({
  loader: () => import("Routes/widgets/user-widgets"),
  loading: () => <RctPageLoader />,
});

const AsyncUserChartsComponent = Loadable({
  loader: () => import("Routes/widgets/charts-widgets"),
  loading: () => <RctPageLoader />,
});

const AsyncGeneralWidgetsComponent = Loadable({
  loader: () => import("Routes/widgets/general-widgets"),
  loading: () => <RctPageLoader />,
});

const AsyncPromoWidgetsComponent = Loadable({
  loader: () => import("Routes/widgets/promo-widgets"),
  loading: () => <RctPageLoader />,
});

// about us
const AsyncAboutUsComponent = Loadable({
  loader: () => import("Routes/about-us"),
  loading: () => <RctPageLoader />,
});















// themify icons
const AsyncThemifyIconsComponent = Loadable({
  loader: () => import("Routes/icons/themify-icons"),
  loading: () => <RctPageLoader />,
});

// Simple Line Icons
const AsyncSimpleLineIconsComponent = Loadable({
  loader: () => import("Routes/icons/simple-line-icons"),
  loading: () => <RctPageLoader />,
});

// Material Icons
const AsyncMaterialIconsComponent = Loadable({
  loader: () => import("Routes/icons/material-icons"),
  loading: () => <RctPageLoader />,
});





/*--------------- Charts ----------------*/

// Re charts
const AsyncRechartsComponent = Loadable({
  loader: () => import("Routes/charts/recharts"),
  loading: () => <RctPageLoader />,
});

// ReactChartsjs2
const AsyncReactChartsjs2Component = Loadable({
  loader: () => import("Routes/charts/react-chartjs2"),
  loading: () => <RctPageLoader />,
});



/*---------------- Session ------------------*/

// Session Login
const AsyncSessionLoginComponent = Loadable({
  loader: () => import("Routes/session/login"),
  loading: () => <RctPageLoader />,
});

// Session Register
const AsyncSessionRegisterComponent = Loadable({
  loader: () => import("Routes/session/register"),
  loading: () => <RctPageLoader />,
});

// Session Lock Screen
const AsyncSessionLockScreenComponent = Loadable({
  loader: () => import("Routes/session/lock-screen"),
  loading: () => <RctPageLoader />,
});

// Session Forgot Password
const AsyncSessionForgotPasswordComponent = Loadable({
  loader: () => import("Routes/session/forgot-password"),
  loading: () => <RctPageLoader />,
});

// Session Page 404
const AsyncSessionPage404Component = Loadable({
  loader: () => import("Routes/session/404"),
  loading: () => <RctPageLoader />,
});

// Session Page 404
const AsyncSessionPage500Component = Loadable({
  loader: () => import("Routes/session/500"),
  loading: () => <RctPageLoader />,
});







/*------------------ UI Components ---------------*/

// components Alerts
const AsyncUIAlertsComponent = Loadable({
  loader: () => import("Routes/components/alert"),
  loading: () => <RctPageLoader />,
});

// components Appbar
const AsyncUIAppbarComponent = Loadable({
  loader: () => import("Routes/components/app-bar"),
  loading: () => <RctPageLoader />,
});

// components BottomNavigation
const AsyncUIBottomNavigationComponent = Loadable({
  loader: () => import("Routes/components/bottom-navigation"),
  loading: () => <RctPageLoader />,
});

// components BottomNavigation
const AsyncUIAvatarsComponent = Loadable({
  loader: () => import("Routes/components/avatar"),
  loading: () => <RctPageLoader />,
});

// components Buttons
const AsyncUIButtonsComponent = Loadable({
  loader: () => import("Routes/components/buttons"),
  loading: () => <RctPageLoader />,
});

// components Badges
const AsyncUIBadgesComponent = Loadable({
  loader: () => import("Routes/components/badges"),
  loading: () => <RctPageLoader />,
});

// components CardMasonary
const AsyncUICardMasonaryComponent = Loadable({
  loader: () => import("Routes/components/card-masonry"),
  loading: () => <RctPageLoader />,
});

// components Cards
const AsyncUICardsComponent = Loadable({
  loader: () => import("Routes/components/cards"),
  loading: () => <RctPageLoader />,
});

// components Chips
const AsyncUIChipsComponent = Loadable({
  loader: () => import("Routes/components/chip"),
  loading: () => <RctPageLoader />,
});

// components Dialog
const AsyncUIDialogComponent = Loadable({
  loader: () => import("Routes/components/dialog"),
  loading: () => <RctPageLoader />,
});

// components Dividers
const AsyncUIDividersComponent = Loadable({
  loader: () => import("Routes/components/dividers"),
  loading: () => <RctPageLoader />,
});

// components Drawers
const AsyncUIDrawersComponent = Loadable({
  loader: () => import("Routes/components/drawers"),
  loading: () => <RctPageLoader />,
});

// components ExpansionPanel
const AsyncUIExpansionPanelComponent = Loadable({
  loader: () => import("Routes/components/expansion-panel"),
  loading: () => <RctPageLoader />,
});

// components Grid List
const AsyncUIGridListComponent = Loadable({
  loader: () => import("Routes/components/grid-list"),
  loading: () => <RctPageLoader />,
});

// components List
const AsyncUIListComponent = Loadable({
  loader: () => import("Routes/components/list"),
  loading: () => <RctPageLoader />,
});

// components Menu
const AsyncUIMenuComponent = Loadable({
  loader: () => import("Routes/components/menu"),
  loading: () => <RctPageLoader />,
});

// components Popover
const AsyncUIPopoverComponent = Loadable({
  loader: () => import("Routes/components/popover"),
  loading: () => <RctPageLoader />,
});

// components Progress
const AsyncUIProgressComponent = Loadable({
  loader: () => import("Routes/components/progress"),
  loading: () => <RctPageLoader />,
});

// components Snackbar
const AsyncUISnackbarComponent = Loadable({
  loader: () => import("Routes/components/snackbar"),
  loading: () => <RctPageLoader />,
});

// components SelectionControls
const AsyncUISelectionControlsComponent = Loadable({
  loader: () => import("Routes/components/selection-controls"),
  loading: () => <RctPageLoader />,
});

/*---------------- Advance UI Components -------------*/

// advance components DateAndTimePicker
const AsyncAdvanceUIDateAndTimePickerComponent = Loadable({
  loader: () => import("Routes/advance-ui-components/dateTime-picker"),
  loading: () => <RctPageLoader />,
});

// advance components Tabs
const AsyncAdvanceUITabsComponent = Loadable({
  loader: () => import("Routes/advance-ui-components/tabs"),
  loading: () => <RctPageLoader />,
});

// advance components Stepper
const AsyncAdvanceUIStepperComponent = Loadable({
  loader: () => import("Routes/advance-ui-components/stepper"),
  loading: () => <RctPageLoader />,
});

// advance components NotificationComponent
const AsyncAdvanceUINotificationComponent = Loadable({
  loader: () => import("Routes/advance-ui-components/notification"),
  loading: () => <RctPageLoader />,
});

// advance components SweetAlert
const AsyncAdvanceUISweetAlertComponent = Loadable({
  loader: () => import("Routes/advance-ui-components/sweet-alert"),
  loading: () => <RctPageLoader />,
});

// advance components autoComplete
const AsyncAdvanceUIAutoCompleteComponent = Loadable({
  loader: () => import("Routes/advance-ui-components/autoComplete"),
  loading: () => <RctPageLoader />,
});

// crm dashboard
const AsyncCrmComponent = Loadable({
  loader: () => import("Routes/crm/dashboard"),
  loading: () => <RctPageLoader />,
});
// projects
const AsyncProjectsComponent = Loadable({
  loader: () => import("Routes/crm/projects"),
  loading: () => <RctPageLoader />,
});
// project detail
const AsyncProjectDetailComponent = Loadable({
  loader: () => import("Routes/crm/project-detail"),
  loading: () => <RctPageLoader />,
});
// clients
const AsyncClientsComponent = Loadable({
  loader: () => import("Routes/crm/clients"),
  loading: () => <RctPageLoader />,
});
// reports
const AsyncReportsComponent = Loadable({
  loader: () => import("Routes/crm/reports"),
  loading: () => <RctPageLoader />,
});


export {
  AsyncUserWidgetComponent,
  AsyncUserChartsComponent,
  AsyncGeneralWidgetsComponent,
  AsyncPromoWidgetsComponent,
  AsyncAboutUsComponent,
  AsyncThemifyIconsComponent,
  AsyncSimpleLineIconsComponent,
  AsyncMaterialIconsComponent,
 
  AsyncRechartsComponent,
  AsyncReactChartsjs2Component,
  
  AsyncSessionLoginComponent,
  AsyncSessionRegisterComponent,
  AsyncSessionLockScreenComponent,
  AsyncSessionForgotPasswordComponent,
  AsyncSessionPage404Component,
  AsyncSessionPage500Component,
 
 
  
  AsyncUIAlertsComponent,
  AsyncUIAppbarComponent,
  AsyncUIBottomNavigationComponent,
  AsyncUIAvatarsComponent,
  AsyncUIButtonsComponent,
  AsyncUIBadgesComponent,
  AsyncUICardMasonaryComponent,
  AsyncUICardsComponent,
  AsyncUIChipsComponent,
  AsyncUIDialogComponent,
  AsyncUIDividersComponent,
  AsyncUIDrawersComponent,
  AsyncUIExpansionPanelComponent,
  AsyncUIGridListComponent,
  AsyncUIListComponent,
  AsyncUIMenuComponent,
  AsyncUIPopoverComponent,
  AsyncUIProgressComponent,
  AsyncUISnackbarComponent,
  AsyncUISelectionControlsComponent,
  AsyncAdvanceUIDateAndTimePickerComponent,
  AsyncAdvanceUITabsComponent,
  AsyncAdvanceUIStepperComponent,
  AsyncAdvanceUINotificationComponent,
  AsyncAdvanceUISweetAlertComponent,
  AsyncAdvanceUIAutoCompleteComponent,
  
  
  AsyncSaasDashboardComponent,
  AsyncAgencyDashboardComponent,
  AsyncNewsDashboardComponent,
  AsyncCrmComponent,
  AsyncProjectsComponent,
  AsyncProjectDetailComponent,
  AsyncClientsComponent,
  AsyncReportsComponent,
};
