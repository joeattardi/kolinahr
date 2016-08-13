import React from 'react';
import Modal from 'react-modal';

export default class EditCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.card.text,
      show: false,
      showConfirm: false
    };

    this.hideModal = this.hideModal.bind(this);
    this.setModal = this.setModal.bind(this);
    this.cancel = this.cancel.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  onDeleteClick() {
    this.setState({ showConfirm: true });
  }

  setModal(modal) {
    this.modal = modal;
  }

  confirmDelete() {
    this.setState({ showConfirm: false });
    this.setState({ show: false });
    this.props.deleteCard(this.props.card.id, this.props.card.column);
  }

  cancelDelete() {
    this.setState({ showConfirm: false });
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
      text: this.props.card.text
    });
  }

  saveChanges() {
    this.hideModal();
    this.props.updateCard({
      ...this.props.card,
      text: this.state.text
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
            <button onClick={this.cancel}><i className="fa fa-2x fa-times" /></button>
          </div>
          <div className="modal-body">
            <div className="modal-row">
              <textarea rows="4" cols="40" value={this.state.text} onChange={this.onTextChange} />
              <div className="modal-column">
                <button
                  onClick={this.onDeleteClick}
                  className="delete-button"
                ><i className="fa fa-trash-o" /> Delete</button>
              </div>
            </div>
          </div>
          <div className="modal-buttons">
            <button onClick={this.cancel} className="cancel-button">Cancel</button>
            <button onClick={this.saveChanges}>Save</button>
          </div>
        </Modal>
        <Modal
          className="confirm-delete-modal modal-container"
          overlayClassName="modal-overlay"
          isOpen={this.state.showConfirm}
        >
          <div className="modal-header">
            <h4>Delete Card</h4>
          </div>
          <div className="modal-body">
            Are you sure you want to delete this card?
          </div>
          <div className="modal-buttons">
            <button onClick={this.cancelDelete}>Cancel</button>
            <button className="delete-button" onClick={this.confirmDelete}>Delete</button>
          </div>
        </Modal>
      </div>
    );
  }
}

EditCardModal.propTypes = {
  card: React.PropTypes.object.isRequired,
  updateCard: React.PropTypes.func.isRequired,
  deleteCard: React.PropTypes.func.isRequired
};

