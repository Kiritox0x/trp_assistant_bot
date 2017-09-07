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
import * as Validater from '../../util/Validater';

class ModalSendmail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  getRealTemplateId = (index) => {
    return this.props.mailtemplate.allItems[index].id || -1;
  }

  callMailSender = () => {
    const check = Validater.validateMailSender(this.state);
    if (!check.success) {
      alert(check.mess);
      return;
    }
    this.setState({
      isLoading: true
    });
    const {
      id, template_id
    } = this.state;
    ApiClient.sendCustomMail(API.MAILSENDER, {
      class_id: id, 
      template_id: this.getRealTemplateId(template_id)
    })
    .then(res => {
      alert(res.data.status);
      this.setState({
        isLoading: false
      });
    })
    .catch(err => {
      alert("Có lỗi xuất hiện, vui lòng thử lại sau");
      this.setState({
        isLoading: false
      })
    });
  }

  callMailCustom = () => {
    const check = Validater.validateMailCustom(this.state);
    if (!check.success) {
      alert(check.mess);
      return;
    }
    this.setState({
      isLoading: true
    });
    const {
      id, template_title, template_content
    } = this.state;
    ApiClient.sendCustomMail(API.MAILCUSTOM, {
      class_id: id, 
      template_title,
      template_content
    })
    .then(res => {
      alert(res.data.status);
      this.setState({
        isLoading: false
      });
    })
    .catch(err => {
      alert("Có lỗi xuất hiện, vui lòng thử lại sau");
      this.setState({
        isLoading: false
      })
    });
  }
  
  onChange = (event) => {
    const { id, value } = event.target;
    id === 'template_id' ? this.setState({
      template_id: value,
      template_title: this.props.mailtemplate.allItems[value].title,
      template_content: this.props.mailtemplate.allItems[value].context
    }) : this.setState({
      [id]: value
    })
  };

  onChangeCheckbox = () => {
    this.setState({
      editing: ! this.state.editing
    });
  }

  changeValueTemplate = (newValue) => {
    this.setState({
      template_content: newValue
    });
  }
  
  clickClose = () => {
    this.setState({
      editing: false
    });
    this.props.toggleModal(false, actionsTypes.CLASSROOM.TOGGLE_MODAL_SENDMAIL);
  };

  clickSend = () => {
    if (this.state.editing) { 
      this.callMailCustom();
    } else { //không sửa => dùng teamplate có sắn => mailsender
      this.callMailSender();
    }
  };
  
  componentWillReceiveProps = () => {
    this.setState(this.props.classroom.selected);
  };

  render() {
    const { 
      teacher, assistant, isLoading, template_title, template_content
    } = this.state;
    return (
      this.props.classroom.showModalSendmail ? 
      <div className="w3-modal show-modal">
        <div className="w3-modal-content clearfix">
          <div className="w3-container mail-custom">
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
                  <option hidden>Chọn mẫu mail</option>
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
                <Button bsStyle="primary" onClick={() => this.clickSend()}>
                  { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Gửi
                </Button>
                <Button onClick={() => this.clickClose()}>Hủy</Button>
              </FormGroup>
              {
                this.state.editing && this.props.mailtemplate.allItems[this.state.template_id] ? 
                <div>
                  <ControlLabel>Tiêu đề: </ControlLabel>
                  <FormControl 
                    id="template_title"
                    type="text"
                    label="Text"
                    value={template_title}
                    onChange={event => this.onChange(event)}
                  />
                  <br />
                  <CKEditor 
                    scriptUrl={constants.CKEDITOR_SCRIPT} 
                    activeClass="p10" content={template_content} 
                    onChange={this.changeValueTemplate.bind(this)} 
                  />
                </div>
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
