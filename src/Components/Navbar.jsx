import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

/**
 * Navigation bar located at the top of all pages.
 * Responsive: will adjust based on device screen size,
 *             and transition to "hamburger" menu on
 *             mobile devices.
 */
const NavbarReactive = () => {
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href={`${process.env.PUBLIC_URL}/`}>Cafés</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href={`${process.env.PUBLIC_URL}/#/disclaimer`}>Disclaimer</Nav.Link>
          <Nav.Link href={`${process.env.PUBLIC_URL}/#/about`}>About</Nav.Link>
          <Nav.Link rel="noopener noreferrer" target="_blank" href="https://github.com/simon-bruklich/Cafes">
            GitHub
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarReactive;
