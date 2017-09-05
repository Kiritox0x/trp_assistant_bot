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
import * as Validater from '../../util/Validater';

class ModalAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      account: '',
      email: ''
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  clickClose = () => {
    this.props.toggleModal(false, actionsTypes.SUPPORTER.TOGGLE_MODAL_ADD);
  }
  
  clickAdd = () => {
    const check = Validater.validateSupporter(this.state);
    if (!check.success) {
      alert(check.mess);
      return;
    }
    this.setState({
      isLoading: true
    });
    const {
      name, account, email
    } = this.state;
    ApiClient.addData(API.SUPPORTERS, { name, account, email })
    .then(res => {
      if (res.id) {
        ApiClient.getData(API.SUPPORTERS, actionsTypes.SUPPORTER);      
        this.clickClose();
        alert("Thêm thành công");
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
      });
    });
  }

  render = () => {
    const {
      isLoading
    } = this.state;
    return (
      <Modal show={this.props.supporter.showModalAdd} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm trợ giảng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Tên */}
            <ControlLabel>Tên</ControlLabel>
            <FormControl 
              id="name"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Tài khoản */}
            <ControlLabel>Tài khoản</ControlLabel>
            <FormControl 
              id="account"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Email */}
            <ControlLabel>Email</ControlLabel>
            <FormControl 
              id="email"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success" onClick={() => this.clickAdd()}>
            { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Thêm
          </Button>
          <Button onClick={() => this.clickClose()}>Đóng</Button>
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
)(ModalAdd);
