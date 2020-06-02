import React from "react";
import "./School.css";
import Category from "../../components/category/Category";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faMap } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import SchoolCard from "../../components/schoolcard/SchoolCard";

class School extends React.Component {
  state = {
    categoryId: 0,
    arrCategory: ["All", "Autism", "ADHD", "Dyslexia", "Learning Disabilities"],
  };

  optCategory = () => {
    this.setState({ categoryId: 1 });
  };

  renderCategory = () => {
    return this.state.arrCategory.map((value) => {
      return (
        <>
          <Link onClick={this.optCategory}>
            <Category category={value} />
          </Link>
        </>
      );
    });
  };

  renderSchoolData = () => {
    return this.state.arrCategory.map((value) => {
      return (
        <>
          <SchoolCard />
        </>
      );
    });
  };

  render() {
    return (
      <div className="d-flex border flex-column justify-content-center align-items-center pb-3">
        <h2>
          <span style={{ color: "#7209b7" }}>List of </span>
          <span style={{ color: "#f77f00" }}>School</span>
        </h2>
        <p className="col-8 text-center mt-2" style={{ opacity: "80%" }}>
          We always want the best of the best for our kids, and education is the
          number one thing we must take seriously. From picking the best
          schools.
        </p>
        {this.state.categoryId ? (
          <div className="d-flex mt-3">
            <InputGroup className="mr-4" style={{ width: "500px" }}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText
                  style={{ background: "#f77f00", border: "white" }}
                >
                  <FontAwesomeIcon icon={faSearch} style={{ color: "white" }} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                placeholder="Find the best school!"
                style={{ background: "#f2f2f2", border: "white" }}
              />
            </InputGroup>
            <InputGroup style={{ width: "200px" }}>
              <InputGroupAddon addonType="prepend">
                <InputGroupText
                  style={{ background: "#f77f00", border: "white" }}
                >
                  <FontAwesomeIcon icon={faMap} style={{ color: "white" }} />
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                style={{ background: "#f2f2f2", border: "white" }}
              >
                <option>All..</option>
                <option>North Jakarta</option>
                <option>South Jakarta</option>
                <option>West Jakarta</option>
                <option>East Jakarta</option>
                <option>Central Jakarta</option>
              </Input>
            </InputGroup>
          </div>
        ) : null}
        <div className="d-flex flex-wrap justify-content-center m-2">
          {this.state.categoryId
            ? this.renderSchoolData()
            : this.renderCategory()}
        </div>
      </div>
    );
  }
}

export default School;
