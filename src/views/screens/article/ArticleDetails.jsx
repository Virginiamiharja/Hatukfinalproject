import React from "react";
import "./Article.css";
import { Link } from "react-router-dom";
import Twitter from "../../../assets/icons/Twitter.png";
import Facebook from "../../../assets/icons/Facebook.png";
import Mail from "../../../assets/icons/Mail.png";

class ArticleDetails extends React.Component {
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
      <div className="d-flex border justify-content-center pb-3">
        {/* Column Article Details */}
        <div className="col-7 flex-column justify-content-center align-items-center p-3">
          {/* Section 1 */}
          <div className="d-flex mb-3">{this.renderArticleCategory()}</div>
          <h1>Skills to Develop Your Child Memory</h1>
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
              pharetra sed ac nisl. Sed dictum nisl vel commodo finibus. Integer
              tristique dolor eros, in convallis erat egestas non. Quisque vitae
              nisl et arcu tristique condimentum. Integer malesuada vulputate
              mi, id ultrices est lobortis vestibulum. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Morbi interdum urna pulvinar condimentum consectetur. Maecenas
              volutpat libero vitae nulla sodales, quis rutrum nisl elementum.
              Sed euismod suscipit quam, ac scelerisque elit ornare eget.
              Praesent sagittis nisl sed diam mattis sollicitudin. Sed eu
              gravida est.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              molestie mi blandit justo rutrum, sit amet venenatis nibh
              imperdiet. Suspendisse potenti. Donec eu sem ut turpis malesuada
              pharetra sed ac nisl. Sed dictum nisl vel commodo finibus. Integer
              tristique dolor eros, in convallis erat egestas non. Quisque vitae
              nisl et arcu tristique condimentum. Integer malesuada vulputate
              mi, id ultrices est lobortis vestibulum. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Morbi interdum urna pulvinar condimentum consectetur. Maecenas
              volutpat libero vitae nulla sodales, quis rutrum nisl elementum.
              Sed euismod suscipit quam, ac scelerisque elit ornare eget.
              Praesent sagittis nisl sed diam mattis sollicitudin. Sed eu
              gravida est.
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
              <img src={Mail} style={{ width: "30px", marginRight: "20px" }} />
            </Link>
          </div>
        </div>

        {/* Column Popular Articles */}
        <div className="border d-flex flex-wrap justify-content-center p-3 col-4">
          <h2>Popular Articles</h2>
        </div>
      </div>
    );
  }
}

export default ArticleDetails;
