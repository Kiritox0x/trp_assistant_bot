import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  Col, Row, Modal, Table, FormGroup,
  ControlLabel, FormControl, Button, Glyphicon,
} from 'react-bootstrap';
import Datatable from 'react-bs-datatable';
import { Icon } from 'react-fa';

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
  { title: 'Email', prop: 'email', sortable: true },
];

class Supporter extends Component {

  static isPrivate = true; 

  constructor(props) {
    super(props);
    this.state = {
      body: [],
      filtered: [],
      fetching: true
    };
  }

  clickAdd() {
    this.props.toggleModal(true, actionsType.TOGGLE_MODAL_ADD_SUPPORTER);
  }

  clickEdit(index) {
    // alert('clicked');
    this.props.select(this.state.body[index], actionsType.SELECT_SUPPORTER);
    setTimeout(() => {this.props.toggleModal(true, actionsType.TOGGLE_MODAL_EDIT_SUPPORTER);}, 1);
  }

  clickDelete(index) {
    this.props.select(this.state.body[index], actionsType.SELECT_SUPPORTER);
    setTimeout(() => {this.props.toggleModal(true, actionsType.TOGGLE_MODAL_DELETE_SUPPORTER);}, 1);
  }

  search = (event) => {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord.length === 0) {
      return this.setState({
        filtered: this.state.body
      });
    }
    this.setState({
      filtered: this.state.body.filter((supporter) => {
        return Object.values(supporter).join('//').toLowerCase().indexOf(keyWord) > -1;
      })
    });
  }

  componentDidMount() {
    document.title = "Supporter";
    getList(API.SUPPORTERS)
    .then((data) => {
      let index = 0;
      const body = data.map((supporter) => {
        return {
          ...supporter,
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
    
  }

  render() {  
    const body = [...this.state.filtered];
    const { fetching } = this.state;
    return (
      fetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div className="main-content">
        <h2 className="text-center">Quản lý GVCM</h2>
        <ModalAdd />
        <ModalEdit />
        <ModalDelete />
        <Button bsStyle="success" onClick={() => this.clickAdd()}>
          <Glyphicon glyph="plus" /> Thêm trợ giảng mới
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
)(Supporter);
