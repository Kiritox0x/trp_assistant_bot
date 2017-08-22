import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';

import { toggleModalDelete } from '../../actions';
import * as actionsType from '../../actions/types';
class ModalDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps() {
    this.setState(this.props.teacher.selected);
  }

  render() {
    const {
      id, name, code,
      topica_email, personal_email,
      status, location, account,
      date_of_birth, note, supporter
    } = this.state;
    return (
      <Modal show={this.props.teacher.showModalDelete} onHide={() => this.props.toggleModalDelete(false, actionsType.TOGGLE_MODAL_DELETE_TEACHER)}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa giảng viên</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xóa giảng viên {name}?
        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="primary">Đồng ý</Button>
        <Button onClick={() => this.props.toggleModalDelete(false, actionsType.TOGGLE_MODAL_DELETE_TEACHER)}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  teacher: state.teacher,
});

const mapDispatchToProps = {
  toggleModalDelete,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
