import React from 'react';

import EditCardModal from './EditCardModal';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.setModal = this.setModal.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  setModal(modal) {
    this.modal = modal;
  }

  showModal() {
    this.modal.showModal();
  }

  render() {
    return (
      <div className="card-wrapper">
        <div
          onClick={this.showModal}
          className="card fade-in"
          style={{ backgroundColor: this.props.card.color }}
        >
          {this.props.card.text}
        </div>
        <EditCardModal
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
  updateCard: React.PropTypes.func.isRequired,
  deleteCard: React.PropTypes.func.isRequired
};
