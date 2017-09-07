import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Datetime from 'react-datetime';
import { Icon } from 'react-fa';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';
import * as API from '../../config/Api';
import * as ApiClient from '../../util/ApiClient';
import * as Validater from '../../util/Validater';

class ModalEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dateFormat: 'YYYY-MM-DD',
      timeFormat: false,
      closeOnSelect: true
    };
  }

  onChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  onChangeDate = (event, id) => {
    this.setState({
      [id]: event.toISOString().split('T')[0]
    });
  };

  clickClose = () => {
    this.props.toggleModal(false, actionsTypes.ASSISTANT.TOGGLE_MODAL_EDIT);
  };

  clickSave = () => {
    const check = Validater.validateTeacher(this.state);
    if (!check.success) {
      alert(check.mess);
      return;
    }
    this.setState({
      isLoading: true
    });
    const {
      id, code, name, topica_email, personal_email, 
      phone_number, status, location, account, 
      date_of_birth, note, supporter,
    } = this.state;
    ApiClient.saveData(API.ASSISTANTS, {
      id, code, name, topica_email, personal_email, 
      phone_number, status, location, account, 
      date_of_birth, note, supporter,
    })
    .then(res => {
      if (res.id) {
        ApiClient.getData(API.ASSISTANTS, actionsTypes.ASSISTANT);      
        this.clickClose();
        alert("Sửa thành công");
        return;
      }
      const mes = Object.values(res).join('\n');
      alert(mes);
      this.setState({
        isLoading: false
      });
    })
    .catch(err => {
      alert("Có lỗi xuất hiện, vui lòng thử lại sau");
      this.setState({
        isLoading: false
      })
    });
  };

  componentWillReceiveProps = () => {
    this.setState(this.props.assistant.selected);
  };

  render = () => {
    const { 
      name, code,
      topica_email, personal_email, phone_number,
      status, location, account,
      date_of_birth, note, supporter,
      dateFormat, timeFormat, closeOnSelect, isLoading
    } = this.state;
    return (
      <Modal show={this.props.assistant.showModalEdit} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa GVHD</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Tên */}
            <ControlLabel>Tên</ControlLabel>
            <FormControl 
              id="name"
              type="text"
              label="Text"
              value={name}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Mã */}
            <ControlLabel>Mã</ControlLabel>
            <FormControl 
              id="code"
              type="text"
              label="Text"
              value={code}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Email Topica */}
            <ControlLabel>Email Topica</ControlLabel>
            <FormControl 
              id="topica_email"
              type="text"
              label="Text"
              value={topica_email}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Email cá nhân */}
            <ControlLabel>Email cá nhân</ControlLabel>
            <FormControl 
              id="personal_email"
              type="text"
              label="Text"
              value={personal_email}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Số điện thoại */}
            <ControlLabel>Số điện thoại</ControlLabel>
            <FormControl 
              id="phone_number"
              type="text"
              label="Text"
              value={phone_number}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Trạng thái */}
            <ControlLabel>Trạng thái</ControlLabel>
            <FormControl
              id="status"
              type="text"
              label="Text"
              value={status}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Địa chỉ */}
            <ControlLabel>Địa chỉ</ControlLabel>
            <FormControl 
              id="location"
              type="text"
              label="Text"
              value={location}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Tài khoản */}
            <ControlLabel>Tài khoản</ControlLabel>
            <FormControl 
              id="account"
              type="text"
              label="Text"
              value={account}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Ngày sinh */}
            <ControlLabel>Ngày sinh</ControlLabel>
            <Datetime 
              id="date_of_birth"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              closeOnSelect={closeOnSelect}
              value={new Date(date_of_birth)}
              onChange={event => this.onChangeDate(event, 'date_of_birth')}
            />
          </FormGroup>
          <FormGroup> {/* Ghi chú */}
            <ControlLabel>Ghi chú</ControlLabel>
            <FormControl 
              id="note"
              componentClass="textarea" 
              placeholder="Ghi chú" 
              value={note}
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
              value={supporter || ''}
            >
              <option hidden>Chọn trợ giảng</option>
              {
                this.props.supporter.allItems.map((sp) => (
                  <option key={sp.id} value={sp.account}>
                    {sp.name}
                  </option>
                ))
              }
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={() => this.clickSave()}>
            { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Lưu lại
          </Button>
          <Button onClick={() => this.clickClose()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  assistant: state.assistant,
  supporter: state.supporter
});

const mapDispatchToProps = {
  toggleModal:actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEdit);
