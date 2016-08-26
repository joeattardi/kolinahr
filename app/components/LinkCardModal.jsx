import React from 'react';
import Modal from 'react-modal';
import Color from 'color';
import autoBind from 'auto-bind';

export default class LinkCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    autoBind(this);
  }

  hide() {
    this.setState({ show: false });
  }

  linkCard(cardId) {
    this.props.onLinkCard(cardId);
    this.hide();
  }

  renderCard(card) {
    return (
      <div
        onClick={() => this.linkCard(card.id)}
        key={card.id}
        className="card"
        style={{
          backgroundColor: card.color,
          borderColor: Color(card.color).darken(0.25).hslString()
        }}
      >
        {card.text}
      </div>
    );
  }

  render() {
    return (
      <Modal
        isOpen={this.state.show}
        className="link-card-modal modal-container"
        overlayClassName="modal-overlay"
        ref={this.setModal}
      >
        <div className="modal-header">
          <h4>Link {this.props.linkType}</h4>
        </div>
        <div className="modal-body">
          <div className="card-list">
            {this.props.cards.map(this.renderCard)}
          </div>
        </div>
        <div className="modal-buttons">
          <button onClick={this.hide}>Cancel</button>
        </div>
      </Modal>
    );
  }
}

LinkCardModal.propTypes = {
  linkType: React.PropTypes.string,
  cards: React.PropTypes.array.isRequired,
  onLinkCard: React.PropTypes.func.isRequired
};
