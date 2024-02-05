import Widgets from "Routes/widgets";
import AdvanceUIComponents from "Routes/advance-ui-components";
import ChartsComponents from "Routes/charts";
import Components from "Routes/components";
import Icons from "Routes/icons";
import Dashboard from "Routes/dashboard";
import Crm from "Routes/crm";
import Maintenance from "../container/Maintenance";
import NewListCategory from "../routes/Category/index";
import NewListSubCategory from "../routes/SubCategory/index";
import NewListProduct from "../routes/Product/index";
import NewListUsers from "../routes/users/index";
import UserProfile from "../routes/userProfile/index";
import NewListOrder from "../routes/Order/index";
import NewListBrand from "../routes/Brands/index";
import NewListUsersApp from "../routes/usersApp/index";
import NewListPendingOrder from "../routes/OrderPending/index";
import NewListQuotation from "../routes/Quotation/index";
import NewListQuotationSubmitted from "../routes/QuotationSubmitted/index";
import ProductListReport from "../routes/Reports/Product/index";
import OrderReport from "../routes/Reports/Order/index";
import QuotationReport from "../routes/Reports/Quotation/index";

import {
    AsyncAboutUsComponent,


} from "Components/AsyncComponent/AsyncComponent";

export default [{
        path: "dashboard",
        component: Dashboard,
    },
    {
        path: "crm",
        component: Crm,
    },
    {
        path: "widgets",
        component: Widgets,
    },
    {
        path: "icons",
        component: Icons,
    },
    {
        path: "about-us",
        component: AsyncAboutUsComponent,
    },
    {
        path: "charts",
        component: ChartsComponents,
    },
    {
        path: "ui-components",
        component: Components,
    },
    {
        path: "advanced-component",
        component: AdvanceUIComponents,
    },
    {
        path: "maintenance",
        component: Maintenance,
    },
    {
        path: "category",
        component: NewListCategory,
    },
    {
        path: "sub-category",
        component: NewListSubCategory,
    },
    {
        path: "product",
        component: NewListProduct,
    },
    {
        path: "team",
        component: NewListUsers,
    },
    {
        path: "users-profile",
        component: UserProfile,
    },
    {
        path: "orders",
        component: NewListOrder,
    },
    {
        path: "brand",
        component: NewListBrand,
    },{
        path: "app-users",
        component: NewListUsersApp,
    },
    {
        path: "pending-orders",
        component: NewListPendingOrder,
    },
    {
        path: "quotations",
        component: NewListQuotation,
    },
    {
        path: "quotation-submitted",
        component: NewListQuotationSubmitted,
    },
    {
        path: "product-report",
        component: ProductListReport,
    },
    {
        path: "order-report",
        component: OrderReport,
    },
    {
        path: "quotation-report",
        component: QuotationReport,
    }
];