import React, { Component } from 'react';

import { getDebitAndCreditBalance } from '../api_util/balance';
import AccountBalance from './AccountBalance';

class AccountProfile extends Component {
  static sumTotalBalance(balance) {
    return balance.reduce((total, { amount }) => (total + amount), 0);
  }

  constructor(props) {
    super(props);
    
    this.state = {
      debitBalance: [],
      creditBalance: [],
      currentBalance: 0,
    };
  }

  componentDidMount() {
    getDebitAndCreditBalance(( debit, credit ) => {
      const debitBalance = debit.data;
      const creditBalance = credit.data;
      const totalDebit = AccountProfile.sumTotalBalance(debitBalance);
      const totalCredit = AccountProfile.sumTotalBalance(creditBalance);
      const currentBalance = (totalCredit - totalDebit).toFixed(2);
      const newBalance = {
        debitBalance,
        creditBalance,
        currentBalance,
      };
      
      this.setState(newBalance);
    });
  }
  
  render() {
    return (
      <React.Fragment>
        <AccountBalance currentBalance={this.state.currentBalance} />
      </React.Fragment>
    );
  }
}

export default AccountProfile;