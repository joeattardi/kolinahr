import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions';
import Card from './Card';

export class Column extends React.Component {
  constructor(props) {
    super(props);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.renderCard = this.renderCard.bind(this);
  }

  onClickAdd() {
    this.props.addCard(this.props.stateKey);
  }

  updateCard(card) {
    actions.updateCard(card);
  }

  renderCard(card) {
    return <Card updateCard={this.props.updateCard} key={card.id} card={card} />;
  }

  render() {
    return (
      <div className="column">
        <h3>{this.props.name}</h3>
        {this.props.cards.map(this.renderCard)}
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
  name: React.PropTypes.string.isRequired,
  stateKey: React.PropTypes.string.isRequired,
  addCard: React.PropTypes.func.isRequired,
  cards: React.PropTypes.array.isRequired,
  updateCard: React.PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    cards: state.cards[ownProps.stateKey]
  };
}

export default connect(mapStateToProps, actions)(Column);
