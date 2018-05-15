import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from './components/App';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';

class Root extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      accountBalance: 14568.27,
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      }
    };
  }

  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName
    this.setState({
      currentUser: newUser
    })
  }
  
  render() {
    const AppComp = () => (<App accountBalance={this.state.accountBalance} />);
    const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince}  />
    );
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)


    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={AppComp} />
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Root;
