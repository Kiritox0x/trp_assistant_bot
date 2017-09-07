import React, { Component } from 'react';
import { 
  Grid, Col, Form, FormGroup, FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { Icon } from 'react-fa';

import * as Auth from '../util/Auth';
import Logo from '../images/logo.png';


class Login extends Component {

  static isPrivate = false

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  login = () => {
    if (! this.validateForm()) {
      alert("Tài khoản và mật khẩu không được để trống");
      return;
    }
    this.setState({
      isLoading: true
    });
    Auth.login({
      username: this.state.username,
      password: this.state.password
    })
    .then(() => {
      this.props.history.replace('/');
    })
    .catch((err) => {
      alert('Thông tin đăng nhập không chính xác');
      this.setState({
        isLoading: false
      });
    });
  };

  validateForm = () => {
    return this.state.username.length > 0
      && this.state.password.length > 0;
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  componentDidMount = () => {
    document.title = "Đăng nhập vào hệ thống";
  };

  render = () => {
    const { isLoading } = this.state;
    return (
      <Grid>
        <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={8} xsOffset={2}>
          <h1 className="text-center">
            <img className="logo" src={Logo} alt="logo-uni" />
          </h1>
          <Form horizontal>
            <FormGroup controlId="username">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.username}
                onChange={(event) => { this.handleChange(event); }} />
            </FormGroup>
            <FormGroup controlId="password">
              <ControlLabel>Mật khẩu</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                onChange={(event) => { this.handleChange(event); }} />
            </FormGroup>
            <FormGroup>
              <Button
                block
                bsStyle="primary"
                onClick={(e) => {
                  e.preventDefault();
                  this.login();
                }}
                type="submit">
                { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Đăng nhập
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Grid>
    );
  };
}

export default withRouter(Login);
