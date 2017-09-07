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

class ModalAdd extends Component {

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
    this.props.toggleModal(false, actionsTypes.CLASSROOM.TOGGLE_MODAL_ADD);
  };

  clickAdd = () => {
    const check = Validater.validateClassroom(this.state);
    if (!check.success) {
      alert(check.mess);
      return;
    }
    this.setState({
      isLoading: true
    });
    const {
      school, subject, subject_code, 
      class_name, class_subject, estimated_students,
      start_date, finish_date, examination_date,
      teacher, assistant, change_note, supporter
    } = this.state;
    ApiClient.addData(API.CLASSROOMS, { 
      school, subject, subject_code, 
      class_name, class_subject, estimated_students,
      start_date, finish_date, examination_date,
      teacher, assistant, change_note, supporter
    })
    .then(res => {
      if (res.id) {
        this.props.addRawData(res, actionsTypes.CLASSROOM.ADD_RAW_DATA);  
        this.props.processRawData(actionsTypes.CLASSROOM.PROCESS_RAW_DATA);
        this.props.set(true, actionsTypes.CLASSROOM.SET_FETCHING);
        this.props.set(false, actionsTypes.CLASSROOM.SET_FETCHING);
        this.clickClose();
        alert("Thêm thành công");
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
      console.log(err);
      this.setState({
        isLoading: false
      });
    });
  }

  render = () => {
    const {
      dateFormat, timeFormat, closeOnSelect, isLoading
    } = this.state;
    return (
      <Modal show={this.props.classroom.showModalAdd} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Thêm lớp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Trường */}
            <ControlLabel>Trường</ControlLabel>
            <FormControl 
              id="school"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Tên môn */}
            <ControlLabel>Tên môn</ControlLabel>
            <FormControl 
              id="subject"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Mã môn */}
            <ControlLabel>Mã môn</ControlLabel>
            <FormControl 
              id="subject_code"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Tên lớp */}
            <ControlLabel>Tên lớp</ControlLabel>
            <FormControl 
              id="class_name"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Lớp môn */}
            <ControlLabel>Lớp môn</ControlLabel>
            <FormControl
              id="class_subject"
              type="text"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* SL học viên */}
            <ControlLabel>SL học viên</ControlLabel>
            <FormControl 
              id="estimated_students"
              type="number"
              label="Text"
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Ngày bắt đầu */}
            <ControlLabel>Ngày bắt đầu</ControlLabel>
            <Datetime 
              id="start_date"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              closeOnSelect={closeOnSelect}
              onChange={event => this.onChangeDate(event, 'start_date')}
            />
          </FormGroup>
          <FormGroup> {/* Ngày kết thúc */}
            <ControlLabel>Ngày kết thúc</ControlLabel>
            <Datetime 
              id="finish_date"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              closeOnSelect={closeOnSelect}
              onChange={event => this.onChangeDate(event, 'finish_date')}
            />
          </FormGroup>
          <FormGroup> {/* Ngày thi */}
            <ControlLabel>Ngày thi</ControlLabel>
            <Datetime 
              id="examination_date"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              closeOnSelect={closeOnSelect}
              onChange={event => this.onChangeDate(event, 'examination_date')}
            />
          </FormGroup>
          <FormGroup> {/* GVCM */}
            <ControlLabel>GVCM</ControlLabel>
            <FormControl 
              id="teacher"
              componentClass="select" 
              placeholder="GVCM"
              onChange={event => this.onChange(event)}
            >
              <option hidden>Chọn GVCM</option>
              {
                this.props.teacher.allItems.map((teacher) => (
                  <option key={teacher.id} value={teacher.topica_email}>
                    {teacher.name}
                  </option>
                ))
              }
            </FormControl>
          </FormGroup>
          <FormGroup> {/* GVHD */}
            <ControlLabel>GVHD</ControlLabel>
            <FormControl 
              id="assistant"
              componentClass="select" 
              placeholder="GVHD"
              onChange={event => this.onChange(event)}
            >
              <option hidden>Chọn GVHD</option>
              {
                this.props.assistant.allItems.map((assistant) => (
                  <option key={assistant.id} value={assistant.topica_email}>
                    {assistant.name}
                  </option>
                ))
              }
            </FormControl>
          </FormGroup>
          <FormGroup> {/* VHTT thay đổi */}
            <ControlLabel>VHTT thay đổi</ControlLabel>
            <FormControl 
              id="change_note"
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
              <option hidden>Chọn trợ giảng</option>
              {
                this.props.supporter.allItems.map((supporter) => (
                  <option key={supporter.id} value={supporter.account}>
                    {supporter.name}
                  </option>
                ))
              }
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={() => this.clickAdd()}>
            { isLoading ? <Icon spin={true} name="circle-o-notch"/> : null } Lưu lại
          </Button>
          <Button onClick={() => this.clickClose()}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  classroom: state.classroom,
  teacher: state.teacher,
  assistant: state.assistant,
  supporter: state.supporter
});

const mapDispatchToProps = {
  set: actions.set,
  toggleModal: actions.toggleModal,
  addRawData: actions.addRawData,
  processRawData: actions.processRawData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
