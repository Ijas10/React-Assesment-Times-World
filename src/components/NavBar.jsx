import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import "../styles/Navbar.css"
import { useDispatch,useSelector } from 'react-redux';
import { setRegion } from '../store/regionFilterSlice';


const NavBar = () => {
  const dispatch = useDispatch();
  const currentRegion = useSelector((state) => state.regionFilter.region);
  const regions = ['All', 'Asia', 'Europe'];

  return (
    <Navbar bg="light" expand="lg" className="custom-navbar">
      <Container fluid>
        <Navbar.Brand href="/" className="navbar-brand">
          Countries
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {regions.map((region) => (
              <Nav.Link
                key={region}
                className={`nav-link ${currentRegion === region ? 'active' : ''}`}
                onClick={() => dispatch(setRegion(region))}
              >
                {region}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;



















