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
      dateFormat: 'YYYY-MM-DD',
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
      [id]: event.toISOString().split('T')[0]
    });
  };

  clickClose = () => {
    this.props.toggleModal(false, actionsTypes.CLASSROOM.TOGGLE_MODAL_ADD);
  };

  render = () => {
    const {
      teacher, assistant, supporter,
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
              onChange={event => this.onChangeDate(event, 'start_date')}
            />
          </FormGroup>
          <FormGroup> {/* Ngày kết thúc */}
            <ControlLabel>Ngày kết thúc</ControlLabel>
            <Datetime 
              id="finish_date"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
              onChange={event => this.onChangeDate(event, 'finish_date')}
            />
          </FormGroup>
          <FormGroup> {/* Ngày thi */}
            <ControlLabel>Ngày thi</ControlLabel>
            <Datetime 
              id="examination_date"
              dateFormat={dateFormat}
              timeFormat={timeFormat}
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
              <option value={teacher}>{teacher}</option>
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
              <option value={assistant}>{assistant}</option>
            </FormControl>
          </FormGroup>
          <FormGroup> {/* VHTT thay đổi */}
            <ControlLabel>VHTT thay đổi</ControlLabel>
            <FormControl 
              id="change_note"
              componentClass="textarea" 
              placeholder="textarea"
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
              <option value={supporter}>{supporter}</option>
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
  toggleModal: actions.toggleModal,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalAdd);
