import React, { Component } from 'react';
import { 
  Grid, Col, Row, Button, Panel
} from 'react-bootstrap';
import { Icon } from 'react-fa';
import { Link } from 'react-router-dom';

import Board from './Board';

export default class Home extends Component {

  static isPrivate = true;

  constructor(props) {
    super(props);
    this.state = {
      fetching: true
    }
  }

  componentDidMount() {
    document.title = "Bảng điều khiển";
  }

  render() {
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
          <Board 
            style="primary" 
            icon="graduation-cap" 
            number={1000} 
            text="Lớp học" 
            link="/classroom"
          />
          <Board 
            style="success" 
            icon="user-circle" 
            number={1000} 
            text="GV chuyên môn" 
            link="/teacher"
          />
          <Board 
            style="warning" 
            icon="user-o" 
            number={1000} 
            text="GV hướng dẫn" 
            link="/assistant"
          />
          <Board 
            style="danger" 
            icon="support" 
            number={1000} 
            text="Trợ giảng" 
            link="/supporter"
          />
        </Row>
      </div>
    );
  }

}
