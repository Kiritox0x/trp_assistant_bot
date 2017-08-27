import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
// import Datetime from 'react-datetime';

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
  }

  onChangeDate = (event, id) => {
    this.setState({
      [id]: event.toDate()
    });
  }

  clickClose = () => {
    this.props.toggleModal(false, actionsType.TOGGLE_MODAL_ADD_SUPPORTER);
  }

  render = () => {
    const { 
      id, name, account, email
    } = this.state;
    return (
      <Modal show={this.props.supporter.showModalAdd} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm trợ giảng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Tên */}
            <ControlLabel>Tên</ControlLabel>
            <FormControl 
              id="name"
              type="text"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <FormGroup> {/* Tài khoản */}
            <ControlLabel>Tài khoản</ControlLabel>
            <FormControl 
              id="account"
              type="text"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <FormGroup> {/* Email */}
            <ControlLabel>Email</ControlLabel>
            <FormControl 
              id="email"
              type="text"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success">Thêm</Button>
          <Button onClick={() => this.clickClose()}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}


const mapStateToProps = (state, ownProps) => ({
  supporter: state.supporter,
});

const mapDispatchToProps = {
  toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
