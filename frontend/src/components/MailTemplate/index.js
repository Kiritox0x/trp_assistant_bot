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
import ModalPreview from './ModalPreview';
import { 
  toggleModal, select 
} from '../../actions';
import * as actionsType from '../../actions/types';

import { getData } from '../../util/ApiClient';
import * as API from '../../config/Api';

const header = [
  { title: 'Tên mẫu mail', prop: 'title', sortable: true },
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
    this.props.toggleModal(true, actionsType.MAILTEMPLATE.TOGGLE_MODAL_ADD);
  };

  clickRefresh = () => {
    getData(API.MAILTEMPLATES, actionsType.MAILTEMPLATE, true);
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
    this.setState({
      filtered: this.props.mailtemplate.allItems
    });
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
        </Col>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  mailtemplate: state.mailtemplate,
});

const mapDispatchToProps = {
  toggleModal,
  select
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supporter);
