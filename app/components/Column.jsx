import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import { ADD_MODE, SINGULAR } from '../constants';
import * as actions from '../actions';
import Card from './Card';
import Tooltip from './Tooltip';

export class Column extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.registerOffset();
    window.addEventListener('resize', this.registerOffset);
  }

  componentDidUpdate() {
    this.registerOffset();
  }

  onClickAdd() {
    const newCard = { column: this.props.stateKey };
    this.props.editCard(newCard, ADD_MODE);
  }

  setColumnElement(element) {
    this.columnElement = element;
  }

  setModal(element) {
    this.modal = element;
  }

  registerOffset() {
    if (this.columnElement) {
      this.props.registerColumnOffset(this.props.stateKey, {
        top: this.columnElement.offsetTop,
        left: this.columnElement.offsetLeft,
        width: this.columnElement.offsetWidth,
        height: this.columnElement.offsetHeight
      });
    }
  }

  renderCard(card) {
    return (
      <Card
        stateKey={this.props.stateKey}
        key={card.id}
        card={card}
      />
    );
  }

  render() {
    return (
      <div className={this.props.className}>
        <h3>{this.props.name}</h3>
        <div ref={this.setColumnElement} className="column-body">
          {this.props.cards[this.props.stateKey].map(this.renderCard)}
          <div className="add-button-container">
            <Tooltip text={`Add a new ${SINGULAR[this.props.stateKey]}`}>
              <button
                onClick={this.onClickAdd}
                className="add-button"
              >
                <i className="fa fa-plus" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  name: React.PropTypes.string.isRequired,
  stateKey: React.PropTypes.string.isRequired,
  addCard: React.PropTypes.func.isRequired,
  editCard: React.PropTypes.func.isRequired,
  cards: React.PropTypes.object.isRequired,
  registerColumnOffset: React.PropTypes.func.isRequired,
  className: React.PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

export default connect(mapStateToProps, actions)(Column);
