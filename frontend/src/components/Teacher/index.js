import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  Col, Row, Modal, Table, FormGroup,
  ControlLabel, FormControl, Button, Glyphicon,
} from 'react-bootstrap';
import Datatable from 'react-bs-datatable';

import store from '../../store';

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
  { title: 'Tên', prop: 'name', sortable: true },
  { title: 'Mã', prop: 'code', sortable: true },
  { title: 'Email Topica', prop: 'topica_email', sortable: true },
  { title: 'Email cá nhân', prop: 'personal_email', sortable: true },
  { title: 'Số điện thoại', prop: 'phone_number', sortable: true },
  { title: 'Trạng thái', prop: 'status', sortable: true },
  { title: 'Địa chỉ', prop: 'location', sortable: true },
  { title: 'Tài khoản', prop: 'account', sortable: true },
  { title: 'Ngày sinh', prop: 'date_of_birth', sortable: true },
  { title: 'Ghi chú', prop: 'note', sortable: true },
  { title: 'Trợ giảng', prop: 'supporter', sortable: true },
];

class Teacher extends Component {

  static isPrivate = true; 

  constructor(props) {
    super(props);
    this.state = {
      body: [],
      filtered: []
    };
  }

  clickAdd() {
    this.props.toggleModal(true, actionsType.TOGGLE_MODAL_ADD_TEACHER);
  }

  clickEdit(index) {
    // alert('clicked');
    this.props.select(this.state.body[index], actionsType.SELECT_TEACHER);
    setTimeout(() => {this.props.toggleModal(true, actionsType.TOGGLE_MODAL_EDIT_TEACHER);}, 1);
  }

  clickDelete(index) {
    this.props.select(this.state.body[index], actionsType.SELECT_TEACHER);
    setTimeout(() => {this.props.toggleModal(true, actionsType.TOGGLE_MODAL_DELETE_TEACHER);}, 1);
  }

  search = (event) => {
    const { timeoutSearch } = this.state;
    const value = event.target.value;
    console.log(timeoutSearch);
    if (timeoutSearch) {
      clearTimeout(timeoutSearch);
    }
    this.setState({
      timeoutSearch: setTimeout(() => {
        const keyWord = value;
        if (keyWord.length === 0) {
          return this.setState({
            filtered: this.state.body
          });
        }
        this.setState({
          filtered: this.state.body.filter((teacher) => {
            // console.log(Object.values(teacher));
            return Object.values(teacher).join('//').indexOf(keyWord) > -1;
          })
        })
      }, 500)
    });
  }

  componentDidMount() {
    document.title = "Teacher";
    getList(API.TEACHERS)
    .then((data) => {
      console.log(data);
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
        filtered: [...body]
      });
    })
    .catch(error => console.log(error));
    
  }

  render() {  
    const body = [...this.state.filtered];
    return (
      <div className="main-content">
        <h2 className="text-center">Quản lý GVCM</h2>
        <ModalAdd />
        <ModalEdit />
        <ModalDelete />
        <Button bsStyle="success" onClick={() => this.clickAdd()}>
          <Glyphicon glyph="plus" /> Thêm GVCM mới
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
          rowsPerPage={20}
          rowsPerPageOption={[5, 10, 15, 20, 50, 100]}
        />
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  teacher: state.teacher,
});

const mapDispatchToProps = {
  toggleModal,
  select
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teacher);
