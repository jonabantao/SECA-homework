import React from 'react';
import { NavLink } from 'react-router-dom';

const AccountBalance = ({ currentBalance }) => (
  <div>
    <NavLink to="/account/home">Home</NavLink>
    <NavLink to="/account/debits">Debits</NavLink>
    <NavLink to="/account/credits">Credits</NavLink>
    Balance: ${currentBalance}
  </div>
);

export default AccountBalance;
