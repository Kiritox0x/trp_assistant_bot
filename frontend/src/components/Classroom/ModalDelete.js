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
    this.props.toggleModal(false, actionsTypes.CLASSROOM.TOGGLE_MODAL_DELETE);
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.classroom.selected);
  };

  render = () => {
    const {
      class_name, class_subject
    } = this.state;
    return (
      <Modal show={this.props.classroom.showModalDelete} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa lớp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xóa lớp {class_name}, mã môn: {class_subject}?
        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="danger">Xóa lớp</Button>
        <Button onClick={() => this.clickClose()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  classroom: state.classroom,
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
