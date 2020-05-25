import React from "react";
import "./Article.css";
import ArticleCard from "../../components/articlecard/ArticleCard";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

class Article extends React.Component {
  state = {
    arrArticle: ["All", "Autism", "ADHD", "Dyslexia", "Learning Disabilities"],
  };

  renderArticle = () => {
    return this.state.arrArticle.map((value) => {
      return (
        <>
          <Link
            to="/readarticle/1"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ArticleCard />
          </Link>
        </>
      );
    });
  };

  renderArticleCategory = () => {
    return this.state.arrArticle.map((value) => {
      return (
        <>
          <Link style={{ textDecoration: "none" }} className="article-category">
            {value}
          </Link>
        </>
      );
    });
  };

  render() {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center pb-3">
        <h2>
          <span style={{ color: "#7209b7" }}>List of </span>
          <span style={{ color: "#f77f00" }}>Article</span>
        </h2>
        <p className="col-8 text-center mt-2" style={{ opacity: "80%" }}>
          We thought we would share with all of you our articles that written by
          our experienced therapists. We hope you find them helpful and,
          perhaps, even worthy of keeping at the forefront of your mind.
        </p>

        <InputGroup className="d-flex mt-3" style={{ width: "65%" }}>
          <InputGroupAddon addonType="prepend">
            <InputGroupText style={{ background: "#f77f00", border: "white" }}>
              <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
            </InputGroupText>
          </InputGroupAddon>
          <Input
            placeholder="Find the best article!"
            style={{ background: "#f2f2f2", border: "white" }}
          />
        </InputGroup>

        <div className="d-flex col-8 justify-content-around mt-3">
          {this.renderArticleCategory()}
        </div>

        <div className="d-flex flex-wrap justify-content-center">
          {this.renderArticle()}
        </div>
      </div>
    );
  }
}

export default Article;

// Notes untuk list article
// 1. Mungkin bisa ditambahin popular articles

// Notes untuk article details
// 1. Mungkin bisa ditambahin udh seen by berapa orang nanti makanya bisa jadi popular articles
