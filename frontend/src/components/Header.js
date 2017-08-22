import React, { Component } from 'react';
import { 
  Navbar, Nav, NavItem, NavDropdown, MenuItem
} from 'react-bootstrap';
import {
  LinkContainer
} from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';

import axios from 'axios';
import store from '../store';
import { unsetToken } from '../actions';

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a>Logo</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/" exact><NavItem eventKey={2} href="#">Home</NavItem></LinkContainer>
            <LinkContainer to="/classroom"><NavItem eventKey={2} href="#">Classroom</NavItem></LinkContainer>
            <LinkContainer to="/teacher"><NavItem eventKey={2} href="#">Teacher</NavItem></LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavDropdown title="Name" id="basic-nav-dropdown" pullRight>
              <MenuItem divider />
              <MenuItem onClick={() => {
                store.dispatch(unsetToken());
                this.props.history.replace('/');
              }}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Header);
