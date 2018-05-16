import React, { Component } from 'react';
import axios from 'axios';

class DebitsList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      debits: [],
    };
  }

  componentDidMount() {
    axios.get('/debits')
      .then(debits => this.setState(debits));
  }
  

  render() {
    return (
      <div>
        
      </div>
    );
  }
}

export default DebitsList;