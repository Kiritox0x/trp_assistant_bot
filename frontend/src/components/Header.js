import React, { Component } from 'react';
import { 
  Glyphicon
} from 'react-bootstrap';
import {
  LinkContainer
} from 'react-router-bootstrap';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';

import store from '../store';
import * as actions from '../actions';

import Logo from '../images/logo.png';

class Header extends Component {

  clickLogout = () =>  {
    store.dispatch(actions.unsetToken());
    window.location = '/';
  };

  componentDidMount = () => {
    $(document).ready(() => {
      $('ul.nav.navbar-nav li').on('click', (e) => {
        $('li.active').removeClass('active');
        $(e.target).parent().addClass('active');
      });
    });
  };

  render = () => {
    return (
      <div className="navbar navbar-inverse navbar-fixed-left">
        <LinkContainer to="/profile">
          <a>
            <div className="profile">
              <div className="profile-pic">
                <img src={Logo} alt="logo-uni" />
              </div>
              <div className="profile-info">
                <p title="username">{store.getState().token.username}</p>
                <p title="Normal user">Normal user</p>
              </div>
            </div>
          </a>
        </LinkContainer>
        <ul className="nav navbar-nav">
          <li>
            <a onClick={() => this.clickLogout()}
            >
              <Glyphicon glyph="log-out" /> Đăng xuất
            </a>
          </li>
          <LinkContainer to="/" exact><li><a>Bảng điều khiển</a></li></LinkContainer>
          <LinkContainer to="/manage">
            <li>
              <a>Quản lý</a>
              <ul>
                <LinkContainer to="/classroom"><li><a>Lớp học</a></li></LinkContainer>
                <LinkContainer to="/teacher"><li><a>GVCM</a></li></LinkContainer>
                <LinkContainer to="/assistant"><li><a>GVHD</a></li></LinkContainer>
                <LinkContainer to="/supporter"><li><a>Trợ giảng</a></li></LinkContainer>
                <LinkContainer to="/mailtemplate"><li><a>Mẫu mail</a></li></LinkContainer>
              </ul>
            </li>
          </LinkContainer>
        </ul>
      </div>
    );
  };
}

export default withRouter(Header);
