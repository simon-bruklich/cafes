import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const NavbarReactive = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Cafés</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/disclaimer">Disclaimer</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link
            target="_blank"
            href="https://github.com/simon-bruklich/COVID-19-Schools"
          >
            Github
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarReactive;
