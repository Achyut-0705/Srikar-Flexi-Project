import React, { useState } from "react";

import Footer from "components/Footer/Footer.js";
import { Button, Container, Row } from "reactstrap";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

export default function TeamCard(props) {
  return (
    <>
      <Row>
        <div className="col-md-6" style={{ fontSize: 20 , paddingTop:'10px',paddingBottom:'10px'}}>
          <p>{props.name}</p>
          <p>{props.roll}</p>
          <p>III year, CSE-AI&ML</p>
          <p>CMRCET</p>
          <p style={{ fontSize: 30 }}>
            {" "}
            <a
              href={props.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i>
                <FaLinkedin />
              </i>
            </a>{" "}
            <a
              href={props.insta}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i>
                <FaInstagram />
              </i>
            </a>{" "}
            <a
              href={props.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i>
                <FaGithub />
              </i>
            </a>
          </p>
        </div>
        <div className="col-md-6" style={{ fontSize: 20 }}>
          <img
            alt="..."
            className="img-raised"
            src={props.imgURL}
            style={{ width: 200, height: 200 , marginTop:'10px',marginBottom:'10px'}}
          />
        </div>
      </Row>
    </>
  );
}
