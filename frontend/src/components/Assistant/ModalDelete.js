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
    this.props.toggleModal(false, actionsTypes.ASSISTANT.TOGGLE_MODAL_DELETE);
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.assistant.selected);
  };

  render = () => {
    const {
      name, code,
    } = this.state;
    return (
      <Modal show={this.props.assistant.showModalDelete} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa GVHD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xóa GVHD {name} mã: {code}?
        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="danger">Xóa GVHD</Button>
        <Button onClick={() => this.clickClose()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}


const mapStateToProps = (state, ownProps) => ({
  assistant: state.assistant,
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
