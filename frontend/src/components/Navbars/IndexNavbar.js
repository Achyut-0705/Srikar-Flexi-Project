import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
// import { DiGithubBadge } from 'react-icons/di';
import {
  RiTeamLine,
  RiMessage2Fill,
  RiGithubFill,
  RiLineChartLine,
  RiLogoutBoxLine,
  RiLoginBoxLine,
} from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";

export default function IndexNavbar() {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [collapseOpen, setCollapseOpen] = React.useState(false);
  const [collapseOut, setCollapseOut] = React.useState("");
  const [color, setColor] = React.useState("navbar-transparent");
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [loginStatus]);
  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };
  }, []);
  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      setColor("bg-info");
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      setColor("navbar-transparent");
    }
  };
  const toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    setCollapseOpen(!collapseOpen);
  };
  const onCollapseExiting = () => {
    setCollapseOut("collapsing-out");
  };
  const onCollapseExited = () => {
    setCollapseOut("");
  };
  return (
    <Navbar className={"fixed-top " + color} color-on-scroll="100" expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand to="/" tag={Link} id="navbar-brand">
            <span>Ml-yze</span>
          </NavbarBrand>
          <UncontrolledTooltip placement="bottom" target="navbar-brand">
            A web-app for analyzing the performance of different Machine
            learning classifiers
          </UncontrolledTooltip>
          <button
            aria-expanded={collapseOpen}
            className="navbar-toggler navbar-toggler"
            onClick={toggleCollapse}
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>
        </div>
        <Collapse
          className={"justify-content-end " + collapseOut}
          navbar
          isOpen={collapseOpen}
          onExiting={onCollapseExiting}
          onExited={onCollapseExited}
        >
          <div className="navbar-collapse-header">
            <Row>
              <Col className="collapse-brand" xs="6">
                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                  Menu
                </a>
              </Col>
              <Col className="collapse-close text-right" xs="6">
                <button
                  aria-expanded={collapseOpen}
                  className="navbar-toggler"
                  onClick={toggleCollapse}
                >
                  <i className="tim-icons icon-simple-remove" />
                </button>
              </Col>
            </Row>
          </div>

          <Nav navbar>
            {loginStatus && (
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="analyse"
                  rel="noopener noreferrer"
                  title="Analyse"
                >
                  <i>
                    <RiLineChartLine />
                  </i>
                  <p className="d-lg-block d-md-block d-xl-block">Analyse</p>
                </NavLink>
              </NavItem>
            )}

            {loginStatus && (
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="notes"
                  rel="noopener noreferrer"
                  title="Notes"
                >
                  <i className="tim-icons icon-notes"></i>
                  <p className="d-lg-block d-md-block d-xl-block">Notes</p>
                </NavLink>
              </NavItem>
            )}

            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="team"
                rel="noopener noreferrer"
                title="Our Team"
              >
                <i>
                  <RiTeamLine />
                </i>
                <p className="d-lg-block d-md-block d-xl-block">Our Team</p>
              </NavLink>
            </NavItem>
            <NavItem className="p-0">
              <NavLink
                data-placement="bottom"
                href="contactUs"
                rel="noopener noreferrer"
                title="Contact Us"
              >
                <i>
                  <RiMessage2Fill />
                </i>
                <p className="d-lg-block d-md-block d-xl-block">Contact Us</p>
              </NavLink>
            </NavItem>
            {!loginStatus ? (
              <>
                <NavItem className="p-0">
                  <NavLink
                    data-placement="bottom"
                    href="login"
                    rel="noopener noreferrer"
                    title="Login"
                  >
                    <i>
                      <RiLoginBoxLine />
                    </i>
                    <p className="d-lg-block d-md-block d-xl-block">Login</p>
                  </NavLink>
                </NavItem>
                <NavItem className="p-0">
                  <NavLink
                    data-placement="bottom"
                    href="register"
                    rel="noopener noreferrer"
                    title="Register"
                  >
                    <i>
                      <BsPlus />
                    </i>
                    <p className="d-lg-block d-md-block d-xl-block">Register</p>
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="logout"
                  rel="noopener noreferrer"
                  title="Login"
                >
                  <i>
                    <RiLogoutBoxLine />
                  </i>
                  <p className="d-lg-block d-md-block d-xl-block">Logout</p>
                </NavLink>
              </NavItem>
            )}
            <NavItem>
              <Button
                className="nav-link d-md-block d-sm-block d-lg-block"
                color="default"
                onClick={() => {
                  window.open(
                    "https://github.com/harshavb08/Ml-yze_2.0",
                    "_blank"
                  );
                }}
              >
                <i>
                  <RiGithubFill />
                </i>
                Github
              </Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}
