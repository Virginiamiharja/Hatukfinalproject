import React from "react";
import "./Category.css";
import { Card, CardImg, CardImgOverlay, CardText } from "reactstrap";

class Category extends React.Component {
  render() {
    return (
      <div className="m-3 shadow bg-white rounded">
        <Card
          style={{
            width: "250px",
            border: "white",
            borderRadius: "3px"
          }}
        >
          {/* Layer 1 */}
          <CardImg
            className="card-background"
            src="https://media.edutopia.org/styles/responsive_2880px_16x9/s3/masters/2018-05/shutterstock_141101980_master.jpg"
            style={{ borderRadius: "3px" }}
          />
          {/* Layer 2 untuk bikin dia fade to black */}
          <CardImgOverlay
            style={{
              backgroundColor: "black",
              // Inget karen pake firefox opacity gabisa yang 50% jadi harus 0.5
              opacity: "0.5",
              borderRadius: "3px"
            }}
          />
          {/* Layer 3 untuk tulisan */}
          <CardText
            className="d-flex card-img-overlay justify-content-center align-items-center"
            style={{ color: "white" }}
          >
            <h3 className="text-center">{this.props.category}</h3>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default Category;
