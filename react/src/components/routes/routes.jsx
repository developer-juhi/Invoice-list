import ErrorPage from "../pages/view/ErrorPage";
import Dashboard from "../pages/Dashboard";
import Invoice from "../pages/view/invoice/Index";

const routes = [
    {
        path: "/invoice",
        exact: true,
        component: <Invoice title="Invoice List" />
    },
    {
        path: "/",
        exact: true,
        component: <Dashboard title="Dashboard" />
    },
    {
        path: "*",
        exact: true,
        component: <ErrorPage title="Error 404" />
    },

]

export default routes;