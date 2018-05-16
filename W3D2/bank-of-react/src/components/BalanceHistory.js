import React from 'react';

const BalanceHistory = ({ logHistory }) => (
  <table>
    <tbody>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
      {logHistory}
    </tbody>
  </table>
);

export default BalanceHistory;