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
    this.props.toggleModal(false, actionsTypes.CLASSROOM.TOGGLE_MODAL_DELETE);
  };

  clickDelete = () => {
    this.setState({
      isLoading: true
    })
    ApiClient.deleteData(API.CLASSROOMS, this.state.id)
    .then(res => {
      this.props.deleteRawData(this.state.id, actionsTypes.CLASSROOM.DELETE_ITEM_RAW_DATA);
      this.props.processRawData(actionsTypes.CLASSROOM.PROCESS_RAW_DATA);
      this.props.set(true, actionsTypes.CLASSROOM.SET_FETCHING);
      this.props.set(false, actionsTypes.CLASSROOM.SET_FETCHING);
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
    this.setState(this.props.classroom.selected);
  };

  render = () => {
    const {
      class_name, class_subject, isLoading
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
        <Button bsStyle="danger" onClick={() => this.clickDelete()}>
          { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Xóa lớp
        </Button>
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
  set: actions.set,
  toggleModal: actions.toggleModal,
  deleteRawData: actions.deleteRawData,
  processRawData: actions.processRawData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
