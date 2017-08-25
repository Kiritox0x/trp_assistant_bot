import React, { Component } from 'react';
import { 
  Col, Row, Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {

  static isPrivate = true;

  componentDidMount() {
    document.title = "Home";
  }

  render() {
    return (

      <div>
        {/* <Col md={3} sm={3} xs={6}><Link to="/classroom" className="btn btn-primary btn-block btn-huge">Classroom</Link></Col>
        <Col md={3} sm={3} xs={6}><Link to="/teacher" className="btn btn-success btn-block btn-huge">Teacher</Link></Col>
        <Col md={3} sm={3} xs={6}><Link to="/assistant" className="btn btn-info btn-block btn-huge">Assistant</Link></Col> */}
        Đây là bảng điều khiển chính
      </div>
    );
  }

}
