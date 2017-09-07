import React, { Component } from 'react';
import { 
  Col, Row
} from 'react-bootstrap';
import { Icon } from 'react-fa';

export default class BoardHeader extends Component {
  render = () => {
    const { data, text, icon } = this.props;
    return (
      <Row>
        <Col xs={3}><Icon name={icon} size="5x" /></Col>
        <Col xs={9} className="text-right">
          <div className="huge">
            { data.isFetching ? <Icon spin={true} name="circle-o-notch" /> : data.allItems.length }
          </div>
          <div>{text}</div>
        </Col>
      </Row>
    );
  };
}
