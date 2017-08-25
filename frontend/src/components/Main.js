import React, { Component } from 'react';
import { 
  Grid, Col
} from 'react-bootstrap';
import { Switch, Link, Redirect } from 'react-router-dom';

import request from 'request';

import Route from '../routes/AuthRoute';
import Header from './Header';
import Home from './Home/index';
import Classroom from './Classroom/index';
import Teacher from './Teacher/index';
import Assistant from './Assistant/index';
import Supporter from './Supporter/index';

export default class Main extends Component {

  static isPrivate = true;

  render() {
    return (
      <div>
        <Header />
        <Grid>
          <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/classroom' component={Classroom}/>
            <Route path='/teacher' component={Teacher}/>
            <Route path='/assistant' component={Assistant}/>
            <Route path='/supporter' component={Supporter}/>
            <Redirect to="/" />
          </Switch> 
        </Grid>
      </div>
    );
  }
}
