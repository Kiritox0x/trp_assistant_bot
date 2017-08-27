import React, { Component } from 'react';
import { 
  Col, Row
} from 'react-bootstrap';
import { Icon } from 'react-fa';

export default class BoardHeader extends Component {
  render = () => {
    const { number, text, icon } = this.props;
    return (
      <Row>
        <Col xs={3}><Icon name={icon} size="5x" /></Col>
        <Col xs={9} className="text-right">
          <div className="huge">{number}</div>
          <div>{text}</div>
        </Col>
      </Row>
    );
  };
}
