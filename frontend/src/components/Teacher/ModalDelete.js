import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button
} from 'react-bootstrap';
import { Icon } from 'react-fa';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';
import * as API from '../../config/Api';
import * as ApiClient from '../../util/ApiClient';

class ModalDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  clickClose = () => {
    this.props.toggleModal(false, actionsTypes.TEACHER.TOGGLE_MODAL_DELETE);
  };

  clickDelete = () => {
    this.setState({
      isLoading: true
    })
    ApiClient.deleteData(API.TEACHERS, this.state.id)
    .then(res => {
      ApiClient.getData(API.TEACHERS, actionsTypes.TEACHER);
      this.clickClose();
      alert("Xoá thành công");
      return;
    })
    .catch(err => {
      alert("Có lỗi xuất hiện, vui lòng thử lại sau");
      this.setState({
        isLoading: false
      });
    });
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.teacher.selected);
  };

  render = () => {
    const {
      name, code, isLoading
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
        <Button bsStyle="danger" onClick={() => this.clickDelete()}>
          { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Xóa GVCM
        </Button>
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
