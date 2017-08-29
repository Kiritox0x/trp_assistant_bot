import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Grid, Col, Button, Glyphicon
} from 'react-bootstrap';
import { Switch, Redirect } from 'react-router-dom';
import $ from 'jquery';

import { 
  set, select, toggleModal
} from '../actions';

import * as API from "../config/Api";
import { getList } from '../util/ApiClient';

import {
  CLASSROOM, ASSISTANT,
  TEACHER, SUPPORTER , MAILTEMPLATE
} from '../actions/types';

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

  clickEdit = (index, type) => {
    this.props.select(index, type.SELECT);
    setTimeout(() => {this.props.toggleModal(true, type.TOGGLE_MODAL_EDIT);}, 100);
  };

  clickDelete = (index, type) => {
    this.props.select(index, type.SELECT);
    setTimeout(() => {this.props.toggleModal(true, type.TOGGLE_MODAL_DELETE);}, 100);
  };


  clickPreview = (index, type) => {
    this.props.select(index, type.SELECT);
    setTimeout(() => {this.props.toggleModal(true, type.TOGGLE_MODAL_PREVIEW);}, 100);
  };


  getData = (API, type, preview = false) => {
    getList(API)
    .then((data) => {
      let index = 0;
      const body = data.map((item) => {
        index++;
        return ! preview ? ({
          ...item,
          edit:     <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.clickEdit(index - 1, type)}>
                      <Glyphicon glyph="pencil" /> Chỉnh sửa
                    </Button>,
          delete:   <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.clickDelete(index - 1, type)}>
                      <Glyphicon glyph="trash" /> Xóa
                    </Button>
        }) : ({
          ...item,
          edit:     <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.clickEdit(index - 1, type)}>
                      <Glyphicon glyph="pencil" /> Chỉnh sửa
                    </Button>,
          delete:   <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.clickDelete(index - 1, type)}>
                      <Glyphicon glyph="trash" /> Xóa
                    </Button>,
          preview:  <Button bsStyle="success" bsSize="xsmall" onClick={() => this.clickPreview(index - 1, type)}>
                      <Glyphicon glyph="search" /> Xem trước
                    </Button>
        })
      });
      this.props.set(body, type.SET_BODY);
      setTimeout(() => this.props.set(false, type.SET_FETCHING), 100);
    })
    .catch(error => console.log(error));
  };

  componentWillMount = () => {
    this.getData(API.CLASSROOMS, CLASSROOM);
    this.getData(API.ASSISTANTS, ASSISTANT);
    this.getData(API.TEACHERS, TEACHER);
    this.getData(API.SUPPORTERS, SUPPORTER);
    this.getData(API.MAILTEMPLATES, MAILTEMPLATE, true);
  };

  componentDidMount = () => {
    // $.fn.modal.Constructor.prototype.enforceFocus = function() {
    //   $( document )
    //     .off( 'focusin.bs.modal' ) // guard against infinite focus loop
    //     .on( 'focusin.bs.modal', $.proxy( function( e ) {
    //       if (
    //         this.$element[ 0 ] !== e.target && !this.$element.has( e.target ).length
    //         // CKEditor compatibility fix start.
    //         && !$( e.target ).closest( '.cke_dialog, .cke' ).length
    //         // CKEditor compatibility fix end.
    //       ) {
    //         this.$element.trigger( 'focus' );
    //       }
    //     }, this ) );
    // };
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
  set,
  select,
  toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

