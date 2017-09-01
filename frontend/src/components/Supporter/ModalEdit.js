import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';

class ModalEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  clickClose() {
    this.props.toggleModal(false, actionsTypes.SUPPORTER.TOGGLE_MODAL_EDIT);
  }

  componentWillReceiveProps = () => {
    this.setState(this.props.supporter.selected);
  }

  render = () => {
    const { 
      name, account, email
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
          <Button bsStyle="primary">Lưu lại</Button>
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
