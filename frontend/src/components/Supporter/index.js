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
    // this.props.toggleModal(true, actionsType.TOGGLE_MODAL_ADD_SUPPORTER);
  }

  search = (event) => {
    const keyWord = event.target.value.toLowerCase();
    if (keyWord.length === 0) {
      return this.setState({
        filtered: this.props.supporter.allItems
      });
    }
    this.setState({
      filtered: this.state.body.filter((supporter) => {
        return Object.values(supporter).join('//').toLowerCase().indexOf(keyWord) > -1;
      })
    });
  }

  componentWillReceiveProps = () => {
    this.setState({
      filtered: this.props.supporter.allItems
    });
  };

  componentDidMount= () => {
    document.title = "Supporter";
    this.setState({
      filtered: [...this.props.supporter.allItems]
    });
  }

  render = () => {  
    const body = [...this.state.filtered];
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
        </Col>
      </div>
    );
  }

}

const mapStateToProps = (state, ownProps) => ({
  supporter: state.supporter,
});

const mapDispatchToProps = {
  toggleModal,
  select
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Supporter);
