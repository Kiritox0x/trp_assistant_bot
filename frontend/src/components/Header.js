import React, { Component } from 'react';
import { 
  Navbar, Nav, NavItem, NavDropdown, MenuItem,
  Glyphicon
} from 'react-bootstrap';
import {
  LinkContainer
} from 'react-router-bootstrap';
import { withRouter, Link } from 'react-router-dom';

import $ from 'jquery';
import axios from 'axios';
import store from '../store';
import { unsetToken } from '../actions';

import Logo from '../images/logo.png';

class Header extends Component {

  componentDidMount() {
    $(document).ready(() => {
      $('ul.nav.navbar-nav li').on('click', (e) => {
        $('li.active').removeClass('active');
        console.log(e.target);
        $(e.target).parent().addClass('active');
      });
    });
  }

  render = () => {
    return (
      // <Navbar classNameName="navbar-inverse navbar-fixed-left">
      //   <Navbar.Header>
      //     <Navbar.Brand>
      //       <a>Logo</a>
      //     </Navbar.Brand>
      //     <Navbar.Toggle />
      //   </Navbar.Header>
      //   <Navbar.Collapse>
      //     <Nav>
      //       <LinkContainer to="/" exact><NavItem eventKey={2} href="#">Home</NavItem></LinkContainer>
      //       <LinkContainer to="/classNameroom"><NavItem eventKey={2} href="#">ClassNameroom</NavItem></LinkContainer>
      //       <LinkContainer to="/teacher"><NavItem eventKey={2} href="#">Teacher</NavItem></LinkContainer>
      //       <LinkContainer to="/assistant"><NavItem eventKey={2} href="#">Assistant</NavItem></LinkContainer>
      //     </Nav>
      //     <Nav pullRight>
      //       <NavDropdown title="Name" id="basic-nav-dropdown" pullRight>
      //         <MenuItem divider />
      //         <MenuItem onClick={() => {
      //           store.dispatch(unsetToken());
      //           this.props.history.replace('/');
      //         }}>Logout</MenuItem>
      //       </NavDropdown>
      //     </Nav>
      //   </Navbar.Collapse>
      // </Navbar>
      <div className="navbar navbar-inverse navbar-fixed-left">
        <div className="profile">
          <div className="profile-pic">
            <img src={Logo} alt="logo-uni" />
          </div>
          <div className="profile-info">
            <p title="username">username</p>
            <p title="Normal user">Normal user</p>
          </div>
        </div>
        <ul className="nav navbar-nav">
          <LinkContainer to="/" exact><li><a>Bảng điều khiển</a></li></LinkContainer>
          <li>
            <a>Quản lý</a>
            <ul>
              <LinkContainer to="/classroom"><li><a>Lớp học</a></li></LinkContainer>
              <LinkContainer to="/teacher"><li><a>GVCM</a></li></LinkContainer>
              <LinkContainer to="/assistant"><li><a>GVHD</a></li></LinkContainer>
            </ul>
          </li>
          <li><a onClick={() => {
              store.dispatch(unsetToken());
              this.props.history.replace('/');
            }}
            >
            <Glyphicon glyph="log-out" /> Logout</a>
          </li>
        </ul>

      </div>
    );
  }
}

export default withRouter(Header);
