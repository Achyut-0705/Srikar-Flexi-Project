import React,{useState} from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import PageHeader from "components/PageHeader/PageHeader.js";
import Footer from "components/Footer/Footer.js";
import { Button, Container } from "reactstrap";
import {Input} from "reactstrap";
import { FaLinkedin,FaInstagram,FaGithub } from "react-icons/fa";
import TeamCard from "components/TeamCard/TeamCard";

//photos import

import harsha from "assets/img/harsha.jpeg";
import mercy from "assets/img/mercy.jpeg";

export default function Team() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);


  return (
    <>
      <IndexNavbar />
      <div className="wrapper">
      <div className="squares square1" />
      <div className="squares square2" />
      <div className="squares square3" />
      <div className="squares square4" />
      <div className="squares square5" />
      <div className="squares square6" />
      <div className="squares square7" />
        <div className="main" style={{  display: 'block',paddingTop:'70px' ,marginLeft: 'auto',  marginRight: 'auto',  width: '80%', minHeight:'90vh'}}>
            
            <div className="section section-basic">
                <Container>

                    <h1>Our Team</h1>
                    <TeamCard name="Harshavardhan Bammidi" roll="20H51A6699" linkedin="https://www.linkedin.com/in/harshavardhan-bammidi-9b1b1b1b1/" insta="https://www.instagram.com/harshaz8/" github="https://github.com/harshavb08" imgURL={harsha}/>
                    <TeamCard name="Mercy Sunada Duggirala" roll="20H51A6653" linkedin="https://www.linkedin.com/in/mercy-sunada-a24022254" insta="https://www.instagram.com/_.mercy_789/" github="" imgURL={mercy}/>
                    <TeamCard name="Byagari Gowthami" roll="20H51A6607" linkedin="" insta="" github="" />
                </Container>
            </div>
        </div>
        <Footer />
      </div>
      
    </>
  );
}
