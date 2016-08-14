import React from 'react';
import Modal from 'react-modal';

import ColorPickerModal from './ColorPickerModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

export default class EditCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.card.text,
      color: props.card.color,
      show: false,
      showConfirm: false,
      showColorPicker: false
    };

    this.setNewColor = this.setNewColor.bind(this);
    this.showColorPicker = this.showColorPicker.bind(this);

    this.setConfirmDeleteModal = this.setConfirmDeleteModal.bind(this);
    this.showConfirmDeleteModal = this.showConfirmDeleteModal.bind(this);

    this.hideModal = this.hideModal.bind(this);
    this.setModal = this.setModal.bind(this);
    this.cancel = this.cancel.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
    this.setColorPickerModal = this.setColorPickerModal.bind(this);
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
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

  setNewColor(color) {
    this.setState({ color });
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

  showModal() {
    this.setState({ show: true });
  }

  hideModal() {
    this.setState({ show: false });
  }

  cancel() {
    this.hideModal();
    this.setState({
      text: this.props.card.text,
      color: this.props.card.color
    });
  }

  saveChanges() {
    this.hideModal();
    this.props.updateCard({
      ...this.props.card,
      text: this.state.text,
      color: this.state.color
    });
  }

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.show}
          className="edit-card-modal modal-container"
          overlayClassName="modal-overlay"
          ref={this.setModal}
          onHide={this.onHide}
        >
          <div className="modal-header">
            <h4>Edit Card</h4>
          </div>
          <div className="modal-body">
            <div className="modal-row">
              <textarea rows="4" cols="35" value={this.state.text} onChange={this.onTextChange} />
              <div className="modal-column">
                <button
                  onClick={this.showConfirmDeleteModal}
                  className="delete-button"
                ><i className="fa fa-trash-o" /> Delete
                </button>
                <button
                  onClick={this.showColorPicker}
                  style={{ backgroundColor: this.state.color }}
                >
                  <i className="fa fa-paint-brush" /> Color
                </button>
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button onClick={this.cancel} className="cancel-button">Cancel</button>
            <button onClick={this.saveChanges}>Save</button>
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
      </div>
    );
  }
}

EditCardModal.propTypes = {
  card: React.PropTypes.object.isRequired,
  updateCard: React.PropTypes.func.isRequired,
  deleteCard: React.PropTypes.func.isRequired
};

