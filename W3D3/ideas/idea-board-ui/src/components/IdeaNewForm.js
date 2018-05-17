import React, { Component } from 'react';

class IdeaNewForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: '',
      description: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const idea = Object.assign({}, this.state);

    this.props.createIdea(idea);
  }

  render() {
    return (
      <div>
          <h2>Create New Idea</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="title">Title</label>
              <input
                name="title"
                type="text"
                onChange={this.handleChange('title')} 
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <input
                name="description"
                type="text"
                onChange={this.handleChange('description')}
              />
            </div>
            <div>
              <input type="submit" value="Create Idea"/>
            </div>
          </form>
          <hr />
          <hr />
      </div>
    );
  }
}

export default IdeaNewForm;
