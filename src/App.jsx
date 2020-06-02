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

class App extends React.Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/article" component={Article} />
          <Route
            exact
            path="/readarticle/:articleId"
            component={ArticleDetails}
          />
          <Route exact path="/school" component={School} />
          <Route exact path="/auth" component={Authentication} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
