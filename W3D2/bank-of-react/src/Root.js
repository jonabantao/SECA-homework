import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './components/App';

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
    return (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  }
}

export default Root;
