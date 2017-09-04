import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import { Icon } from 'react-fa';  

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';
import * as API from '../../config/Api';
import * as ApiClient from '../../util/ApiClient';

class ModalEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      account: '',
      email: ''
    };
  }

  validate = () => {
    const {
      name, account, email
    } = this.state;
    let mess = name.length === 0 ? 'Name is required\n' : '';
    mess += account.length === 0 ? 'Account is required\n' : '';
    mess += email.length === 0 ? 'Email is required' : '';
    if (mess.length === 0) return {success: true};
    return {success: false, mess};
  };
  
  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  clickClose() {
    this.props.toggleModal(false, actionsTypes.SUPPORTER.TOGGLE_MODAL_EDIT);
  }

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
      id, name, account, email
    } = this.state;
    ApiClient.saveData(API.SUPPORTERS, {id, name, account, email})
    .then(res => {
      if (res.id) {
        ApiClient.getData(API.SUPPORTERS, actionsTypes.SUPPORTER);      
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
    this.setState(this.props.supporter.selected);
  }

  render = () => {
    const { 
      name, account, email, isLoading
    } = this.state;
    return (
      <Modal show={this.props.supporter.showModalEdit} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa trợ giảng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Tên */}
            <ControlLabel>Tên</ControlLabel>
            <FormControl 
              id="name"
              type="text"
              label="Text"
              value={name}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Tài khoản */}
            <ControlLabel>Tài khoản</ControlLabel>
            <FormControl 
              id="account"
              type="text"
              label="Text"
              value={account}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Email */}
            <ControlLabel>Email</ControlLabel>
            <FormControl 
              id="email"
              type="text"
              label="Text"
              value={email}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={() => this.clickSave()}>
            { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Lưu lại
          </Button>
          <Button onClick={() => this.clickClose()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  supporter: state.supporter,
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEdit);
