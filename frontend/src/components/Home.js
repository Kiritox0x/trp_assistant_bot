import React, { Component } from 'react';
import { 
  Col, Row, Button
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Home extends Component {

  static isPrivate = true;

  render() {
    return (
      <div>
        <Col md={3} sm={3} xs={6}><Row><Link to="/classroom" className="btn btn-primary btn-block">Classroom</Link></Row></Col>
        <Col md={3} sm={3} xs={6}><Row><Link to="/teacher" className="btn btn-success btn-block">Teacher</Link></Row></Col>
      </div>
    );
  }

}
