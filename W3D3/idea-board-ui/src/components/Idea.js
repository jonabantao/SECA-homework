import React, {Component} from 'react';

class Idea extends Component {
  render() {
    const { id, index } = this.props;

    return (
      <div>
          <div>
            <input
              name="title"
              value={this.props.title}
              onChange={this.props.handleIdeaUpdate('title', index)}
            />
          </div>
          <div>
            <textarea
              name="description"
              value={this.props.description}
              onChange={this.props.handleIdeaUpdate('description', index)}
            />
          </div>
          <div>
            <button onClick={() => this.props.deleteIdea(id, index)}>
              Delete
            </button>
          </div>
          <hr/>
      </div>
    );
  }
}

export default Idea;
