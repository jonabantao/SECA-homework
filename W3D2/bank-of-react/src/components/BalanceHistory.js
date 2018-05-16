import React from 'react';

const BalanceHistory = ({ logHistory }) => (
  <table>
    <tr>
      <th>Date</th>
      <th>Description</th>
      <th>Amount</th>
    </tr>
    {logHistory}
  </table>
);

export default BalanceHistory;