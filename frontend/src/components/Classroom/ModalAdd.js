import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Button,
  FormGroup, ControlLabel, FormControl
} from 'react-bootstrap';
import Datetime from 'react-datetime';

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

  onChangeDate = (event, id) => {
    this.setState({
      [id]: event.toDate()
    });
  };

  clickClose = () => {
    this.props.toggleModal(false, actionsType.CLASSROOM.TOGGLE_MODAL_ADD);
  };

  render = () => {
    const {
      school, subject, subject_code, 
      class_name, class_subject, estimated_students,
      start_date, finish_date, examination_date,
      teacher, assistant, change_note, supporter,
      dateFormat, timeFormat
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
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <FormGroup> {/* Tên môn */}
            <ControlLabel>Tên môn</ControlLabel>
            <FormControl 
              id="subject"
              type="text"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <FormGroup> {/* Mã môn */}
            <ControlLabel>Mã môn</ControlLabel>
            <FormControl 
              id="subject_code"
              type="text"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <FormGroup> {/* Tên lớp */}
            <ControlLabel>Tên lớp</ControlLabel>
            <FormControl 
              id="class_name"
              type="text"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <FormGroup> {/* Lớp môn */}
            <ControlLabel>Lớp môn</ControlLabel>
            <FormControl
              id="class_subject"
              type="text"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <FormGroup> {/* SL học viên */}
            <ControlLabel>SL học viên</ControlLabel>
            <FormControl 
              id="estimated_students"
              type="number"
              label="Text"
              onChange={(event) => { this.onChange(event);}}
            />
          </FormGroup>
          <FormGroup> {/* Ngày bắt đầu */}
            <ControlLabel>Ngày bắt đầu</ControlLabel>
            <Datetime 
              id="start_date"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              onChange={(event) => { this.onChangeDate(event, 'start_date');}}
            />
          </FormGroup>
          <FormGroup> {/* Ngày kết thúc */}
            <ControlLabel>Ngày kết thúc</ControlLabel>
            <Datetime 
              id="finish_date"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              onChange={(event) => { this.onChangeDate(event, 'finish_date');}}
            />
          </FormGroup>
          <FormGroup> {/* Ngày thi */}
            <ControlLabel>Ngày thi</ControlLabel>
            <Datetime 
              id="examination_date"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              onChange={(event) => { this.onChangeDate(event, 'examination_date');}}
            />
          </FormGroup>
          <FormGroup> {/* GVCM */}
            <ControlLabel>GVCM</ControlLabel>
            <FormControl 
              id="teacher"
              componentClass="select" 
              placeholder="GVCM"
              onChange={(event) => { this.onChange(event)}}
            >
              <option value={teacher}>{teacher}</option>
              <option value={teacher}>{teacher}1</option>
              <option value={teacher}>{teacher}2</option>
              <option value={teacher}>{teacher}3</option>
            </FormControl>
          </FormGroup>
          <FormGroup> {/* GVHD */}
            <ControlLabel>GVHD</ControlLabel>
            <FormControl 
              id="assistant"
              componentClass="select" 
              placeholder="GVHD"
              onChange={(event) => { this.onChange(event)}}
            >
              <option value={assistant}>{assistant}</option>
              <option value={assistant}>{assistant}1</option>
              <option value={assistant}>{assistant}2</option>
              <option value={assistant}>{assistant}3</option>
            </FormControl>
          </FormGroup>
          <FormGroup> {/* VHTT thay đổi */}
            <ControlLabel>VHTT thay đổi</ControlLabel>
            <FormControl 
              id="change_note"
              componentClass="textarea" 
              placeholder="textarea"
              onChange={(event) => { this.onChange(event)}}
            />
          </FormGroup>
          <FormGroup> {/* Trợ giảng */}
            <ControlLabel>Trợ giảng</ControlLabel>
            <FormControl 
              id="supporter"
              componentClass="select" 
              placeholder="Trợ giảng"
              onChange={(event) => { this.onChange(event)}}
            >
              <option value={supporter}>{supporter}</option>
              <option value={supporter}>{supporter}1</option>
              <option value={supporter}>{supporter}2</option>
              <option value={supporter}>{supporter}3</option>
            </FormControl>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary">Lưu lại</Button>
          <Button onClick={() => this.clickClose()}>Đóng</Button>
        </Modal.Footer>
      </Modal>
    );
  };
}


const mapStateToProps = (state, ownProps) => ({
  classroom: state.classroom,
});

const mapDispatchToProps = {
  toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
