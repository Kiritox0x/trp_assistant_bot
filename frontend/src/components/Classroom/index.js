import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  FormGroup,
  ControlLabel, FormControl, Button, Glyphicon,
} from 'react-bootstrap';
import Datatable from 'react-bs-datatable';
import { Icon } from 'react-fa';

import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import { 
  toggleModal, select 
} from '../../actions';
import * as actionsType from '../../actions/types';

import { getList } from '../../util/ApiClient';
import * as API from '../../config/Api';

const header = [
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
      body: [],
      filtered: [],
      fetching: true
    };
  }

  selectIndex = (index) => {
    this.props.select(this.state.body[index], actionsType.SELECT_CLASSROOM);
  };
  clickAdd = () => {
    this.props.toggleModal(true, actionsType.TOGGLE_MODAL_ADD_CLASSROOM);
  }

  clickEdit = (index) => {
    this.selectIndex(index);
    setTimeout(() => {this.props.toggleModal(true, actionsType.TOGGLE_MODAL_EDIT_CLASSROOM);}, 1);
  };

  clickDelete = (index) => {
    this.selectIndex(index);
    setTimeout(() => {this.props.toggleModal(true, actionsType.TOGGLE_MODAL_DELETE_CLASSROOM);}, 1);
  }

  search = (event) => {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord.length === 0) {
      return this.setState({
        filtered: this.state.body
      });
    }
    this.setState({
      filtered: this.state.body.filter((classroom) => {
        return Object.values(classroom).join('//').toLowerCase().indexOf(keyWord) > -1;
      })
    });
  };

  componentDidMount = () => {
    document.title = "Classroom";
    getList(API.CLASSROOMS)
    .then((data) => {
      let index = 0;
      const body = data.map((teacher) => {
        return {
          ...teacher,
          edit: <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.clickEdit(index)}>
          <span className="glyphicon glyphicon-pencil"></span>
        </Button>,
          delete: <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.clickDelete(index++)}>
          <span className="glyphicon glyphicon-trash"></span></Button>
        }
      })
      this.setState({
        body,
        filtered: [...body],
        fetching: false
      });
    })
    .catch(error => console.log(error));
  };

  render = () => {  
    const body = [...this.state.filtered];
    const { fetching } = this.state;
    return (
      fetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div className="main-content">
        <h2 className="text-center">Quản lý lớp học</h2>
        <ModalAdd />
        <ModalEdit />
        <ModalDelete />
        <Button bsStyle="success" onClick={() => this.clickAdd()}>
          <Glyphicon glyph="plus" /> Thêm lớp học mới
        </Button>
        <br /><br />
        <FormGroup>    
          <ControlLabel>Tìm kiếm</ControlLabel>
          <FormControl 
            id="txtSearch"
            type="text"
            label="Text"
            placeholder="Từ khóa"
            onChange={(event) => { this.search(event);}}
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
  toggleModal,
  select
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom);
