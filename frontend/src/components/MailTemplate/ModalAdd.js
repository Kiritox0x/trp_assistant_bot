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
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  changeValueTemplate = (newValue) => {
    this.setState({
      context: newValue
    });
  }

  clickClose = () => {
    this.props.toggleModal(false, actionsType.MAILTEMPLATE.TOGGLE_MODAL_ADD);
  };

  render = () => {
    const { 
      title, context
    } = this.state;
    return (
      this.props.mailtemplate.showModalAdd ? 
      <div className="w3-modal show-modal">
        <div className="w3-modal-content clearfix">
          <div className="w3-container">
            <span className="w3-button w3-display-topright" onClick={() => this.clickClose()}>&times;</span>
            <span className="w3-padding-large w3-display-topleft">Thêm mẫu mail mới</span>
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
            <CKEditor activeClass="p10" onChange={this.changeValueTemplate.bind(this)} />
          </div>
          <div className="w3-modal-footer pull-right">
            <Button bsStyle="success">Thêm</Button>
            <Button onClick={() => this.clickClose()}>Hủy</Button>
          </div>
        </div>
      </div>
      : null
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
