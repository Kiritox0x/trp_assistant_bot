import React, { Component } from 'react';
import { connect } from 'react-redux';

import { 
  FormGroup, Button, Glyphicon,
  ControlLabel, FormControl
} from 'react-bootstrap';
import Datatable from 'react-bs-datatable';
import { Icon } from 'react-fa';

import * as actions from '../../actions';
import * as actionsTypes from '../../actions/types';

import * as API from '../../config/Api';
import * as ApiClient from '../../util/ApiClient';

import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';

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

class Assistant extends Component {

  static isPrivate = true; 

  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
  }

  clickAdd = () => {
    this.props.toggleModal(true, actionsTypes.ASSISTANT.TOGGLE_MODAL_ADD);
  };

  clickRefresh = () => {
    ApiClient.getData(API.ASSISTANTS, actionsTypes.ASSISTANT);
  };

  search = (event) => {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord.length === 0) {
      return this.setState({
        filtered: this.props.assistant.allItems,
        searching: false,
        keyWord
      });
    }
    this.setState({
      filtered: this.props.assistant.allItems.filter((assistant) => {
        return Object.values(assistant).join('//').toLowerCase().indexOf(keyWord) > -1;
      }),
      searching: true,
      keyWord
    });
  };

  componentWillReceiveProps = () => {
    if (!this.state.keyWord) {
      this.setState({
        filtered: this.props.assistant.allItems
      });
    }
  };

  componentDidMount = () => {
    document.title = "Assistant";
    this.setState({
      filtered: [...this.props.assistant.allItems]
    });
  };

  render = () => {  
    const body = [...this.state.filtered];
    const { searching, keyWord } = this.state;
    const { isFetching } = this.props.assistant;
    return (
      isFetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div className="main-content">
        <h2 className="text-center">Quản lý GVHD</h2>
        <ModalAdd />
        <ModalEdit />
        <ModalDelete />
        <Button bsStyle="success" onClick={() => this.clickAdd()}>
          <Glyphicon glyph="plus" /> Thêm GVHD mới
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
  assistant: state.assistant,
});

const mapDispatchToProps = {
  select: actions.select,
  toggleModal: actions.toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Assistant);
