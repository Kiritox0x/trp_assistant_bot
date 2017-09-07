import React, { Component } from 'react';
import { 
  Grid
} from 'react-bootstrap';
import { Switch, Redirect } from 'react-router-dom';

import * as API from "../config/Api";
import * as ApiClient from '../util/ApiClient';
import * as actionsTypes from '../actions/types';
import * as constants from '../config/constant';

import Route from '../routes/AuthRoute';
import Header from './Header';
import Dashboard from './Dashboard/index';
import Manage from './Manage/index';
import Classroom from './Classroom/index';
import Teacher from './Teacher/index';
import Assistant from './Assistant/index';
import Supporter from './Supporter/index';
import MailTemplate from './MailTemplate/index';
import PreviewEmail from './MailTemplate/PreviewEmail';

export default class Main extends Component {

  static isPrivate = true;

  componentWillMount = () => {
    ApiClient.getData(API.CLASSROOMS, actionsTypes.CLASSROOM, constants.HAS_SEND_MAIL);
    ApiClient.getData(API.TEACHERS, actionsTypes.TEACHER);
    ApiClient.getData(API.ASSISTANTS, actionsTypes.ASSISTANT);
    ApiClient.getData(API.SUPPORTERS, actionsTypes.SUPPORTER);
    ApiClient.getData(API.MAILTEMPLATES, actionsTypes.MAILTEMPLATE, constants.HAS_PREVIEW);
  };

  componentDidMount = () => {

  };

  render = () => {
    return (
      <div>
        <Header />
        <Grid>
          <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/manage' component={Manage}/>
            <Route path='/classroom' component={Classroom}/>
            <Route path='/teacher' component={Teacher}/>
            <Route path='/assistant' component={Assistant}/>
            <Route path='/supporter' component={Supporter}/>
            <Route path='/mailtemplate' component={MailTemplate}/>
            <Route path='/preview' component={PreviewEmail}/>
            <Redirect to="/" />
          </Switch> 
        </Grid>
      </div>
    );
  };
}

