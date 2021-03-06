import React from 'react';
import Modal from 'react-modal';
import autoBind from 'auto-bind';

export default class ConfirmDeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { show: false };
    autoBind(this);
  }

  hide() {
    this.setState({ show: false });
  }

  confirmDelete() {
    this.setState({ show: false });
    this.props.onConfirmDelete();
  }

  render() {
    return (
      <Modal
        className="confirm-delete-modal modal-container"
        overlayClassName="modal-overlay"
        isOpen={this.state.show}
      >
        <div className="modal-header">
          <h4>Delete {this.props.type}</h4>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to delete this {this.props.type}?</p>
        </div>
        <div className="modal-buttons">
          <button onClick={this.hide}>Cancel</button>
          <button className="button-delete" onClick={this.confirmDelete}>Delete</button>
        </div>
      </Modal>
    );
  }
}

ConfirmDeleteModal.propTypes = {
  onConfirmDelete: React.PropTypes.func.isRequired,
  type: React.PropTypes.string.isRequired
};
