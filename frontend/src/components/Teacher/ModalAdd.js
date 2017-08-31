import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Datetime from 'react-datetime';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';

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

  onChangeDate = (event, id) => {
    this.setState({
      [id]: event.toDate()
    });
  };

  clickClose = () => {
    this.props.toggleModal(false, actionsTypes.TEACHER.TOGGLE_MODAL_ADD);
  };

  render = () => {
    const { 
      dateFormat, timeFormat
    } = this.state;
    return (
      <Modal show={this.props.teacher.showModalAdd} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm GVCM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Tên */}
            <ControlLabel>Tên</ControlLabel>
            <FormControl 
              id="name"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Mã */}
            <ControlLabel>Mã</ControlLabel>
            <FormControl 
              id="code"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Email Topica */}
            <ControlLabel>Email Topica</ControlLabel>
            <FormControl 
              id="topica_email"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Email cá nhân */}
            <ControlLabel>Email cá nhân</ControlLabel>
            <FormControl 
              id="personal_email"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Số điện thoại */}
            <ControlLabel>Số điện thoại</ControlLabel>
            <FormControl 
              id="phone_number"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Trạng thái */}
            <ControlLabel>Trạng thái</ControlLabel>
            <FormControl
              id="status"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Địa chỉ */}
            <ControlLabel>Địa chỉ</ControlLabel>
            <FormControl 
              id="location"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Tài khoản */}
            <ControlLabel>Tài khoản</ControlLabel>
            <FormControl 
              id="account"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Ngày sinh */}
            <ControlLabel>Ngày sinh</ControlLabel>
            <Datetime 
              id="date_of_birth"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              onChange={event=> this.onChangeDate(event, 'date_of_birth')}
            />
          </FormGroup>
          <FormGroup> {/* Ghi chú */}
            <ControlLabel>Ghi chú</ControlLabel>
            <FormControl 
              id="note"
              componentClass="textarea" 
              placeholder="Ghi chú" 
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Trợ giảng */}
            <ControlLabel>Trợ giảng</ControlLabel>
            <FormControl 
              id="supporter"
              componentClass="select" 
              placeholder="Trợ giảng"
              onChange={event => this.onChange(event)}
            >
              <option value=""></option>
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success">Thêm</Button>
          <Button onClick={() => this.clickClose()}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    );
  };
};

const mapStateToProps = (state, ownProps) => ({
  teacher: state.teacher,
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
