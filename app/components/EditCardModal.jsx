import React from 'react';
import Modal from 'boron/ScaleModal';

const CANCEL = 'CANCEL';
const SAVE = 'SAVE';

export default class EditCardModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.card.text
    };

    this.hideModal = this.hideModal.bind(this);
    this.setModal = this.setModal.bind(this);
    this.cancel = this.cancel.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
    this.onHide = this.onHide.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  onHide() {
    if (this.state.closeSource === CANCEL) {
      this.setState({
        text: this.props.card.text
      });
    }
  }

  setModal(modal) {
    this.modal = modal;
  }

  showModal() {
    this.modal.show();
  }

  hideModal(source) {
    this.setState({ closeSource: source });
    this.modal.hide();
  }

  cancel() {
    this.hideModal(CANCEL);
  }

  saveChanges() {
    this.hideModal(SAVE);
    this.props.updateCard({
      ...this.props.card,
      text: this.state.text
    });
  }

  render() {
    return (
      <Modal className="edit-card-modal modal-container" ref={this.setModal} onHide={this.onHide}>
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
    );
  }
}

EditCardModal.propTypes = {
  card: React.PropTypes.object.isRequired,
  updateCard: React.PropTypes.func.isRequired
};

