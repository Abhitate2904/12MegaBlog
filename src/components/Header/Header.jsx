import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Tests", slug: "/all-tests", active: authStatus },
  ];

  return (
    <Navbar
      expand="lg"
      style={{
        background: "linear-gradient(to right, #004aad, #007bff)",
        padding: "12px 0",
      }}
      variant="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            {navItems.map(
              (item) =>
                item.active && (
                  <Nav.Item key={item.name} className="mx-2">
                    <Button
                      variant="light"
                      style={{
                        padding: "10px 20px",
                        borderRadius: "30px",
                        fontSize: "16px",
                        transition: "all 0.3s ease",
                      }}
                      onClick={() => navigate(item.slug)}
                      onMouseEnter={(e) =>
                        (e.target.style.transform = "scale(1.1)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.transform = "scale(1)")
                      }
                    >
                      {item.name}
                    </Button>
                  </Nav.Item>
                )
            )}

            {authStatus && (
              <Nav.Item className="mx-2">
                {authStatus && (
              <Nav.Item className="mx-2">
                <LogoutBtn />
              </Nav.Item>
            )}
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
