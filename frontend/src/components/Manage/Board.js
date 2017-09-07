import React, { Component } from 'react';
import { 
  Col, Panel, Glyphicon
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BoardHeader from './BoardHeader';

export default class Board extends Component {
  render = () => {
    const { style, link } = this.props;
    return (
      <Col md={3} xs={6}>
        <Panel 
          header={
            <BoardHeader {...this.props} />
          } 
          bsStyle={style || "primary"}
        >
          <Link to={link || "/"}>
            <span className="pull-left">Chi tiết</span>
            <Glyphicon glyph="circle-arrow-right" className="pull-right" />
          </Link>
        </Panel>
      </Col>
    );
  };
}
