import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Route, Switch, withRouter } from "react-router-dom";
// Components
import Navbar from "./views/components/navbar/Navbar";
import Footer from "./views/components/footer/Footer";
// Screens
import Home from "./views/screens/home/Home";
import Article from "./views/screens/article/Article";
import School from "./views/screens/school/School";
import ArticleDetails from "./views/screens/article/ArticleDetails";
import Authentication from "./views/screens/auth/Authentication";
import Cookie from "universal-cookie";
import { connect } from "react-redux";
import { keepLoginHandler, cookieChecker } from "./redux/actions/";
import Therapist from "./views/screens/therapist/Therapist";
import TherapistDetail from "./views/screens/therapist/TherapistDetail";

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

  render() {
    // if (this.props.user.cookieChecked) {
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Authentication} />
          <Route exact path="/therapist" component={Therapist} />
          <Route
            exact
            path="/therapistdetail/:id"
            component={TherapistDetail}
          />
          <Route exact path="/article" component={Article} />
          <Route
            exact
            path="/readarticle/:articleId"
            component={ArticleDetails}
          />
          <Route exact path="/school" component={School} />
        </Switch>
        <Footer />
      </div>
    );
    // }
    // return <h2>Loading...</h2>;
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
