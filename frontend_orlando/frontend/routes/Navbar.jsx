import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../Auth/AuthProvider';
import axios from 'axios';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, setIsAuthenticated } = useAuth();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');

      await axios.post('http://localhost:8000/api/v1/auth/logout/', {}, {
        headers: {
          'Authorization': `Token ${token}`
        },
        withCredentials: true
      });

      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      setIsAuthenticated(false);
      navigate('/login');
    } catch (error) {
      console.error('Error al hacer logout:', error);
    }
  };

  return (
    isAuthenticated && (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">Orlando Cargo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {!isAdmin && <Nav.Link as={Link} to="/tasks">Guías Pendientes</Nav.Link>} {/* Mostrar solo si no es admin */}
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout}>Log-out</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  );
};

export default NavbarComponent;
