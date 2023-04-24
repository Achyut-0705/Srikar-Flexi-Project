import React from "react";
import axios from "axios";

// reactstrap components
import { Container } from "reactstrap";
import { Button, Row, Col } from "reactstrap";

export default function PageHeader() {
  const startBackend = (e) => {
    let formData = new FormData();
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    }
    axios
      .post("http://localhost:8000/analysePage", formData)
      .then((res) => {
        //console.log(res.data);
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  return (
    <div className="page-header header-filter">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
      <Container>
        <div className="content-center brand">
          <Row className="row justify-content-between align-items-center text ">
            <Col lg="8" md="8">
              <h1 className="h1-seo" style={{ whiteSpace: "nowrap" }}>
                Ml-yze
              </h1>

              <h4 className="d-md-block d-sm-block">
                A web-app for analyzing the performance of different Machine
                learning classifiers
              </h4>
            </Col>
            <Col lg="4" md="5">
              <img
                alt="..."
                className="img-fluid align-items-center"
                src={require("assets/img/analytics.png")}
              />
            </Col>
          </Row>
          <Button
            className="btn-round"
            color="neutral"
            href="analyse"
            onClick={(e) => startBackend(e)}
            style={{ marginTop: 30 }}
          >
            <i className="tim-icons icon-spaceship" /> Get started
          </Button>
        </div>
      </Container>
    </div>
  );
}
