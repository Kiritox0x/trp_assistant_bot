import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button
} from 'react-bootstrap';

import { toggleModal } from '../../actions';
import * as actionsType from '../../actions/types';
class ModalPreview extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  clickClose = () => {
    this.props.toggleModal(false, actionsType.MAILTEMPLATE.TOGGLE_MODAL_PREVIEW);
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.mailtemplate.selected);
  };

  render() {
    const { 
      title, context
    } = this.state;
    return (
      <Modal className="modal-preview" show={this.props.mailtemplate.showModalPreview} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Xem trước mẫu mail {title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-preview">
          <iframe className="iframe-preview" title={title} srcDoc={context} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.clickClose()}>Đóng</Button>
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
)(ModalPreview);
