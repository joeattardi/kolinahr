import React from 'react';

import Card from './Card';

export default class Column extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: []
    };

    this.onClickAdd = this.onClickAdd.bind(this);
  }

  onClickAdd() {
    this.setState({
      cards: [
        ...this.state.cards,
        { text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' }
      ]
    });
  }

  renderCard(card) {
    return <Card text={card.text} />;
  }

  render() {
    return (
      <div className="column">
        <h3>{this.props.name}</h3>
        {this.state.cards.map(this.renderCard)}
        <button
          title="Add a new card"
          onClick={this.onClickAdd}
          className="add-button"
        >
          <i className="fa fa-plus" />
        </button>
      </div>
    );
  }
}

Column.propTypes = {
  name: React.PropTypes.string.isRequired
};
