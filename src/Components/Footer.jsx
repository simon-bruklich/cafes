import React from "react";
import { Container, Row } from "react-bootstrap";

/**
 * Footer that is present on all pages.
 */
function Footer() {
  return (
    <div className="main-footer">
      <Container fluid>
        <Row className="justify-content-center">
          <p className="footer-text">
            &copy; {new Date().getFullYear()} Simon Bruklich | All Rights
            Reserved
          </p>
        </Row>
      </Container>
    </div>
  );
}

export default Footer;
