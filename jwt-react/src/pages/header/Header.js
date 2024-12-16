import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <Navbar bg={token ? "primary" : "dark"} variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="">
            {token ? "Logged-In" : "Not-LoggedIn"}
          </Navbar.Brand>
          
          
          <Navbar.Text className="mx-auto" style={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
            Cryptocurrency Prices
          </Navbar.Text>
          
          <Nav className="ml-auto">
            {token ? (
              <>
                <Nav.Link as={Link} to="/dashboard" className='nav-link'>Dashboard</Nav.Link>
                <Nav.Link className="nav-link" onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className='nav-link'>Login</Nav.Link>
                <Nav.Link as={Link} to="/register" className='nav-link'>Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
