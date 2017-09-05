import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Col, Button, Glyphicon,
  FormGroup, ControlLabel, FormControl
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
  { title: 'Tài khoản', prop: 'account', sortable: true },
  { title: 'Email', prop: 'email', sortable: true },
];

class Supporter extends Component {

  static isPrivate = true; 

  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
  }

  clickAdd = () => {
    this.props.toggleModal(true, actionsTypes.SUPPORTER.TOGGLE_MODAL_ADD);
  }

  clickRefresh = () => {
    ApiClient.getData(API.SUPPORTERS, actionsTypes.SUPPORTER);
  };

  search = (event) => {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord.length === 0) {
      return this.setState({
        filtered: this.props.supporter.allItems,
        searching: false,
        keyWord
      });
    }
    this.setState({
      filtered: this.props.supporter.allItems.filter((supporter) => {
        return Object.values(supporter).join('//').toLowerCase().indexOf(keyWord) > -1;
      }),
      searching: true,
      keyWord
    });
  }

  componentWillReceiveProps = () => {
    if (!this.state.keyWord || this.props.supporter.isFetching) {
      this.setState({
        filtered: this.props.supporter.allItems,
        keyWord: '',
        searching: false
      });
    }
  };

  componentDidMount= () => {
    document.title = "Trợ giảng";
    this.setState({
      filtered: [...this.props.supporter.allItems]
    });
  }

  render = () => {  
    const body = [...this.state.filtered];
    const { searching, keyWord } = this.state;
    const { isFetching } = this.props.supporter;
    return (
      isFetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div className="main-content">
        <Col md={10} mdOffset={1}>
          <h2 className="text-center">Quản lý trợ giảng</h2>
          <ModalAdd />
          <ModalEdit />
          <ModalDelete />
          <Button bsStyle="success" onClick={() => this.clickAdd()}>
            <Glyphicon glyph="plus" /> Thêm trợ giảng mới
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
        </Col>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  supporter: state.supporter,
});

const mapDispatchToProps = {
  toggleModal: actions.toggleModal,
  select: actions.select
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supporter);
