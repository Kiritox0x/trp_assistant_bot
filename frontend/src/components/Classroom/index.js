import React, { Component } from 'react';
import { 
  Col, Row, Button, Table, Glyphicon,
  Modal, ControlLabel, FormGroup, FormControl
} from 'react-bootstrap';
import { connect } from 'react-redux';
// import $ from 'jquery';
import Datatable from 'react-bs-datatable';
import store from '../../store';
import ModalDelete from './ModalDelete';
import ModalEdit from './ModalEdit';
import { toggleModalEdit, select, 
  toggleModalDelete 
} from '../../actions';
import * as actionsType from '../../actions/types';

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
      body: [
        { 
          id: 1,
          edit: <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.clickEdit(0)}>
          <span className="glyphicon glyphicon-pencil"></span>
        </Button>,
          delete: <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.clickDelete(0)}>
          <span className="glyphicon glyphicon-trash"></span>
        </Button>,
          school: 'school1', 
          subject: 'subject1', 
          subject_code: 'subject_code1', 
          class_name: 'class_name1',
          class_subject: 'class_subject1',
          estimated_students: 100,
          start_date: '08/22/2017',
          finish_date: '11/11/2017',
          examination_date: '11/10/2017',
          teacher: 'teacher1',
          assistant: 'assistant1',
          change_note: 'change_note1',
          supporter: 'supporter1'
        },
        { 
          id: 2,
          edit: <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.clickEdit(1)}>
          <span className="glyphicon glyphicon-pencil"></span>
        </Button>,
          delete: <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.clickDelete(1)}>
          <span className="glyphicon glyphicon-trash"></span>
        </Button>,
          school:'school2', 
          subject: 'subject2', 
          subject_code: 'subject_code2', 
          class_name: 'class_name2',
          class_subject: 'class_subject2',
          estimated_students: 100,
          start_date: '08/22/2017',
          finish_date: '11/11/2017',
          examination_date: '10/13/2017',
          teacher: 'teacher2',
          assistant: 'assistant2',
          change_note: 'change_note2',
          supporter: 'supporter2'
        },
        { 
          id: 3,
          edit: <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.clickEdit(2)}>
          <span className="glyphicon glyphicon-pencil"></span>
        </Button>,
          delete: <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.clickDelete(2)}>
          <span className="glyphicon glyphicon-trash"></span>
        </Button>,
          school:'school3', 
          subject: 'subject3', 
          subject_code: 'subject_code3', 
          class_name: 'class_name3',
          class_subject: 'class_subject3',
          estimated_students: 100,
          start_date: '08/22/2017',
          finish_date: '11/11/2017',
          examination_date: '10/13/2017',
          teacher: 'teacher3',
          assistant: 'assistant3',
          change_note: 'change_note3',
          supporter: 'supporter3'
        },
        { 
          id: 4,
          edit: <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.clickEdit(3)}>
          <span className="glyphicon glyphicon-pencil"></span>
        </Button>,
          delete: <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.clickDelete(3)}>
          <span className="glyphicon glyphicon-trash"></span>
        </Button>,
          school:'school4', 
          subject: 'subject4', 
          subject_code: 'subject_code4', 
          class_name: 'class_name4',
          class_subject: 'class_subject4class_subject4class_subject4',
          estimated_students: 100,
          start_date: '08/22/2017',
          finish_date: '11/11/2017',
          examination_date: '10/13/2017',
          teacher: 'teacher4',
          assistant: 'assistant4',
          change_note: 'change_note4',
          supporter: 'supporter4'
        },
        { 
          id: 5,
          edit: <Button bsStyle="primary" bsSize="xsmall" onClick={() => this.clickEdit(4)}>
          <span className="glyphicon glyphicon-pencil"></span>
        </Button>,
          delete: <Button bsStyle="danger" bsSize="xsmall" onClick={() => this.clickDelete(4)}>
          <span className="glyphicon glyphicon-trash"></span>
        </Button>,
          school:'school5', 
          subject: 'subject5', 
          subject_code: 'subject_code5', 
          class_name: 'class_name5',
          class_subject: 'class_subject5',
          estimated_students: 100,
          start_date: '08/22/2017',
          finish_date: '11/11/2017',
          examination_date: '10/13/2017',
          teacher: 'teacher5',
          assistant: 'assistant5',
          change_note: 'change_note5',
          supporter: 'supporter5'
        }
      ],
      filtered: []
    };
  }

  clickEdit(index) {
    // alert('clicked');
    this.props.select(this.state.body[index], actionsType.SELECT_CLASSROOM);
    setTimeout(() => {this.props.toggleModalEdit(true, actionsType.TOGGLE_MODAL_EDIT_CLASSROOM);}, 1);
  }

  clickDelete(index) {
    this.props.select(this.state.body[index], actionsType.SELECT_CLASSROOM);
    setTimeout(() => {this.props.toggleModalDelete(true, actionsType.TOGGLE_MODAL_DELETE_CLASSROOM);}, 1);
  }

  search(event) {
    const keyWord = event.target.value;
    if (keyWord.length === 0) {
      return this.setState({
        filtered: this.state.body
      });
    }
    this.setState({
      filtered: this.state.body.filter((classroom) => {
        // console.log(Object.values(classroom));
        return Object.values(classroom).join('//').indexOf(keyWord) > -1;
      })
    })
  }

  componentDidMount() {
    this.setState({
      filtered: [...this.state.body]
    });
  }

  render() {  
    const body = [...this.state.filtered];
    return (
      <div className="classroom">
        <ModalDelete />
        <ModalEdit />
        <Button bsStyle="success"><Glyphicon glyph="plus" /> Thêm lớp học mới</Button>
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
  classroom: state.classroom,
});

const mapDispatchToProps = {
  toggleModalEdit,
  select,
  toggleModalDelete
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Classroom);
