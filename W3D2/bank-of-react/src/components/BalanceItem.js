import React from 'react';

const BalanceItem = ({ description, amount, date }) => {
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{amount}</td>
    </tr>
  );
};

export default BalanceItem;