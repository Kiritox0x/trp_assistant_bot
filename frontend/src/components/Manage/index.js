import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Col, Row
} from 'react-bootstrap';
import { Icon } from 'react-fa';

import Board from './Board';

class Home extends Component {

  static isPrivate = true;

  constructor(props) {
    super(props);
    this.state = {
      fetching: false
    }
  }

  componentDidMount = () => {
    document.title = "Quản lý";
  };

  render = () => {
    const { fetching } = this.state;
    return (
      fetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div>
        <Row>
          <Col md={12} sm={12} xs={12}>
          <h1>Quản lý</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Board // eslint-disable-next-line
            style={"primary"}
            icon="graduation-cap" 
            data={this.props.classroom} 
            text="Lớp học" 
            link="/classroom"
          />
          <Board // eslint-disable-next-line
            style={"success"}
            icon="user-circle" 
            data={this.props.teacher} 
            text="GV chuyên môn" 
            link="/teacher"
          />
          <Board // eslint-disable-next-line
            style={"warning"} 
            icon="user-o" 
            data={this.props.assistant} 
            text="GV hướng dẫn" 
            link="/assistant"
          />
          <Board // eslint-disable-next-line
            style={"danger"} 
            icon="support" 
            data={this.props.supporter} 
            text="Trợ giảng" 
            link="/supporter"
          />
        </Row>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({
  assistant: state.assistant,
  classroom: state.classroom,
  supporter: state.supporter,
  teacher: state.teacher,
  mailtemplate: state.mailtemplate
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

