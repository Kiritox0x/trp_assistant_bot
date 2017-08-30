import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  Form, FormGroup, ControlLabel, FormControl
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
            <Form inline>
              <FormGroup> {/* Tên mẫu mail */}
                <ControlLabel>Thêm mẫu mail: </ControlLabel>
                <FormControl 
                  id="title"
                  type="text"
                  label="Text"
                  placeholder="Tên mẫu mail"
                  value={title}
                  onChange={(event) => { this.onChange(event);}}
                />
                <Button bsStyle="success">Thêm</Button>
                <Button onClick={() => this.clickClose()}>Hủy</Button>
              </FormGroup>
              <CKEditor scriptUrl="https://cdn.ckeditor.com/4.7.2/full-all/ckeditor.js" activeClass="p10" onChange={this.changeValueTemplate.bind(this)} />
            </Form>
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
