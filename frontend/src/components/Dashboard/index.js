import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Col, Row, Button
} from 'react-bootstrap';
import {
  LinkContainer
} from 'react-router-bootstrap';
import { Icon } from 'react-fa';

class Home extends Component {

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
          <Col md={12} sm={12} xs={12}>
            <Col xs={6} sm={3}>
              <LinkContainer to="/manage">
                <Button bsStyle="primary" block>Quản lý</Button>
              </LinkContainer>
            </Col>
            <Col xs={6} sm={3}>
              <LinkContainer to="/comingsoon">
                <Button bsStyle="success" block>Xuất báo cáo</Button>
              </LinkContainer>
            </Col>
            <Col xs={6} sm={3}>
              <LinkContainer to="/comingsoon">
                <Button bsStyle="info" block>Thông báo</Button>
              </LinkContainer>
            </Col>
            <Col xs={6} sm={3}>
              <LinkContainer to="/comingsoon">
                <Button block>Hướng dẫn</Button>
              </LinkContainer>
            </Col>
          </Col>
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

