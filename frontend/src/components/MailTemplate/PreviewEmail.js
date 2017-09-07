import React, { Component } from 'react';

export default class PreviewEmail extends Component {

  componentDidMount = () => {
    console.log(this.props.params);
  }

  render = () => {
    return (
      <h1>PreviewEmail Page</h1>
    );
  }
}
