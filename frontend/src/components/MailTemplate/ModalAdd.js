import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import CKEditor from "react-ckeditor-component";

import { toggleModal } from '../../actions';
import * as actionsType from '../../actions/types';
class ModalAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateFormat: 'DD/MM/YYYY',
      timeFormat: false,
    };
  }

  onChange = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  clickClose = () => {
    this.props.toggleModal(false, actionsType.TOGGLE_MODAL_ADD_MAILTEMPLATE);
  };

  render = () => {
    const { 
      title, context
    } = this.state;
    return (
      <Modal show={this.props.mailtemplate.showModalAdd} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm mẫu mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Tên mẫu mail */}
            <ControlLabel>Tên mẫu mail</ControlLabel>
            <FormControl 
              id="title"
              type="text"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <CKEditor id="context" activeClass="p10" content="" onChange={this.onChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success">Thêm</Button>
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
)(ModalAdd);
