import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { getDebitAndCreditBalance } from '../api_util/balance';

import AccountBalance from './AccountBalance';
import UserProfile from './UserProfile';
import DebitsList from './DebitsList';

class AccountProfile extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      debitBalance: [],
      creditBalance: [],
      currentUser: {
        userName: 'bob_loblaw',
        memberSince: '08/23/99',
      },
    };
  }

  componentDidMount() {
    getDebitAndCreditBalance(( debit, credit ) => {
      const debitBalance = debit.data;
      const creditBalance = credit.data;

      const newBalance = {
        debitBalance,
        creditBalance,
      };
      
      this.setState(newBalance);
    });
  }

  sumBalanceLogs(balance) {
    return balance.reduce((total, { amount }) => (total + amount), 0);
  }

  calculateCurrentBalance(debitBalance, creditBalance) {
    const totalDebit = this.sumBalanceLogs(debitBalance);
    const totalCredit = this.sumBalanceLogs(creditBalance);

    return (totalCredit - totalDebit).toFixed(2);
  }
  
  render() {
    const UserProfileComponent = () => (
      <UserProfile 
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );

    const DebitsComponent = () => (
      <DebitsList debitBalance={this.state.debitBalance} />
    );

    // const CreditsComponent = () => (
    //   <DebitsList debitBalance={this.state.debitBalance} />
    // );

    const currentBalance = this.calculateCurrentBalance(
      this.state.debitBalance,
      this.state.creditBalance
    );

    return (
      <React.Fragment>
        <AccountBalance currentBalance={currentBalance} />
        <Switch>
          <Route exact path="/account/home" render={UserProfileComponent} />
          <Route exact path="/account/debits" render={DebitsComponent} />
          <Route exact path="/account/home" component={UserProfileComponent} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default AccountProfile;