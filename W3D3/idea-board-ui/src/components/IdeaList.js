import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import Idea from './Idea';
import IdeaNewForm from './IdeaNewForm';

class IdeaList extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      ideas: [],
    };

    this.deleteIdea = this.deleteIdea.bind(this);
    this.createIdea = this.createIdea.bind(this);
    this.handleIdeaUpdate = this.handleIdeaUpdate.bind(this);
  }

  componentDidMount() {
    axios.get('/ideas')
      .then(res => this.setState({ ideas: res.data }))
      .catch(console.error);
  }

  createIdea(idea) {
    axios.post(`/ideas`, idea)
      .then(res => {
        const newIdea = res.data;
        const updatedIdeasList = _.merge([], this.state.ideas);
        updatedIdeasList.push(newIdea);

        this.setState({ ideas: updatedIdeasList });
      })
      .catch(console.error);
  }

  deleteIdea(ideaId, index) {
    axios.delete(`/ideas/${ideaId}`)
      .then(() => {
        const updatedIdeasList = _.merge([], this.state.ideas);
        updatedIdeasList.splice(index, 1);

        this.setState({ ideas: updatedIdeasList });
      })
      .catch(console.error);
  }

  handleIdeaUpdate(field, index) {
    return e => {
      const ideas = _.merge([], this.state.ideas);
      const ideaToUpdate = ideas[index];
      ideaToUpdate[field] = e.target.value;

      IdeaList.saveUpdatedIdea(ideaToUpdate);
      this.setState({ ideas });
    };
  }

  saveUpdatedIdea(idea) {
    return _.debounce(
      () => (
        axios.patch(`/ideas/${idea.id}`, idea)
          .catch(console.error)
      ),
      500
    );
  }

  render() {
    console.log(this.state);
    const ideaList = this.state.ideas.map(({ id, title, description }, i) => (
      <Idea
        key={id}
        id={id}
        title={title}
        description={description}
        deleteIdea={this.deleteIdea}
        handleIdeaUpdate={this.handleIdeaUpdate}
        index={i}
      />
    ));

    return (
      <div>
        <h1>Idea Board</h1>
        <IdeaNewForm createIdea={this.createIdea} />
        {ideaList}
      </div>
    );
  }
}

export default IdeaList;
