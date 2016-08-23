import React from 'react';
import Modal from 'react-modal';
import _ from 'lodash';

import ColorPickerModal from './ColorPickerModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import LinkCardModal from './LinkCardModal';
import { ADD_MODE, EDIT_MODE, DEFAULT_COLOR, TITLES, SINGULAR } from '../constants';

export default class EditCardModal extends React.Component {
  constructor(props) {
    super(props);

    if (props.mode === EDIT_MODE) {
      this.state = {
        text: props.card.text,
        color: props.card.color,
        links: props.card.links,
        show: false,
        showConfirm: false,
        showColorPicker: false
      };
    } else {
      this.state = {
        text: '',
        color: DEFAULT_COLOR,
        links: [],
        show: false,
        showConfirm: false,
        showColorPicker: false
      };
    }

    this.renderLink = this.renderLink.bind(this);

    this.setNewColor = this.setNewColor.bind(this);
    this.showColorPicker = this.showColorPicker.bind(this);

    this.setConfirmDeleteModal = this.setConfirmDeleteModal.bind(this);
    this.showConfirmDeleteModal = this.showConfirmDeleteModal.bind(this);

    this.setLinkCardModal = this.setLinkCardModal.bind(this);
    this.showLinkCardModal = this.showLinkCardModal.bind(this);
    this.linkCard = this.linkCard.bind(this);

    this.setTextArea = this.setTextArea.bind(this);

    this.hideModal = this.hideModal.bind(this);
    this.setModal = this.setModal.bind(this);
    this.cancel = this.cancel.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.setColorPickerModal = this.setColorPickerModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.card) {
      this.setState({
        text: nextProps.card.text,
        color: nextProps.card.color,
        links: nextProps.card.links
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

  setModal(modal) {
    this.modal = modal;
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
    const { linkKey, cards } = this.props;
    return linkKey && cards[linkKey] ?
      cards[linkKey].filter(card => this.state.links.indexOf(card.id) === -1) : [];
  }

  confirmDelete() {
    this.setState({ show: false });
    this.props.deleteCard(this.props.card.id, this.props.card.column);
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

  showModal() {
    this.setState({ show: true });
    _.defer(() => this.textArea.focus());
  }

  hideModal() {
    this.setState({ show: false });
  }

  cancel() {
    this.hideModal();

    if (this.props.mode === EDIT_MODE) {
      this.setState({
        text: this.props.card.text,
        color: this.props.card.color,
        links: this.props.card.links
      });
    } else {
      this.setState({
        text: '',
        color: DEFAULT_COLOR,
        links: []
      });
    }
  }

  saveChanges() {
    this.hideModal();
    if (this.props.mode === EDIT_MODE) {
      this.props.updateCard({
        ...this.props.card,
        text: this.state.text,
        color: this.state.color,
        links: this.state.links
      });
    } else {
      this.props.addCard(this.props.stateKey, {
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
    return this.props.stateKey !== 'impact' && this.state.links.length === 0;
  }

  renderLinksSection() {
    if (this.props.linkKey) {
      return (
        <div>
          <h5>Linked {TITLES[this.props.linkKey]}</h5>
          <div className="modal-row">
            <button onClick={this.showLinkCardModal}>
              <i className="fa fa-link" /> Link {SINGULAR[this.props.linkKey]}
            </button>
          </div>
          {this.state.links.map(this.renderLink)}
        </div>
      );
    }

    return <div />;
  }

  renderLink(link) {
    const linkedCard = _.find(this.props.cards[this.props.linkKey], card => card.id === link);
    return (
      <div key={link} className="modal-row card-link">
        <div
          className="card"
          style={{ backgroundColor: linkedCard.color, cursor: 'default' }}
        >{linkedCard.text}</div>
        <button className="delete-button" onClick={() => this.deleteLink(link)}>
          <i className="fa fa-trash" />
        </button>
      </div>
    );
  }

  renderDelete() {
    if (this.props.mode === EDIT_MODE) {
      return (
        <button
          onClick={this.showConfirmDeleteModal}
          className="delete-button"
        ><i className="fa fa-trash-o" /> Delete
        </button>
      );
    }

    return <div />;
  }


  renderError() {
    if (this.isLinkError()) {
      return (
        <div className="notification-error">
          <i className="fa fa-exclamation-triangle" />
          This {SINGULAR[this.props.stateKey]} must be linked to
          at least one {SINGULAR[this.props.linkKey]}.
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
    const { linkKey } = this.props;
    return (
      <div>
        <Modal
          isOpen={this.state.show}
          className="edit-card-modal modal-container"
          overlayClassName="modal-overlay"
          ref={this.setModal}
        >
          <div className="modal-header">
            <h4>{this.props.mode === ADD_MODE ? 'Add Card' : 'Edit Card'}</h4>
          </div>
          <div className="modal-body">
            {this.renderError()}
            <h5>Card Details</h5>
            <div className="modal-row">
              <div className="modal-column edit-column">
                <textarea
                  ref={this.setTextArea}
                  rows="10"
                  cols="35"
                  value={this.state.text}
                  onChange={this.onTextChange}
                />
              </div>
              <div className="modal-column">
                {this.renderDelete()}
                <button
                  onClick={this.showColorPicker}
                  style={{ backgroundColor: this.state.color }}
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
  mode: React.PropTypes.string.isRequired,
  card: React.PropTypes.object,
  addCard: React.PropTypes.func,
  updateCard: React.PropTypes.func,
  deleteCard: React.PropTypes.func,
  stateKey: React.PropTypes.string,
  linkKey: React.PropTypes.string,
  cards: React.PropTypes.object.isRequired
};

