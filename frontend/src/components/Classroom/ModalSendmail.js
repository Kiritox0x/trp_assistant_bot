import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button, Checkbox,
  Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import CKEditor from "react-ckeditor-component";
import { Icon } from 'react-fa';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';
import * as API from '../../config/Api';
import * as ApiClient from '../../util/ApiClient';
import * as constants from '../../config/constant';

class ModalSendmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      template_id: 0,
      editing: false
    };
  }
  
  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onChangeCheckbox = () => {
    this.setState({
      editing: ! this.state.editing
    });
  }

  changeValueTemplate = (newValue) => {
    this.setState({
      context: newValue
    });
  }
  
  clickClose = () => {
    this.setState({
      editing: false,
      template_id: 0
    });
    this.props.toggleModal(false, actionsTypes.CLASSROOM.TOGGLE_MODAL_SENDMAIL);
  };

  clickSave = () => {
    this.setState({
      isLoading: true
    });
    const {
      id, name, title, context
    } = this.state;
    // ApiClient.saveData(API.classroomS, {id, name, title, context})
    // .then(res => {
    //   if (res.status === 200) {
    //     this.clickClose();
    //     ApiClient.getData(API.classroomS, actionsTypes.classroom, true);
    //   } else {
    //     alert("Có lỗi xuất hiện, vui lòng thử lại sau");
    //     console.log(res);        
    //   }
    //   this.setState({
    //     isLoading: false
    //   });
    // })
    // .catch(err => {
    //   alert("Có lỗi xuất hiện, vui lòng thử lại sau");
    //   console.log(err);
    //   this.setState({
    //     isLoading: false
    //   });
    // });
  };
  
  componentWillReceiveProps = () => {
    this.setState(this.props.classroom.selected);
  };

  render() {
    const { 
      teacher, assistant, isLoading
    } = this.state;
    return (
      this.props.classroom.showModalSendmail ? 
      <div className="w3-modal show-modal">
        <div className="w3-modal-content clearfix">
          <div className="w3-container">
            <Form inline>
              <FormGroup> {/* Tên mẫu mail */}
                <ControlLabel>Người nhận: {`${teacher || ''}, ${assistant || ''}`}</ControlLabel><br />
                <ControlLabel>Mẫu mail: </ControlLabel>
                <FormControl 
                  id="template_id"
                  componentClass="select" 
                  disabled={this.state.editing}
                  placeholder="Mẫu mail"
                  onChange={event => this.onChange(event)}
                >
                  {
                    this.props.mailtemplate.allItems.map((template, index) => {
                      return (
                        <option value={index} key={template.id}>{template.title}</option>
                      );
                    })
                  }
                </FormControl>
                <Checkbox inline id="editing" onChange={(event) => this.onChangeCheckbox()}>
                  chỉnh sửa
                </Checkbox>
                <Button bsStyle="primary" onClick={() => this.clickSave()}>
                  { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Gửi
                </Button>
                <Button onClick={() => this.clickClose()}>Hủy</Button>
              </FormGroup>
              {
                this.state.editing ? 
                <CKEditor 
                  scriptUrl={constants.CKEDITOR_SCRIPT} 
                  activeClass="p10" content={
                    this.props.mailtemplate.allItems[this.state.template_id].context
                  } 
                  onChange={this.changeValueTemplate.bind(this)} 
                />
                : null
              }
            </Form>
          </div>
        </div>
      </div>
      : null
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  classroom: state.classroom,
  mailtemplate: state.mailtemplate
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalSendmail);
