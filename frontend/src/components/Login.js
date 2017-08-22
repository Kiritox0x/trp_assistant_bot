import React, { Component } from 'react';
import { 
  Grid, Col, Form, FormGroup, FormControl,
  Button,
  ControlLabel
} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import * as Auth from '../util/Auth';



class Login extends Component {

  static isPrivate = false

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  login() {

    Auth.login({
      username: this.state.username,
      password: this.state.password
    })
    .then(() => {
      this.props.history.replace('/');
    })
    .catch((err) => {
      alert('error');
    });
    // console.log(JSON.stringify(this.props));
  }

  validateForm() {
    return this.state.username.length > 0
      && this.state.password.length > 0;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  render() {
    return (
      <Grid>
        <Col md={4} mdOffset={4} sm={6} smOffset={3} xs={8} xsOffset={2}>
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
              <ControlLabel>Password</ControlLabel>
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
                Login
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Grid>
    );
  }
}

export default withRouter(Login);
