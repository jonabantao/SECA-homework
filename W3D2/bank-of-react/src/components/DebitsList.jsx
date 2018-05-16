import React from 'react';

import DebitsItem from './DebitsItem';

const DebitsList = ({ debitBalance }) => {
  if (!debitBalance.length) {
    return (
      <div>
        <p>No debits found</p>
      </div>
    );
  }

  const debitLogs = debitBalance.map(log => (
    <DebitsItem
      key={log.id}
      description={log.description}
      amount={log.amount}
      date={log.date}
    />
  ));
  
  return (
    <section>
      <h1>Debits</h1>
      {debitLogs}
    </section>
  );
};

export default DebitsList;