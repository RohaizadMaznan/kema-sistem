import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./auth/Auth";
import "./css/style.scss";
import AOS from "aos";
import { focusHandling } from "cruip-js-toolkit";
import { ToastProvider } from "react-toast-notifications";

// All pages
import Home from "./pages/Home";
import ResetPassword from "./pages/Reset";
import ManageUsers from "./pages/admin/ManageUsers";
import AdminProfile from "./pages/admin/Profile";
import AddUser from "./pages/admin/AddUser";
import UpdateUser from "./pages/admin/UpdateUser";
import ManageNotifications from "./pages/admin/ManageNotifications";
import UpdateNotification from "./pages/admin/UpdateNotification";
import AddNotification from "./pages/admin/AddNotification";

import ManageCoupon from "./pages/bendahari/index";
import BendahariProfile from "./pages/bendahari/Profile";
import AddCoupon from "./pages/bendahari/AddCoupon";
import UpdateCoupon from "./pages/bendahari/UpdateCoupon";
import UpdateTransaction from "./pages/bendahari/UpdateTransaction";
import ManageTransactions from "./pages/bendahari/ManageTransactions";
import TestTable from "./pages/bendahari/TestTable";
import DownloadTransaction from "./pages/bendahari/DownloadTransaction";

// All layouts
import GuestLayout from "./components/layout/guest/layout";
import AdminLayout from "./components/layout/admin/layout";
import BendahariLayout from "./components/layout/bendahari/layout";
import ManageReports from "./pages/admin/ManageReports";
import AddReport from "./pages/admin/AddReport";
import UpdateReports from "./pages/admin/UpdateReports";

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout>
        <Component {...props}></Component>
      </Layout>
    )}
  ></Route>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
    focusHandling("outline");
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <ToastProvider>
        <AuthProvider>
          <Switch>
            <AppRoute exact path="/" layout={GuestLayout} component={Home} />
            <AppRoute exact path="/reset-password" layout={GuestLayout} component={ResetPassword} />
            <AppRoute exact path="/admin/manage-users" layout={AdminLayout} component={ManageUsers} />
            <AppRoute exact path="/admin/manage-users/new" layout={AdminLayout} component={AddUser} />
            <AppRoute exact path="/admin/manage-users/user/:id" layout={AdminLayout} component={UpdateUser} />
            <AppRoute exact path="/admin/profile" layout={AdminLayout} component={AdminProfile} />
            <AppRoute exact path="/admin/manage-notifications" layout={AdminLayout} component={ManageNotifications} />
            <AppRoute exact path="/admin/manage-notifications/update/:id" layout={AdminLayout} component={UpdateNotification} />
            <AppRoute exact path="/admin/manage-notifications/new" layout={AdminLayout} component={AddNotification} />
            <AppRoute exact path="/admin/manage-reports" layout={AdminLayout} component={ManageReports} />
            <AppRoute exact path="/admin/manage-reports/new" layout={AdminLayout} component={AddReport} />
            <AppRoute exact path="/admin/manage-reports/update/:id" layout={AdminLayout} component={UpdateReports} />

            <AppRoute exact path="/bendahari/coupon" layout={BendahariLayout} component={ManageCoupon} />
            <AppRoute exact path="/bendahari/profile" layout={BendahariLayout} component={BendahariProfile} />
            <AppRoute exact path="/bendahari/coupon/new" layout={BendahariLayout} component={AddCoupon} />
            <AppRoute exact path="/bendahari/coupon/update/:id" layout={BendahariLayout} component={UpdateCoupon} />
            <AppRoute exact path="/bendahari/transaction" layout={BendahariLayout} component={ManageTransactions} />
            <AppRoute exact path="/bendahari/transaction/update/:id" layout={BendahariLayout} component={UpdateTransaction} />
            <AppRoute exact path="/bendahari/transaction/download/:id" layout={GuestLayout} component={DownloadTransaction} />
            <AppRoute exact path="/bendahari/test" layout={BendahariLayout} component={TestTable} />
          </Switch>
        </AuthProvider>
      </ToastProvider>
    </>
  );
}

export default App;
