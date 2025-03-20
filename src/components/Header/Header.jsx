import {React,useEffect,useState} from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutBtn from "./LogoutBtn";
import authService from "../../appwrite/auth";


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
 const [username, setUsername] = useState("");
  
  useEffect(() => {
    if (authStatus) {
      authService.getCurrentUser().then((user) => {
        if (user) {
          setUsername(user.name); // Assuming the user object has a 'name' field
        }
      });
    }
  }, [authStatus]);

  const navItems = [
     
    { name: "Home", slug: "/home", active: true },
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
      {/* Left-aligned navigation items */}
      <Navbar.Brand className="fw-bold text-white">Physicswala</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto"> {/* Aligns items to the left */}
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
        </Nav>

        {/* Right-aligned username and logout button */}
        <Nav className="ms-auto d-flex align-items-center">
          {authStatus && username && (
            <Nav.Item className="mx-3 text-white fw-bold">
              Welcome, {username}
            </Nav.Item>
          )}
          {authStatus && (
            <Nav.Item>
              <LogoutBtn />
            </Nav.Item>
          )}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default Header;
