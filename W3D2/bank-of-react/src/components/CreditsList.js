import React from 'react';
import moment from 'moment';

import BalanceItem from './BalanceItem';
import BalanceHistory from './BalanceHistory';
import CreditsForm from './CreditsForm';

const CreditsList = ({ creditBalance, addNewCredit }) => {
  if (!creditBalance.length) {
    return (
      <div>
        <p>No credits found</p>
      </div>
    );
  }

  const creditLogs = creditBalance.map(log => {
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
      <h2>Credits</h2>
      <CreditsForm addNewCredit={addNewCredit} />
      <BalanceHistory logHistory={creditLogs} />
    </section>
  );
};

export default CreditsList;