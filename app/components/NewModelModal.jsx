import _ from 'lodash';
import React from 'react';
import Modal from 'react-modal';
import autoBind from 'auto-bind';
import { ADD_MODE } from '../constants';

class NewModelModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      title: ''
    };

    autoBind(this);
  }

  setInput(input) {
    this.input = input;
  }

  handleChangeTitle(event) {
    const emptyTitle = event.target.value === '';

    this.setState({
      title: event.target.value,
      emptyTitle
    });
  }

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.create();
    }
  }

  showModal(mode, id) {
    this.setState({
      show: true,
      copyId: id,
      mode
    });

    _.defer(() => this.input.focus());
  }

  hideModal() {
    this.setState({ show: false });
  }

  cancel() {
    this.hideModal();
    this.setState({
      title: '',
      emptyTitle: false
    });
  }

  create() {
    if (this.input.value === '') {
      this.setState({
        emptyTitle: true
      });
      _.defer(() => this.input.focus());
    } else {
      this.setState({ emptyTitle: false });

      if (this.state.mode === ADD_MODE) {
        this.props.createModel(this.input.value);
      } else {
        this.props.copyModel(this.state.copyId, this.input.value);
      }
    }
  }

  renderValidationError() {
    if (this.state.emptyTitle) {
      return (
        <p className="error">
          <i className="fa fa-exclamation-triangle" /> Title is required.
        </p>
      );
    }

    return <div />;
  }

  render() {
    return (
      <Modal
        onRequestClose={this.cancel}
        className="new-model-modal modal-container"
        overlayClassName="modal-overlay"
        isOpen={this.state.show}
      >
        <div className="modal-header">
          <h4>{this.state.mode === ADD_MODE ? 'New' : 'Copy'} Logic Model</h4>
        </div>
        <div className="modal-body">
          <h5>Model Name</h5>
          <input
            onChange={this.handleChangeTitle}
            onKeyUp={this.handleKeyUp}
            ref={this.setInput}
            value={this.state.title}
            type="text"
            size="30"
          />
          {this.renderValidationError()}
        </div>
        <div className="modal-buttons">
          <button onClick={this.cancel}>Cancel</button>
          <button className="button-primary" onClick={this.create}>
            {this.state.mode === ADD_MODE ? 'Create' : 'Create Copy'}
          </button>
        </div>
      </Modal>
    );
  }
}

NewModelModal.propTypes = {
  createModel: React.PropTypes.func.isRequired,
  copyModel: React.PropTypes.func.isRequired
};

export default NewModelModal;
