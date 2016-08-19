import React from 'react';
import { DropTarget } from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';
import Card from './Card';

export class Column extends React.Component {
  constructor(props) {
    super(props);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.renderCard = this.renderCard.bind(this);

    this.setColumnElement = this.setColumnElement.bind(this);
    this.registerOffset = this.registerOffset.bind(this);
  }

  componentDidMount() {
    this.registerOffset();
    window.addEventListener('resize', this.registerOffset);
  }

  componentDidUpdate() {
    this.registerOffset();
  }

  onClickAdd() {
    this.props.addCard(this.props.stateKey);
  }

  setColumnElement(element) {
    this.columnElement = element;
  }

  registerOffset() {
    this.props.registerColumnOffset(this.props.stateKey, {
      top: this.columnElement.offsetTop,
      left: this.columnElement.offsetLeft,
      width: this.columnElement.offsetWidth,
      height: this.columnElement.offsetHeight
    });
  }

  updateCard(card) {
    actions.updateCard(card);
  }

  renderCard(card) {
    return (
      <Card
        updateCard={this.props.updateCard}
        deleteCard={this.props.deleteCard}
        linkKey={this.props.linkKey}
        key={card.id}
        card={card}
      />
    );
  }

  render() {
    return this.props.connectDropTarget(
      <div ref={this.setColumnElement} className="column">
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
  updateCard: React.PropTypes.func.isRequired,
  deleteCard: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  registerColumnOffset: React.PropTypes.func.isRequired,
  linkKey: React.PropTypes.string
};

const cardTarget = {
  hover(targetProps, monitor) {
    const source = monitor.getItem();

    if (source.column !== targetProps.stateKey) {
      targetProps.moveCard(source.column, source.id, targetProps.stateKey);
      source.column = targetProps.stateKey;
    }
  },
};

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


function mapStateToProps(state, ownProps) {
  return {
    cards: state.cards[ownProps.stateKey]
  };
}

/* eslint-disable new-cap */
export default _.flow(
  DropTarget('card', cardTarget, dropCollect),
  reduxConnect(mapStateToProps, actions)
)(Column);

