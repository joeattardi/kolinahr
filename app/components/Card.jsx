import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';
import _ from 'lodash';

import * as actions from '../actions';
import EditCardModal from './EditCardModal';

export class Card extends React.Component {
  constructor(props) {
    super(props);

    this.registerOffset = this.registerOffset.bind(this);
    this.setModal = this.setModal.bind(this);
    this.setCardElement = this.setCardElement.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    this.registerOffset();

    window.addEventListener('resize', this.registerOffset);
  }

  componentDidUpdate() {
    _.defer(this.registerOffset);
  }

  setCardElement(element) {
    this.cardElement = element;
  }

  setModal(modal) {
    this.modal = modal;
  }

  registerOffset() {
    this.props.registerOffset(this.props.card.id, {
      top: this.cardElement.offsetTop,
      left: this.cardElement.offsetLeft,
      width: this.cardElement.offsetWidth,
      height: this.cardElement.offsetHeight
    });
  }

  showModal() {
    this.modal.showModal();
  }

  renderCard() {
    let className = this.props.isDragging ? 'card card-dragging' : 'card';

    if (this.props.validationErrors[this.props.card.id]) {
      className += ' error';
    }

    return this.props.connectDragSource(
      <div
        ref={this.setCardElement}
        onClick={this.showModal}
        className={className}
        title={this.props.validationErrors[this.props.card.id]}
        style={{
          backgroundColor: this.props.card.color }}
      >
        {this.props.card.text}
        {this.props.isDragging}
      </div>
    );
  }

  render() {
    return this.props.connectDropTarget(
      <div className="card-wrapper">
        {this.renderCard()}
        <EditCardModal
          linkKey={this.props.linkKey}
          cards={this.props.cards}
          updateCard={this.props.updateCard}
          deleteCard={this.props.deleteCard}
          ref={this.setModal}
          card={this.props.card}
        />
      </div>
    );
  }
}

Card.propTypes = {
  card: React.PropTypes.object.isRequired,
  cards: React.PropTypes.object.isRequired,
  updateCard: React.PropTypes.func.isRequired,
  deleteCard: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  registerOffset: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  linkKey: React.PropTypes.string
};

const cardSource = {
  beginDrag(props) {
    const { card } = props;
    props.startDrag(card.id);
    return {
      id: card.id,
      column: card.column,
      text: card.text
    };
  },

  endDrag(props, monitor, card) {
    card.props.endDrag();
    card.registerOffset();
  },

  isDragging(props, monitor) {
    return props.card.id === monitor.getItem().id;
  }
};

const cardTarget = {
  hover(targetProps, monitor) {
    const source = monitor.getItem();
    const { card } = targetProps;

    if (source.id !== card.id && source.column === card.column) {
      targetProps.moveCard(source.column, source.id, card.column, card.id);
      source.column = card.column;
    }
  }
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function dropCollect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

function mapStateToProps(state) {
  return {
    cards: state.cards,
    validationErrors: state.validationErrors
  };
}

/* eslint-disable new-cap */
export default _.flow(
  DragSource('card', cardSource, dragCollect),
  DropTarget('card', cardTarget, dropCollect),
  reduxConnect(mapStateToProps, actions)
)(Card);

