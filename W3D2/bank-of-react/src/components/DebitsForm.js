import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

class DebitsForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      amount: 0,
      description: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUpdate(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const { amount, description } = this.state;
    const date = new Date();
    const formattedAmount = parseFloat(amount);

    const newDebit = {
      id: uuidv1(),
      description,
      amount: formattedAmount,
      date
    };

    this.props.addNewDebit(newDebit);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" onChange={this.handleUpdate('description')} value={this.state.description} />
        </div>
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="text" name="amount" onChange={this.handleUpdate('amount')} value={this.state.amount} />
        </div>
        <button>Add Debit</button>
      </form>
    );
  }
}

export default DebitsForm;