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
    this.props.toggleModal(false, actionsTypes.TEACHER.TOGGLE_MODAL_DELETE);
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.teacher.selected);
  };

  render = () => {
    const {
      name, code
    } = this.state;
    return (
      <Modal show={this.props.teacher.showModalDelete} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa GVCM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xóa GVCM {name} mã: {code}?
        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="danger">Xóa GVCM</Button>
        <Button onClick={() => this.clickClose()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}


const mapStateToProps = (state, ownProps) => ({
  teacher: state.teacher,
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
