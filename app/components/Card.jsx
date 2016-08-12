import React from 'react';
import Modal from 'boron/ScaleModal';

export default class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text
    };

    this.hideModal = this.hideModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this.setModal = this.setModal.bind(this);
    this.onTextChange = this.onTextChange.bind(this);
  }

  onTextChange(event) {
    this.setState({
      text: event.target.value
    });
  }

  setModal(modal) {
    this.modal = modal;
  }

  showModal() {
    this.modal.show();
  }

  hideModal() {
    this.modal.hide();
  }

  render() {
    return (
      <div className="card-wrapper">
        <div onClick={this.showModal} className="card fade-in">
          {this.state.text}
        </div>
        <Modal className="modal-container" ref={this.setModal}>
          <div className="modal-header">
            <h4>Edit Card</h4>
            <button onClick={this.hideModal}><i className="fa fa-2x fa-times" /></button>
          </div>
          <div className="modal-body">
            <textarea rows="5" cols="60" value={this.state.text} onChange={this.onTextChange} />
          </div>
        </Modal>
      </div>
    );
  }
}

Card.propTypes = {
  text: React.PropTypes.string.isRequired
};
