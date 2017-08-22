import React, { Component } from 'react';

import Route from '../routes/AuthRoute';
import Login from '../components/Login';
import Main from '../components/Main';

import '../css/App.css';
import '../css/react-datetime.css';

class App extends Component {

  render() {
    return (
      <div>
        <Route component={ Login } path="/login" />
        <Route component={ Main } path="/" />
      </div>
    );
  }
}

export default App;
