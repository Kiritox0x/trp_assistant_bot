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
    this.props.toggleModal(false, actionsTypes.CLASSROOM.TOGGLE_MODAL_EDIT)
  };

  clickSave = () => {
    const check = Validater.validateClassroom(this.state);
    if (!check.success) {
      alert(check.mess);
      return;
    }
    this.setState({
      isLoading: true
    });
    const {
      id, school, subject, subject_code, 
      class_name, class_subject, estimated_students,
      start_date, finish_date, examination_date,
      teacher, assistant, change_note, supporter,
    } = this.state;
    ApiClient.saveData(API.CLASSROOMS, {
      id, school, subject, subject_code, 
      class_name, class_subject, estimated_students,
      start_date, finish_date, examination_date,
      teacher, assistant, change_note, supporter,
    })
    .then(res => {
      if (res.id) {
        this.props.updateRawData(res, actionsTypes.CLASSROOM.UPDATE_RAW_DATA);
        this.props.processRawData(actionsTypes.CLASSROOM.PROCESS_RAW_DATA);
        this.props.set(true, actionsTypes.CLASSROOM.SET_FETCHING);
        this.props.set(false, actionsTypes.CLASSROOM.SET_FETCHING);    
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
    this.setState(this.props.classroom.selected);
  };

  render = () => {
    const {
      school, subject, subject_code, 
      class_name, class_subject, estimated_students,
      start_date, finish_date, examination_date,
      teacher, assistant, change_note, supporter,
      dateFormat, timeFormat, closeOnSelect, isLoading
    } = this.state;
    return (
      <Modal show={this.props.classroom.showModalEdit} onHide={() => this.clickClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa lớp</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormGroup> {/* Trường */}
            <ControlLabel>Trường</ControlLabel>
            <FormControl 
              id="school"
              type="text"
              label="Text"
              value={school}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Tên môn */}
            <ControlLabel>Tên môn</ControlLabel>
            <FormControl 
              id="subject"
              type="text"
              label="Text"
              value={subject}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Mã môn */}
            <ControlLabel>Mã môn</ControlLabel>
            <FormControl 
              id="subject_code"
              type="text"
              label="Text"
              value={subject_code}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Tên lớp */}
            <ControlLabel>Tên lớp</ControlLabel>
            <FormControl 
              id="class_name"
              type="text"
              label="Text"
              value={class_name}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* Lớp môn */}
            <ControlLabel>Lớp môn</ControlLabel>
            <FormControl
              id="class_subject"
              type="text"
              label="Text"
              value={class_subject}
              onChange={event => this.onChange(event)}
            />
          </FormGroup>
          <FormGroup> {/* SL học viên */}
            <ControlLabel>SL học viên</ControlLabel>
            <FormControl 
              id="estimated_students"
              type="number"
              label="Text"
              value={estimated_students}
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
              value={new Date(start_date)}
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
              value={new Date(finish_date)}
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
              value={new Date(examination_date)}
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
              value={teacher || ''}
            >
              <option hidden>Chọn GVCM</option>
              {
                this.props.teacher.allItems.map((tc) => (
                  <option key={tc.id} value={tc.topica_email}>
                    {tc.name}
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
              value={assistant || ''}
            >
              <option hidden>Chọn GVHD</option>
              {
                this.props.assistant.allItems.map((as) => (
                  <option key={as.id} value={as.topica_email}>
                    {as.name}
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
              placeholder="textarea" 
              value={change_note}
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
  updateRawData: actions.updateRawData,
  processRawData: actions.processRawData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalEdit);
