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
import * as constants from '../../config/constant';

class ModalDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  clickClose = () => {
    this.props.toggleModal(false, actionsTypes.MAILTEMPLATE.TOGGLE_MODAL_DELETE);
  };

  clickDelete = () => {
    this.setState({
      isLoading: true
    })
    ApiClient.deleteData(API.MAILTEMPLATES, this.state.id)
    .then(res => {
      ApiClient.getData(API.MAILTEMPLATES, actionsTypes.MAILTEMPLATE, constants.HAS_PREVIEW);
      console.log(res);
      this.clickClose();
    })
    .catch(err => {
      alert("Có lỗi xuất hiện, vui lòng thử lại sau");
      console.log(err);
      this.setState({
        isLoading: false
      });
    });
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.mailtemplate.selected);
  };

  render = () => {
    const {
      title, isLoading
    } = this.state;
    return (
      <Modal show={this.props.mailtemplate.showModalDelete} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Xóa mẫu mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Xác nhận xóa mẫu mail {title}?
        </Modal.Body>
        <Modal.Footer>
        <Button bsStyle="danger" onClick={() => this.clickDelete()}>
          { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Xóa mẫu mail
        </Button>
        <Button onClick={() => this.clickClose()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  mailtemplate: state.mailtemplate,
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
