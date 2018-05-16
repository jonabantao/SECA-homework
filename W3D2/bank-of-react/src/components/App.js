import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import AccountProfile from './AccountProfile';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/account" component={AccountProfile} />
      </Switch>
    );
  }
}

export default App;
