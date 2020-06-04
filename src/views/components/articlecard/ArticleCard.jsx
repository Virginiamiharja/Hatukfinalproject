import React from "react";
import "./ArticleCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

class ArticleCard extends React.Component {
  renderArticleContent = () => {
    let content =
      "On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. And if she hasn’t been rewritten, then they are still using her.";
    let arrContent = content.split(" ");
    let newContent = "";
    if (arrContent.length > 40) {
      newContent = arrContent.slice(0, 43).join(" ") + "..";
    } else {
      newContent = arrContent.join(" ");
    }
    return newContent;
  };

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
    return (
      <div className="m-3 shadow bg-white rounded">
        <Card style={{ width: "350px", border: "white" }}>
          <CardImg
            top
            width="100%"
            src="https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/2018-05/shutterstock_141101980_master.jpg"
            alt="Article Image"
          />
          <CardBody>
            <CardTitle className="article-title">
              Skills to Develop Your Child Memory
            </CardTitle>
            <CardSubtitle className="mt-1">
              {this.renderArticleCategory()}
            </CardSubtitle>
            <CardText className="mt-2 text-justify" style={{ height: "150px" }}>
              {this.renderArticleContent()}
            </CardText>
            <div className="d-flex mt-2" style={{ opacity: "90%" }}>
              <div className="col-6 align-items-center d-flex">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="mr-2"
                  style={{ fontSize: "13px" }}
                />
                <p style={{ fontSize: "13px" }}>20/05/2020</p>
              </div>
              <div className="col-6 align-items-center d-flex">
                <FontAwesomeIcon
                  icon={faUser}
                  className="mr-2"
                  style={{ fontSize: "13px" }}
                />
                <p style={{ fontSize: "13px" }}>Virginia Miharja</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default ArticleCard;
