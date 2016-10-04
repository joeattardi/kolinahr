import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import { connect as reduxConnect } from 'react-redux';
import _ from 'lodash';
import Color from 'color';
import autoBind from 'auto-bind';
import Markdown from 'react-markdown';

import * as actions from '../actions';
import Tooltip from './Tooltip';

export class Card extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
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

  setTooltip(tooltip) {
    this.tooltip = tooltip;
  }

  registerOffset() {
    if (this.cardElement) {
      this.props.registerOffset(this.props.card.id, {
        top: this.cardElement.offsetTop,
        left: this.cardElement.offsetLeft,
        width: this.cardElement.offsetWidth,
        height: this.cardElement.offsetHeight,
        column: this.props.card.column
      });
    }
  }

  editCard() {
    if (this.props.auth) {
      this.props.editCard(this.props.card);
    }
  }

  renderText(text) {
    const lines = text.split('\n');
    let key = 0;
    return (
      lines.map(line => <span key={++key}>{line}<br /></span>)
    );
  }

  renderCard() {
    let className = this.props.isDragging ? 'card card-dragging' : 'card';

    const validationErrors = this.props.validationErrors[this.props.card.id];

    if (validationErrors) {
      className += ' error';
    }

    const cardMarkup = (
      <div
        ref={this.setCardElement}
        onClick={this.editCard}
        className={className}
        style={{
          backgroundColor: this.props.card.color,
          borderColor: validationErrors ? 'red' :
            Color(this.props.card.color).darken(0.25).hslString()
        }}
      >
        {validationErrors ?
          <i className="fa fa-exclamation-triangle error" /> : ''}
        <Markdown source={this.props.card.text} />
        {this.props.isDragging}
      </div>
    );

    if (this.props.auth) {
      return this.props.connectDragSource(cardMarkup);
    }

    return cardMarkup;
  }

  renderCardWithTooltip(validationError) {
    return (
      <Tooltip ref={this.setTooltip} text={validationError} className="error">
        {this.renderCard()}
      </Tooltip>
    );
  }

  render() {
    const validationError = this.props.validationErrors[this.props.card.id];
    return this.props.connectDropTarget(
      <div className="card-wrapper">
        {validationError ? this.renderCardWithTooltip(validationError) : this.renderCard()}
      </div>
    );
  }
}

Card.propTypes = {
  auth: React.PropTypes.bool.isRequired,
  card: React.PropTypes.object.isRequired,
  cards: React.PropTypes.object.isRequired,
  editCard: React.PropTypes.func.isRequired,
  editCardCancel: React.PropTypes.func.isRequired,
  connectDragSource: React.PropTypes.func.isRequired,
  connectDropTarget: React.PropTypes.func.isRequired,
  registerOffset: React.PropTypes.func.isRequired,
  isDragging: React.PropTypes.bool.isRequired,
  validationErrors: React.PropTypes.object.isRequired
};

const cardSource = {
  beginDrag(props, monitor, cardComponent) {
    const { card } = props;
    if (cardComponent.tooltip) {
      cardComponent.tooltip.setState({ show: false });
    }
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
    validationErrors: state.validationErrors,
    auth: state.auth
  };
}

/* eslint-disable new-cap */
export default _.flow(
  DragSource('card', cardSource, dragCollect),
  DropTarget('card', cardTarget, dropCollect),
  reduxConnect(mapStateToProps, actions)
)(Card);

