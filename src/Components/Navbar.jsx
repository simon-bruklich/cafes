import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

// const Navbar = () => {
//   return (
//     <Bar bg="primary" variant="dark">
//       <Bar.Brand href="/">Cafés</Bar.Brand>
//       <Nav className="mr-auto">
//         <Nav.Link href="/">Home</Nav.Link>
//         <Nav.Link href="/disclaimer">Disclaimer</Nav.Link>
//         <Nav.Link href="/about">About</Nav.Link>
//       </Nav>
//     </Bar>
//   );
// };

const NavbarReactive = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Cafés</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/disclaimer">Disclaimer</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="#deets">Github</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarReactive;
