import axios from 'axios';

const getDebitBalance = () => axios.get('/debits');
const getCreditBalance = () => axios.get('/credits');

export const getDebitAndCreditBalance = (callback) => {
  return axios.all([ getDebitBalance(), getCreditBalance() ])
    .then(
      axios.spread(callback),
      console.error
    );
};

