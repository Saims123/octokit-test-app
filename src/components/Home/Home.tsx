import React, { useContext } from "react";
import logo from "../../logo.svg";
import "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { AuthContext } from "../../App";
import { Redirect } from "react-router-dom";
import CSV from "../../components/CSV/CSV";
function Home() {
  const { state, dispatch } = useContext(AuthContext);
  if (!state.isLoggedIn) {
    return <Redirect to="/login" />;
  }
  const { avatar_url, name, public_repos, followers, following } = state.user;
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  console.log(state);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <div className="container">
                <button onClick={() => handleLogout()}>Logout</button>
                <div>
                  <div className="content">
                    <img src={avatar_url} />
                    <span>{name}</span>
                    <span>{public_repos} Repos</span>
                    <span>{followers} Followers</span>
                    <span>{following} Following</span>
                  </div>
                </div>
              </div>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br/>
      <CSV></CSV>
    </>
  );
}

export default Home;
