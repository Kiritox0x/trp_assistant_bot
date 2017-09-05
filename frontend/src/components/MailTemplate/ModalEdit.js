import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form, FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import CKEditor from "react-ckeditor-component";
import { Icon } from 'react-fa';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';
import * as API from '../../config/Api';
import * as ApiClient from '../../util/ApiClient';
import * as constants from '../../config/constant';

class ModalEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  validate = () => {
    const {
      context, name, title
    } = this.state;
    let mess = name.length === 0 ? 'Name is required\n' : '';
    mess += title.length === 0 ? 'Title is required\n' : '';
    mess += context.length === 0 ? 'Context is required' : '';
    if (mess.length === 0) return {success: true};
    return {success: false, mess};
  };

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  changeValueTemplate = (newValue) => {
    this.setState({
      context: newValue
    });
  }
  
  clickClose = () => {
    this.props.toggleModal(false, actionsTypes.MAILTEMPLATE.TOGGLE_MODAL_EDIT);
  };

  clickSave = () => {
    const check = this.validate();
    if (!check.success) {
      alert(check.mess);
      return;
    }
    this.setState({
      isLoading: true
    });
    const {
      id, name, title, context
    } = this.state;
    ApiClient.saveData(API.MAILTEMPLATES, {id, name, title, context})
    .then(res => {
      if (res.id) {
        ApiClient.getData(API.MAILTEMPLATES, actionsTypes.MAILTEMPLATE, constants.HAS_PREVIEW);      
        this.clickClose();
        alert("Sửa thành công");
        return;
      }
      const mes = Object.values(res).join('\n');
      alert(mes);
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
  };
  
  componentWillReceiveProps = () => {
    this.setState(this.props.mailtemplate.selected);
  };

  render() {
    const { 
      name, title, context, isLoading
    } = this.state;
    return (
      this.props.mailtemplate.showModalEdit ? 
      <div className="w3-modal show-modal">
        <div className="w3-modal-content clearfix">
          <div className="w3-container">
            <Form inline>
              <FormGroup> {/* Tên mẫu mail */}
                <ControlLabel>Sửa mẫu mail: </ControlLabel>
                <FormControl 
                  id="name"
                  type="text"
                  label="Text"
                  value={name}
                  onChange={event => this.onChange(event)}
                />
                <ControlLabel>Tiêu đề: </ControlLabel>
                <FormControl 
                  id="title"
                  type="text"
                  label="Text"
                  value={title}
                  onChange={event => this.onChange(event)}
                />
                <Button bsStyle="primary" onClick={() => this.clickSave()}>
                  { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Lưu lại
                </Button>
                <Button onClick={() => this.clickClose()}>Hủy</Button>
              </FormGroup>
              <CKEditor 
                scriptUrl={constants.CKEDITOR_SCRIPT} 
                activeClass="p10" content={context} 
                onChange={this.changeValueTemplate.bind(this)} 
              />
            </Form>
          </div>
        </div>
      </div>
      : null
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  mailtemplate: state.mailtemplate,
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEdit);
