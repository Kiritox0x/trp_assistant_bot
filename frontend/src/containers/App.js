import React, { Component } from 'react';
import $ from 'jquery';

import Route from '../routes/AuthRoute';
import Login from '../components/Login';
import Main from '../components/Main';

import '../css/App.css';
import '../css/react-datetime.css';

class App extends Component {

  componentDidMount = () => {
    $('<div>123</div>').insertBefore($('.text-right+.col-xs-12'));
  }

  render = () => {
    return (
      <div>
        <Route component={ Login } path="/login" />
        <Route component={ Main } path="/" />
      </div>
    );
  };
}

export default App;
