import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  Col, Row
} from 'react-bootstrap';
import { Icon } from 'react-fa';

class Profile extends Component {

  static isPrivate = true;

  constructor(props) {
    super(props);
    this.state = {
      fetching: false
    }
  }

  componentDidMount = () => {
    document.title = "Trang cá nhân";
  };

  render = () => {
    const { fetching } = this.state;
    return (
      fetching ? <Icon spin={true} name="circle-o-notch" size="5x" /> :
      <div>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <h1>Trang cá nhân</h1>
            <hr />
          </Col>
        </Row>
        <Row>
          <Col md={12} sm={12} xs={12}>
            <h2>Đây là trang cá nhân</h2>
          </Col>
        </Row>
      </div>
    );
  };
}

const mapStateToProps = (state, ownProps) => ({

});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

