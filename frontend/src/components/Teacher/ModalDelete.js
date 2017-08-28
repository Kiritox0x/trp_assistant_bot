import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button
} from 'react-bootstrap';

import { toggleModal } from '../../actions';
import * as actionsType from '../../actions/types';
class ModalDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  clickClose = () => {
    this.props.toggleModal(false, actionsType.TEACHER.TOGGLE_MODAL_DELETE);
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.teacher.selected);
  };

  render = () => {
    const {
      id, name, code,
      topica_email, personal_email, phone_number,
      status, location, account,
      date_of_birth, note, supporter
    } = this.state;
    return (
      <Modal show={this.props.teacher.showModalDelete} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa giảng viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xóa giảng viên {name}?
        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="primary">Đồng ý</Button>
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
  toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
