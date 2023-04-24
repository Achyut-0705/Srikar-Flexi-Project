import React,{useState} from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footer/Footer.js";
import { Button, Container } from "reactstrap";
import {Input} from "reactstrap";

export default function ContactUs() {
  React.useEffect(() => {
    document.body.classList.toggle("index-page");
    // Specify how to clean up after this effect:
    return function cleanup() {
      document.body.classList.toggle("index-page");
    };
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };



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
                    <h2 className="title">Contact Us</h2>  
                    <div className="row">
                        <div className="col-md-6">
                            <h3>Get in touch</h3>
                            <p>Feel free to contact us for any queries or suggestions.</p>
                            <p>Our team will get back to you as soon as possible.</p>
                            <p>Thank you for your interest in our project.</p>
                            <p>Have a great day!</p>
                        </div>
                        <div className="col-md-6">
                            <h3>Send us a message</h3>
                            <form>
                                <p>Name</p>
                                <Input placeholder="Name" onChange={(e)=>(handleNameChange(e))} type="text" /><br/>
                                <p>Message</p>
                                <Input placeholder="Message" type="textarea"  onChange={(e)=>(handleMessageChange(e))} />
                                <br />
                                <Button className="btn-round" color="primary" type="button" onClick={() => window.location = `mailto:20h51a6699@cmrcet.ac.in?subject=${name|| ""}&body=${message || ""}`}>
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
        <Footer />
      </div>
      
    </>
  );
}
