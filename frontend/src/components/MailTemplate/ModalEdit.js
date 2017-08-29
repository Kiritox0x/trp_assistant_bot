import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import CKEditor from "react-ckeditor-component";
import $ from 'jquery';

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

  changeValueTemplate = (newValue) => {
    this.setState({
      context: newValue
    });
  }
  
  clickClose = () => {
    this.props.toggleModal(false, actionsType.MAILTEMPLATE.TOGGLE_MODAL_EDIT);
  };
  
  componentWillReceiveProps = () => {
    this.setState(this.props.mailtemplate.selected, () => {
      console.log((this.state));
    });

  };

  componentDidMount = () => {

  };

  render() {
    const { 
      id, title, context
    } = this.state;
    return (
      this.props.mailtemplate.showModalEdit ? 
      <div className="w3-modal show-modal">
        <div className="w3-modal-content clearfix">
          <div className="w3-container">
            <span className="w3-button w3-display-topright" onClick={() => this.clickClose()}>&times;</span>
            <span className="w3-padding-large w3-display-topleft">Sửa mẫu mail: {title}</span>
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
            <CKEditor activeClass="p10" content={context} onChange={this.changeValueTemplate.bind(this)} />
          </div>
          <div className="w3-modal-footer pull-right">
            <Button bsStyle="primary">Lưu lại</Button>
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
)(ModalEdit);
