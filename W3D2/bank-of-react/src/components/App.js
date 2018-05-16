import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';

import Home from './Home';
import AccountProfile from './AccountProfile';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/account" component={AccountProfile} />
      </Switch>
    );
  }
}

export default App;
