import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Col, Row
} from 'react-bootstrap';
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
          Đây là bảng điều khiển chính
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

