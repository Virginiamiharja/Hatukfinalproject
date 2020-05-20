import React from "react";
import "./Article.css";
import ArticleCard from "../../components/articlecard/ArticleCard";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Twitter from "../../../assets/icons/Twitter.png";
import Facebook from "../../../assets/icons/Facebook.png";
import Mail from "../../../assets/icons/Mail.png";

class Article extends React.Component {
  state = {
    articleId: 0,
    arrArticle: ["All", "Autism", "ADHD", "Dyslexia", "Learning Disabilities"],
  };

  openArticle = () => {
    this.setState({ articleId: 1 });
  };

  renderArticle = () => {
    return this.state.arrArticle.map((value) => {
      return (
        <>
          {/* Untuk sementara, nanti kliknya harus bisa di button aja */}
          <Link
            onClick={this.openArticle}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ArticleCard />
          </Link>
        </>
      );
    });
  };

  renderArticleCategoryNavbar = () => {
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

  // Ini buat yang di article details
  renderArticleCategory = () => {
    return (
      <>
        <span
          class="badge badge-pill badge-info mr-2"
          style={{ background: "#db3a34" }}
        >
          Autism
        </span>
        <span
          class="badge badge-pill badge-info mr-2"
          style={{ background: "#db3a34" }}
        >
          ADHD
        </span>
        <span
          class="badge badge-pill badge-info mr-2"
          style={{ background: "#db3a34" }}
        >
          Dyslexia
        </span>
      </>
    );
  };

  render() {
    if (this.state.articleId) {
      return (
        <div className="d-flex justify-content-center">
          {/* Column Article Details */}
          <div className="col-7 flex-column justify-content-center align-items-center p-3">
            {/* Section 1 */}
            <div className="d-flex mb-3">{this.renderArticleCategory()}</div>
            <h1 onClick={this.renderArticleContent}>
              Skills to Develop Your Child Memory
            </h1>
            {/* Section 2 */}
            <div className="d-flex flex-column mb-3" style={{ opacity: "70%" }}>
              <p>Written by: Virginia Miharja</p>
              <p>Published On: 16/5/2020</p>
            </div>
            {/* Section 3 */}
            <img
              src="https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/2018-05/shutterstock_141101980_master.jpg"
              alt=""
              style={{ width: "100%" }}
            />
            {/* Section 4 */}
            <div className="text-justify mt-3">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                molestie mi blandit justo rutrum, sit amet venenatis nibh
                imperdiet. Suspendisse potenti. Donec eu sem ut turpis malesuada
                pharetra sed ac nisl. Sed dictum nisl vel commodo finibus.
                Integer tristique dolor eros, in convallis erat egestas non.
                Quisque vitae nisl et arcu tristique condimentum. Integer
                malesuada vulputate mi, id ultrices est lobortis vestibulum.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Morbi interdum urna pulvinar condimentum
                consectetur. Maecenas volutpat libero vitae nulla sodales, quis
                rutrum nisl elementum. Sed euismod suscipit quam, ac scelerisque
                elit ornare eget. Praesent sagittis nisl sed diam mattis
                sollicitudin. Sed eu gravida est.
              </p>
              <br />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                molestie mi blandit justo rutrum, sit amet venenatis nibh
                imperdiet. Suspendisse potenti. Donec eu sem ut turpis malesuada
                pharetra sed ac nisl. Sed dictum nisl vel commodo finibus.
                Integer tristique dolor eros, in convallis erat egestas non.
                Quisque vitae nisl et arcu tristique condimentum. Integer
                malesuada vulputate mi, id ultrices est lobortis vestibulum.
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae; Morbi interdum urna pulvinar condimentum
                consectetur. Maecenas volutpat libero vitae nulla sodales, quis
                rutrum nisl elementum. Sed euismod suscipit quam, ac scelerisque
                elit ornare eget. Praesent sagittis nisl sed diam mattis
                sollicitudin. Sed eu gravida est.
              </p>
              <br />
            </div>
            <div className="d-flex justify-content-start">
              <Link>
                <img
                  src={Twitter}
                  style={{ width: "30px", marginRight: "20px" }}
                />
              </Link>
              <Link>
                <img
                  src={Facebook}
                  style={{ width: "30px", marginRight: "20px" }}
                />
              </Link>
              <Link>
                <img
                  src={Mail}
                  style={{ width: "30px", marginRight: "20px" }}
                />
              </Link>
            </div>
          </div>

          {/* Column */}
          <div className="border d-flex flex-wrap justify-content-center col-4 "></div>
        </div>
      );
    } else {
      return (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h2>
            <span style={{ color: "#7209b7" }}>List of </span>
            <span style={{ color: "#f77f00" }}>Article</span>
          </h2>
          <p className="col-8 text-center mt-2" style={{ opacity: "80%" }}>
            We thought we would share with all of you our articles that written
            by our experienced therapists. We hope you find them helpful and,
            perhaps, even worthy of keeping at the forefront of your mind.
          </p>

          <InputGroup className="d-flex mt-3" style={{ width: "65%" }}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText
                style={{ background: "#f77f00", border: "white" }}
              >
                <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
              </InputGroupText>
            </InputGroupAddon>
            <Input
              placeholder="Find the best article!"
              style={{ background: "#f2f2f2", border: "white" }}
            />
          </InputGroup>

          <div className="d-flex col-8 justify-content-around mt-3">
            {this.renderArticleCategoryNavbar()}
          </div>

          <div className="d-flex flex-wrap justify-content-center">
            {this.renderArticle()}
          </div>
        </div>
      );
    }
  }
}

export default Article;

// Notes untuk list article
// 1. Mungkin bisa ditambahin popular articles

// Notes untuk article details
// 1. Mungkin bisa ditambahin udh seen by berapa orang nanti makanya bisa jadi popular articles
