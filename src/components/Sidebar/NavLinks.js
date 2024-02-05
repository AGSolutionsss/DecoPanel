export default {
    category1: [
    ],
    //Super Admin
    category7: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Master",
            menu_icon: "zmdi zmdi-account",
            path: "",
            child_routes: [
                {
                    menu_title: "Categories",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/category",
                    child_routes: null,
                },
                {
                    menu_title: "Sub Categories",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/sub-category",
                    child_routes: null,
                },
                {
                    menu_title: "Brands",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/brand",
                    child_routes: null,
                },
                {
                    menu_title: "Products",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/product",
                    child_routes: null,
                },
                
                
            ],
        },

        {
            menu_title: "Users",
            menu_icon: "zmdi zmdi-accounts",
            path: "",
            child_routes:[
                {
                    menu_title: "Team",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/team",
                    child_routes: null,
                },
                {
                    menu_title: "App Users",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/app-users",
                    child_routes: null,
                },
            ],
            
        },
        {
            menu_title: "Create Order",
            menu_icon: "zmdi zmdi-file",
            path: "/app/pending-orders/add",
            child_routes: null,
        },
        {
            menu_title: "Orders",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Pending Orders",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/pending-orders",
                    child_routes: null,
                },
                {
                    menu_title: "All Orders",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/orders",
                    child_routes: null,
                },
            ],
        },
        
        {
            menu_title: "Quotations",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes: [
                {
                    menu_title: "Quotation Submitted",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/quotation-submitted",
                    child_routes: null,
                },
                {
                    menu_title: "All Quotations",
                    menu_icon: "zmdi zmdi-receipt",
                    path: "/app/quotations",
                    child_routes: null,
                },
                
            ],
        },
        {
            menu_title: "Reports",
            menu_icon: "zmdi zmdi-file",
            path: "",
            child_routes:[
                {
                    menu_title: "Products List",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/product-report",
                    child_routes: null,
                },
                {
                    menu_title: "Orders List",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/order-report",
                    child_routes: null,
                },
                {
                    menu_title: "Quotations List",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/quotation-report",
                    child_routes: null,
                },
            ],
            
        },
        
    ],
    // Admin
    category8: [
        {
            menu_title: "sidebar.dashboards",
            menu_icon: "zmdi zmdi-view-dashboard",
            path: "/app/dashboard",
            child_routes: null,
        },
        {
            menu_title: "Master",
            menu_icon: "zmdi zmdi-account",
            path: "",
            child_routes: [
                {
                    menu_title: "Categorys",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/category",
                    child_routes: null,
                },
                {
                    menu_title: "Sub Categories",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/sub-category",
                    child_routes: null,
                },
                {
                    menu_title: "Brands",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/brand",
                    child_routes: null,
                },
                {
                    menu_title: "Products",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/product",
                    child_routes: null,
                },
                
                
            ],
        },

        {
            menu_title: "Users",
            menu_icon: "zmdi zmdi-receipt",
            path: "",
            child_routes:[
                {
                    menu_title: "Team",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/team",
                    child_routes: null,
                },
                {
                    menu_title: "App Users",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/app-users",
                    child_routes: null,
                },
            ],
            
        },
        {
            menu_title: "Create Order",
            menu_icon: "zmdi zmdi-file",
            path: "/app/pending-orders/add",
            child_routes: null,
        },
        {
            menu_title: "Orders",
            menu_icon: "zmdi zmdi-accounts",
            path: "",
            child_routes: [
                {
                    menu_title: "Pending Orders",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/pending-orders",
                    child_routes: null,
                },
                {
                    menu_title: "All Orders",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/orders",
                    child_routes: null,
                },
            ],
        },
        
        {
            menu_title: "Quotations",
            menu_icon: "zmdi zmdi-accounts",
            path: "",
            child_routes: [
                {
                    menu_title: "Quotation Submitted",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/quotation-submitted",
                    child_routes: null,
                },
                {
                    menu_title: "All Quotations",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/quotations",
                    child_routes: null,
                },
            ],
        },
        {
            menu_title: "Reports",
            menu_icon: "zmdi zmdi-file",
            path: "",
            child_routes:[
                {
                    menu_title: "Products List",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/product-report",
                    child_routes: null,
                },
                {
                    menu_title: "Orders List",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/order-report",
                    child_routes: null,
                },
                {
                    menu_title: "Quotations List",
                    menu_icon: "zmdi zmdi-accounts",
                    path: "/app/quotation-report",
                    child_routes: null,
                },
            ],
            
        },

    ],
    category3: [

    ],
    category4: [

    ],
    category5: [

    ],
    category6: [

    ],
};