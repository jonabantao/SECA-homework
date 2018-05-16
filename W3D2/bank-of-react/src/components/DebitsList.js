import React from 'react';
import moment from 'moment';

import BalanceItem from './BalanceItem';
import BalanceHistory from './BalanceHistory';
import DebitsForm from './DebitsForm';

const DebitsList = ({ debitBalance, addNewDebit }) => {
  if (!debitBalance.length) {
    return (
      <div>
        <p>No debits found</p>
      </div>
    );
  }

  const debitLogs = debitBalance.map(log => {
    const formattedDate = moment(log.date).format('YYYY-MM-DD');

    return (
      <BalanceItem
        key={log.id}
        description={log.description}
        amount={log.amount}
        date={formattedDate}
      />
    );
  });
  
  return (
    <section>
      <h2>Debits</h2>
      <DebitsForm addNewDebit={addNewDebit} />
      <BalanceHistory logHistory={debitLogs} />
    </section>
  );
};

export default DebitsList;