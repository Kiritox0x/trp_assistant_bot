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
        $(e.target).parent().addClass('active');
      });
    });
  }

  render = () => {
    return (
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
          <li><a onClick={() => {
              store.dispatch(unsetToken());
              this.props.history.replace('/');
            }}
            >
            <Glyphicon glyph="log-out" /> Đăng xuất</a></li>
          <LinkContainer to="/" exact><li><a>Bảng điều khiển</a></li></LinkContainer>
          <li>
            <a>Quản lý</a>
            <ul>
              <LinkContainer to="/classroom"><li><a>Lớp học</a></li></LinkContainer>
              <LinkContainer to="/teacher"><li><a>GVCM</a></li></LinkContainer>
              <LinkContainer to="/assistant"><li><a>GVHD</a></li></LinkContainer>
              <LinkContainer to="/supporter"><li><a>Trợ giảng</a></li></LinkContainer>
            </ul>
          </li>
        </ul>

      </div>
    );
  }
}

export default withRouter(Header);
