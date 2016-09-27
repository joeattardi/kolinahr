import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';
import { connect } from 'react-redux';
import Color from 'color';
import autoBind from 'auto-bind';

import * as actions from '../actions';
import ColorPickerModal from './ColorPickerModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import LinkCardModal from './LinkCardModal';
import Tooltip from './Tooltip';
import {
  ADD_MODE, EDIT_MODE, DEFAULT_COLOR, TITLES, SINGULAR,
  KEY_ENTER, MAX_ROWS, LINK_KEYS
} from '../constants';

class EditCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      color: DEFAULT_COLOR,
      links: [],
      show: false,
      showConfirm: false,
      showColorPicker: false
    };

    autoBind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.editingCard) {
      this.setState({
        text: nextProps.editingCard.text || '',
        color: nextProps.editingCard.color || DEFAULT_COLOR,
        links: nextProps.editingCard.links || []
      });
    } else {
      this.setState({
        text: '',
        color: DEFAULT_COLOR,
        links: []
      });
    }
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  setTextArea(textArea) {
    this.textArea = textArea;
  }

  setConfirmDeleteModal(modal) {
    this.confirmDeleteModal = modal;
  }

  setColorPickerModal(modal) {
    this.colorPickerModal = modal;
  }

  setLinkCardModal(modal) {
    this.linkCardModal = modal;
  }

  setNewColor(color) {
    this.setState({ color });
  }

  getLinkCards() {
    const linkKey = LINK_KEYS[this.props.editingCard.column];
    const { cards } = this.props;
    return linkKey && cards[linkKey] ?
      cards[linkKey].filter(card => this.state.links.indexOf(card.id) === -1) : [];
  }

  confirmDelete() {
    this.setState({ show: false });
    this.props.deleteCard(this.props.editingCard.id, this.props.editingCard.column);
  }

  showConfirmDeleteModal() {
    this.confirmDeleteModal.setState({ show: true });
  }

  showColorPicker() {
    this.colorPickerModal.setState({ show: true });
  }

  showLinkCardModal() {
    this.linkCardModal.setState({ show: true });
  }

  handleKeyUp(event) {
    const rows = event.target.value.split('\n').length;
    if (event.keyCode === KEY_ENTER && rows === this.textArea.rows && rows <= MAX_ROWS) {
      this.textArea.rows++;
    }
  }

  cancel() {
    this.props.editCardCancel();
  }

  saveChanges() {
    if (this.props.cardEditMode === EDIT_MODE) {
      this.props.updateCard({
        ...this.props.editingCard,
        text: this.state.text,
        color: this.state.color,
        links: this.state.links
      });
    } else {
      this.props.addCard(this.props.editingCard.column, {
        text: this.state.text,
        color: this.state.color,
        links: this.state.links
      });
    }
  }

  linkCard(cardId) {
    this.setState({
      links: [
        ...this.state.links,
        cardId
      ]
    });
  }

  deleteLink(link) {
    this.setState({
      links: this.state.links.filter(linkId => linkId !== link)
    });
  }

  isLinkError() {
    return this.props.editingCard.column !== 'impact' && this.state.links.length === 0;
  }

  renderLinksSection() {
    const linkKey = LINK_KEYS[this.props.editingCard.column];
    if (linkKey) {
      return (
        <div>
          <h5>Linked {TITLES[linkKey]}</h5>
          <div className="modal-row">
            <button onClick={this.showLinkCardModal}>
              <i className="fa fa-link" /> Link {SINGULAR[linkKey]}
            </button>
          </div>
          {this.state.links.map(this.renderLink)}
        </div>
      );
    }

    return <div />;
  }

  renderLink(link) {
    const linkedCard = _.find(this.props.cards[LINK_KEYS[this.props.editingCard.column]],
      card => card.id === link);
    if (linkedCard) {
      return (
        <div key={link} className="modal-row card-link">
          <div
            className="card"
            style={{
              backgroundColor: linkedCard.color,
              borderColor: Color(linkedCard.color).darken(0.25).hslString(),
              cursor: 'default'
            }}
          >{linkedCard.text}</div>
          <Tooltip text="Unlink">
            <button onClick={() => this.deleteLink(link)}>
              <i className="fa fa-chain-broken" />
            </button>
          </Tooltip>
        </div>
      );
    }

    return <div key={link} />;
  }

  renderDelete() {
    if (this.props.cardEditMode === EDIT_MODE) {
      return (
        <button
          onClick={this.showConfirmDeleteModal}
          className="button-delete"
        ><i className="fa fa-trash-o" /> Delete
        </button>
      );
    }

    return <div />;
  }


  renderError() {
    if (this.isLinkError()) {
      return (
        <div className="banner banner-error">
          <i className="fa fa-exclamation-triangle" />
          This {SINGULAR[this.props.editingCard.column]} must be linked to
          at least one {SINGULAR[LINK_KEYS[this.props.editingCard.column]]}.
        </div>
      );
    }

    return <div />;
  }

  renderLongMessage() {
    const rows = this.state.text.split('\n').length;
    if (rows > MAX_ROWS) {
      return (
        <div className="banner banner-info">
          <i className="fa fa-info-circle" />
          This {SINGULAR[this.props.editingCard.column]} is a little long.
          You might want to split it up into smaller ones.
        </div>
      );
    }

    return <div />;
  }

  renderSaveButton() {
    if (this.isLinkError() || this.state.text === '') {
      return <button disabled className="button-primary-disabled">Save</button>;
    }

    return <button className="button-primary" onClick={this.saveChanges}>Save</button>;
  }

  render() {
    const { column } = this.props.editingCard;
    const linkKey = LINK_KEYS[column];
    const cardType = SINGULAR[column];
    return (
      <div>
        <Modal
          isOpen={this.props.editingCard !== false}
          className="edit-card-modal modal-container"
          overlayClassName="modal-overlay"
        >
          <div className="modal-header">
            <h4>
              {this.props.cardEditMode === ADD_MODE ? 'Add' : 'Edit'} {cardType}
            </h4>
          </div>
          <div className="modal-body">
            {this.renderError()}
            {this.renderLongMessage()}
            <h5>Card Details</h5>
            <div className="modal-row">
              <div className="modal-column edit-column">
                <textarea
                  ref={this.setTextArea}
                  onKeyUp={this.handleKeyUp}
                  rows="5"
                  cols="35"
                  value={this.state.text}
                  onChange={this.onTextChange}
                />
              </div>
              <div className="modal-column">
                {this.renderDelete()}
                <button
                  onClick={this.showColorPicker}
                  style={{
                    background: this.state.color,
                    borderColor: Color(this.state.color).darken(0.25).hslString()
                  }}
                >
                  <i className="fa fa-paint-brush" /> Color
                </button>
              </div>
            </div>
            {this.renderLinksSection()}
          </div>
          <div className="modal-buttons">
            <button onClick={this.cancel} className="cancel-button">Cancel</button>
            {this.renderSaveButton()}
          </div>
        </Modal>

        <ConfirmDeleteModal
          ref={this.setConfirmDeleteModal}
          onConfirmDelete={this.confirmDelete}
          type={SINGULAR[this.props.editingCard.column] || 'card'}
        />

        <ColorPickerModal
          color={this.state.color}
          ref={this.setColorPickerModal}
          onColorSet={this.setNewColor}
        />

        <LinkCardModal
          ref={this.setLinkCardModal}
          linkType={SINGULAR[linkKey]}
          onLinkCard={this.linkCard}
          cards={this.getLinkCards()}
        />
      </div>
    );
  }
}

EditCardModal.propTypes = {
  editCardCancel: React.PropTypes.func.isRequired,
  cardEditMode: React.PropTypes.string.isRequired,
  editingCard: React.PropTypes.oneOfType([
    React.PropTypes.bool,
    React.PropTypes.object
  ]),
  addCard: React.PropTypes.func,
  updateCard: React.PropTypes.func,
  deleteCard: React.PropTypes.func,
  cards: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    editingCard: state.editingCard,
    cardEditMode: state.cardEditMode,
    cards: state.cards
  };
}

export default connect(mapStateToProps, actions)(EditCardModal);
