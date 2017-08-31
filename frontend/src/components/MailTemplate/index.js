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
import * as constants from '../../config/constant';

import ModalAdd from './ModalAdd';
import ModalEdit from './ModalEdit';
import ModalDelete from './ModalDelete';
import ModalPreview from './ModalPreview';

const header = [
  { title: 'Tên mẫu mail', prop: 'name', sortable: true },
  { title: 'Tiêu đề', prop: 'title', sortable: true },
  { title: '', prop: 'preview', sortable: false },
  { title: '', prop: 'edit', sortable: false },
  { title: '', prop: 'delete', sortable: false },
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
    this.props.toggleModal(true, actionsTypes.MAILTEMPLATE.TOGGLE_MODAL_ADD);
  };

  clickRefresh = () => {
    ApiClient.getData(API.MAILTEMPLATES, actionsTypes.MAILTEMPLATE, constants.HAS_PREVIEW);
  };

  search = (event) => {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord.length === 0) {
      return this.setState({
        filtered: this.props.mailtemplate.allItems,
        searching: false,
        keyWord
      });
    }
    this.setState({
      filtered: this.props.mailtemplate.allItems.filter((mailtemplate) => {
        return Object.values(mailtemplate).join('//').toLowerCase().indexOf(keyWord) > -1;
      }),
      searching: true,
      keyWord
    });
  };

  componentWillReceiveProps = () => {
    if (!this.state.keyWord || this.props.mailtemplate.isFetching) {
      this.setState({
        filtered: this.props.mailtemplate.allItems
      });
    }
  };

  componentDidMount = () => {
    document.title = "Mail template";
    this.setState({
      filtered: [...this.props.mailtemplate.allItems]
    });
  }

  render = () => {
    const body = [...this.state.filtered];
    const { searching, keyWord } = this.state;
    const { isFetching } = this.props.mailtemplate;
    return (
      isFetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div className="main-content">
        <Col md={8} mdOffset={2} sm={10} smOffset={1}>
          <h2 className="text-center">Quản lý mẫu mail</h2>
          <ModalAdd />
          <ModalEdit />
          <ModalDelete />
          <ModalPreview />
          <Button bsStyle="success" onClick={() => this.clickAdd()}>
            <Glyphicon glyph="plus" /> Thêm mẫu mail mới
          </Button>
          <Button bsStyle="primary" onClick={() => this.clickRefresh()}>
            <Glyphicon glyph="refresh" /> Cập nhật dữ liệu
          </Button>
          <br /><br />
          <FormGroup>
            <ControlLabel>Tìm kiếm: { searching ? `Có ${body.length} kết quả cho từ khóa "${keyWord}"` : null }</ControlLabel>
            <FormControl 
              id="txtSearch"
              type="text"
              label="Text"
              placeholder="Từ khóa"
              value={keyWord}
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
  mailtemplate: state.mailtemplate,
});

const mapDispatchToProps = {
  select: actions.select,
  toggleModal: actions.toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supporter);
