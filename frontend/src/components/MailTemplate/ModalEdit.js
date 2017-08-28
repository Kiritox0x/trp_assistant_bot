import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import CKEditor from "react-ckeditor-component";

import { toggleModal } from '../../actions';
import * as actionsType from '../../actions/types';
class ModalEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateFormat: 'DD/MM/YYYY',
      timeFormat: false,
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  
  clickClose = () => {
    this.props.toggleModal(false, actionsType.MAILTEMPLATE.TOGGLE_MODAL_EDIT);
  };
  
  componentWillReceiveProps = () => {
    this.setState(this.props.mailtemplate.selected);
  };

  render() {
    const { 
      id, title, context
    } = this.state;
    return (
      <Modal show={this.props.mailtemplate.showModalEdit} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa mẫu mail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Tên mẫu mail */}
          <ControlLabel>Tên mẫu mail</ControlLabel>
          <FormControl 
            id="title"
            type="text"
            label="Text"
            value={title}
            onChange={(event) => { this.onChange(event);}}
          />
        </FormGroup>
        <CKEditor activeClass="p10" content={context} onChange={this.onChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary">Lưu lại</Button>
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
)(ModalEdit);
