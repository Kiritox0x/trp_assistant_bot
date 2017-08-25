import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { toggleModal } from '../../actions';
import * as actionsType from '../../actions/types';
class ModalDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps = () => {
    this.setState(this.props.classroom.selected);
  }

  clickClose = () => {
    this.props.toggleModal(false, actionsType.TOGGLE_MODAL_DELETE_CLASSROOM);
  }

  render = () => {
    const {
      id, school, subject, subject_code, 
      class_name, class_subject, estimated_students,
      start_date, finish_date, examination_date,
      teacher, assistant, change_note, supporter
    } = this.state;
    return (
      <Modal show={this.props.classroom.showModalDelete} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa lớp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xóa lớp {class_name}?
        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="primary">Đồng ý</Button>
        <Button onClick={() => this.clickClose()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  classroom: state.classroom,
});

const mapDispatchToProps = {
  toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
