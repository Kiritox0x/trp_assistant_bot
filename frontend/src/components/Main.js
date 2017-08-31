import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Grid
} from 'react-bootstrap';
import { Switch, Redirect } from 'react-router-dom';

import * as API from "../config/Api";
import * as ApiClient from '../util/ApiClient';
import * as actions from '../actions';
import * as actionsTypes from '../actions/types';
import * as constants from '../config/constant';

import Route from '../routes/AuthRoute';
import Header from './Header';
import Home from './Home/index';
import Classroom from './Classroom/index';
import Teacher from './Teacher/index';
import Assistant from './Assistant/index';
import Supporter from './Supporter/index';
import MailTemplate from './MailTemplate/index';

class Main extends Component {

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
            <Route path='/' exact component={Home}/>
            <Route path='/manage' component={Home}/>
            <Route path='/classroom' component={Classroom}/>
            <Route path='/teacher' component={Teacher}/>
            <Route path='/assistant' component={Assistant}/>
            <Route path='/supporter' component={Supporter}/>
            <Route path='/mailtemplate' component={MailTemplate}/>
            <Redirect to="/" />
          </Switch> 
        </Grid>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  assistant: state.assistant,
  classroom: state.classroom,
  supporter: state.supporter,
  teacher: state.teacher,
  mailtemplate: state.mailtemplate
});

const mapDispatchToProps = {
  set: actions.set,
  select: actions.select,
  toggleModal: actions.toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

