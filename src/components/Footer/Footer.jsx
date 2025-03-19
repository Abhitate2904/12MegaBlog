import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #004aad, #007bff)",
        color: "white",
        padding: "30px 0",
        textAlign: "center",
        marginTop: "233px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <h5 style={{ fontSize: "20px", fontWeight: "bold" }}>
              Physicswala Satara
            </h5>
            <p style={{ fontSize: "14px", opacity: "0.8" }}>
              &copy; 2025. All Rights Reserved.
            </p>
          </Col>
          <Col xs={12} md={6}>
            <div className="d-flex justify-content-center gap-3">
              <Link
                to="/"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "16px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffcc00")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                Home
              </Link>
              <Link
                to="/about"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "16px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffcc00")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "16px",
                  transition: "color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#ffcc00")}
                onMouseLeave={(e) => (e.target.style.color = "white")}
              >
                Contact
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
