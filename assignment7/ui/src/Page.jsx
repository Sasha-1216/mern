import React from 'react';
import Contents from './Contents.jsx';
import { NavLink } from 'react-router-dom';
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  Glyphicon,
  Tooltip,
  OverlayTrigger,
  Grid,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar() {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>My Company Inventory</Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to='/'>
          <NavItem>Home</NavItem>
        </LinkContainer>

        <LinkContainer to='/product'>
          <NavItem>Product List</NavItem>
        </LinkContainer>

        <LinkContainer to='/report'>
          <NavItem>Report</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavItem>
          <OverlayTrigger
            placement='left'
            delayShow={1000}
            overlay={<Tooltip id='create-product'>Create Product</Tooltip>}
          >
            <Glyphicon glyph='plus'></Glyphicon>
          </OverlayTrigger>
        </NavItem>
        <NavDropdown
          id='user-dropdown'
          title={<Glyphicon glyph='option-vertical' />}
          noCaret
        >
          <MenuItem>About</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

function Footer() {
  return (
    <small>
      <p className='text-center'>PRO Mern Stack - CS648</p>
    </small>
  );
}

export default function Page() {
  return (
    <div>
      <NavBar />
      <Grid container-fluid>
        <Contents />
      </Grid>
      <Footer />
    </div>
  );
}
