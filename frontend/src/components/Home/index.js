import React, { Component } from 'react';
import { 
  Col, Row
} from 'react-bootstrap';
import { Icon } from 'react-fa';

import Board from './Board';

export default class Home extends Component {

  static isPrivate = true;

  constructor(props) {
    super(props);
    this.state = {
      fetching: false
    }
  }

  componentDidMount = () => {
    document.title = "Bảng điều khiển";
  };

  render = () => {
    const { fetching } = this.state;
    return (
      fetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <h1>Bảng điều khiển</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Board // eslint-disable-next-line
            style={"primary"}
            icon="graduation-cap" 
            number={1000} 
            text="Lớp học" 
            link="/classroom"
          />
          <Board // eslint-disable-next-line
            style={"success"}
            icon="user-circle" 
            number={1000} 
            text="GV chuyên môn" 
            link="/teacher"
          />
          <Board // eslint-disable-next-line
            style={"warning"} 
            icon="user-o" 
            number={1000} 
            text="GV hướng dẫn" 
            link="/assistant"
          />
          <Board // eslint-disable-next-line
            style={"danger"} 
            icon="support" 
            number={1000} 
            text="Trợ giảng" 
            link="/supporter"
          />
        </Row>
      </div>
    );
  };
}
