import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch, withRouter } from "react-router-dom";
import Cookie from "universal-cookie";
import { connect } from "react-redux";
import { keepLoginHandler, cookieChecker } from "./redux/actions/";
// Components
import Navbar from "./views/components/navbar/Navbar";
import Footer from "./views/components/footer/Footer";
// Screens
import Home from "./views/screens/home/Home";
import Article from "./views/screens/article/Article";
import School from "./views/screens/school/School";
import ArticleDetails from "./views/screens/article/ArticleDetails";
import Authentication from "./views/screens/auth/Authentication";
import Therapist from "./views/screens/therapist/Therapist";
import TherapistDetail from "./views/screens/therapist/TherapistDetail";
import BookingHistory from "./views/screens/userrole/BookingHistory";
import ForgotPassword from "./views/screens/forgotpassword/ForgotPassword";
import ResetPassword from "./views/screens/forgotpassword/ResetPassword";
import UserProfile from "./views/screens/userprofile/UserProfile";
import ManageTherapist from "./views/screens/admin/ManageTherapist";
import ManageTransaction from "./views/screens/admin/ManageTransaction";
import Dashboard from "./views/screens/admin/Dashboard";
import ManageUser from "./views/screens/admin/ManageUser";

const cookieObject = new Cookie();

class App extends React.Component {
  componentDidMount() {
    // Set time out ini gimmick aja untuk tau cara kerja cookie check
    setTimeout(() => {
      let cookieResult = cookieObject.get("authData", { path: "/" });
      if (cookieResult) {
        this.props.keepLoginHandler(cookieResult);
      } else {
        this.props.cookieChecker();
      }
    }, 1000);
  }

  renderRoutes = () => {
    if (this.props.user.role == "admin") {
      return (
        <>
          <Route exact path="/admin/user" component={ManageUser} />
          <Route exact path="/admin/therapist" component={ManageTherapist} />
          <Route
            exact
            path="/admin/transaction"
            component={ManageTransaction}
          />
          <Route exact path="/admin/dashboard" component={Dashboard} />
        </>
      );
    }
  };

  render() {
    if (this.props.user.cookieChecked) {
      return (
        <div>
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/auth" component={Authentication} />
            <Route exact path="/forgotpassword" component={ForgotPassword} />
            <Route
              exact
              path="/resetpassword/:userId"
              component={ResetPassword}
            />
            <Route exact path="/userprofile/:userId" component={UserProfile} />
            <Route exact path="/therapist" component={Therapist} />
            <Route
              exact
              path="/therapistdetail/:therapistId"
              component={TherapistDetail}
            />
            {this.renderRoutes()}
          </Switch>
          <Footer />
        </div>
      );
    }
    // return <h2>Loading...</h2>;
    return null;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = {
  keepLoginHandler,
  cookieChecker,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
