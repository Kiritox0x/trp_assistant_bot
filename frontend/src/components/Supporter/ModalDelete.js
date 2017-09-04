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
    this.props.toggleModal(false, actionsTypes.SUPPORTER.TOGGLE_MODAL_DELETE);
  }

  clickDelete = () => {
    this.setState({
      isLoading: true
    })
    ApiClient.deleteData(API.SUPPORTERS, this.state.id)
    .then(res => {
      ApiClient.getData(API.SUPPORTERS, actionsTypes.SUPPORTER);
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
    this.setState(this.props.supporter.selected);
  }
  
  render = () => {
    const {
      name, account, isLoading
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
        <Button bsStyle="danger" onClick={() => this.clickDelete()}>
         { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Xóa trợ giảng</Button>
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
