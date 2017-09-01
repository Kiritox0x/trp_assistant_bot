import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button
} from 'react-bootstrap';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';

class ModalDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  clickClose = () => {
    this.props.toggleModal(false, actionsTypes.SUPPORTER.TOGGLE_MODAL_DELETE);
  }

  componentWillReceiveProps = () => {
    this.setState(this.props.supporter.selected);
  }
  
  render = () => {
    const {
      name, account
    } = this.state;
    return (
      <Modal show={this.props.supporter.showModalDelete} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa trợ giảng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xóa trợ giảng {name}, tài khoản: {account}?
        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="danger">Xóa trợ giảng</Button>
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
)(ModalDelete);
