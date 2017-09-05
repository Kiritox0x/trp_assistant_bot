import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  FormGroup,
  ControlLabel, FormControl, Button, Glyphicon,
} from 'react-bootstrap';
import Datatable from 'react-bs-datatable';
import { Icon } from 'react-fa';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';
import * as API from '../../config/Api';
import * as ApiClient from '../../util/ApiClient';
import * as constants from '../../config/constant';

import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import ModalSendmail from './ModalSendmail';

const header = [
  { title: 'Gửi mail', prop: 'sendmail', sortable: false },
  { title: 'Sửa', prop: 'edit', sortable: false },
  { title: 'Xóa', prop: 'delete', sortable: false },
  { title: 'Trường', prop: 'school', sortable: true },
  { title: 'Tên môn', prop: 'subject', sortable: true },
  { title: 'Mã môn', prop: 'subject_code', sortable: true },
  { title: 'Tên lớp', prop: 'class_name', sortable: true },
  { title: 'Lớp môn', prop: 'class_subject', sortable: true },
  { title: 'SL học viên dự kiến', prop: 'estimated_students', sortable: true },
  { title: 'Ngày bắt đầu KH(D)', prop: 'start_date', sortable: true },
  { title: 'Ngày kết thúc online(E)', prop: 'finish_date', sortable: true },
  { title: 'Ngày thi(F)', prop: 'examination_date', sortable: true },
  { title: 'GVCM', prop: 'teacher', sortable: true },
  { title: 'GVHD', prop: 'assistant', sortable: true },
  { title: 'VHTT thay đổi ', prop: 'change_note', sortable: true },
  { title: 'Trợ giảng', prop: 'supporter', sortable: true },
];

class Classroom extends Component {

  static isPrivate = true; 

  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
  }

  clickAdd = () => {
    this.props.toggleModal(true, actionsTypes.CLASSROOM.TOGGLE_MODAL_ADD);
  }

  clickRefresh = () => {
    ApiClient.getData(API.CLASSROOMS, actionsTypes.CLASSROOM, constants.HAS_SEND_MAIL);
  };

  search = (event) => {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord.length === 0) {
      return this.setState({
        filtered: this.props.classroom.allItems,
        searching: false,
        keyWord
      });
    }
    this.setState({
      filtered: this.props.classroom.allItems.filter((classroom) => {
        return Object.values(classroom).join('//').toLowerCase().indexOf(keyWord) > -1;
      }),
      searching: true,
      keyWord
    });
  };

  componentWillReceiveProps = () => {
    if (!this.state.keyWord || this.props.classroom.isFetching) {
      this.setState({
        filtered: this.props.classroom.allItems,
        keyWord: '',
        searching: false
      });
    }
  };

  componentDidMount = () => {
    document.title = "Lớp học";
    this.setState({
      filtered: [...this.props.classroom.allItems]
    });
  };

  render = () => {  
    const body = [...this.state.filtered];
    const { searching, keyWord } = this.state;
    const { isFetching } = this.props.classroom;
    return (
      isFetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div className="main-content">
        <h2 className="text-center">Quản lý lớp học</h2>
        <ModalAdd />
        <ModalEdit />
        <ModalDelete />
        <ModalSendmail />
        <Button bsStyle="success" onClick={() => this.clickAdd()}>
          <Glyphicon glyph="plus" /> Thêm lớp học mới
        </Button>
        <Button bsStyle="primary" onClick={() => this.clickRefresh()}>
          <Glyphicon glyph="refresh" /> Cập nhật dữ liệu
        </Button>
        <br /><br />
        <FormGroup>    
          <ControlLabel>
            Tìm kiếm: { searching ? `Có ${body.length} kết quả cho từ khóa "${keyWord}"` : null }
          </ControlLabel>
          <FormControl 
            id="txtSearch"
            type="text"
            label="Text"
            placeholder="Từ khóa"
            onChange={event => this.search(event)}
          />
        </FormGroup>
        <Datatable
          tableHeader={header}
          tableBody={body}
          keyName="userTable"
          tableClass="striped bordered hover responsive"
          rowsPerPage={10}
          rowsPerPageOption={[5, 10, 15, 20, 50, 100]}
        />
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  classroom: state.classroom,
});

const mapDispatchToProps = {
  select: actions.select,
  toggleModal: actions.toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom);
