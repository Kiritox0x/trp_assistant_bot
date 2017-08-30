import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button
} from 'react-bootstrap';

import { toggleModal } from '../../actions';
import * as actionsType from '../../actions/types';
import { getData, deleteData } from '../../util/ApiClient';
import * as API from '../../config/Api';
class ModalDelete extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  clickClose = () => {
    this.props.toggleModal(false, actionsType.MAILTEMPLATE.TOGGLE_MODAL_DELETE);
  };

  clickDelete = () => {
    deleteData(API.MAILTEMPLATES, this.state.id)
    .then(res => {
      if (res.status === 204) {
        this.clickClose();
        getData(API.MAILTEMPLATES, actionsType.MAILTEMPLATE, true);
      } else {
        alert("Có lỗi xuất hiện, vui lòng thử lại sau");
        console.log(res);
      }
    })
    .catch(err => {
      alert("Có lỗi xuất hiện, vui lòng thử lại sau");
      console.log(err);
    });
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.mailtemplate.selected);
  };

  render = () => {
    const {
      id, title
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
        <Button bsStyle="danger" onClick={() => this.clickDelete()}>Xóa mẫu mail</Button>
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
  toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalDelete);
