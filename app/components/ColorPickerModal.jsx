import React from 'react';
import Modal from 'react-modal';
import autoBind from 'auto-bind';

import { COLOR_CHOICES } from '../constants';

export default class ColorPickerModal extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);

    this.state = {
      show: false,
    };
  }

  onCancelClick() {
    this.setState({
      show: false,
      color: this.props.color
    });
  }

  setNewColor(event) {
    this.hide();
    this.props.onColorSet(event.target.style.backgroundColor);
  }

  show() {
    this.setState({ show: true });
  }

  hide() {
    this.setState({ show: false });
  }


  render() {
    return (
      <Modal
        className="color-picker-modal modal-container"
        overlayClassName="modal-overlay"
        isOpen={this.state.show}
      >
        <div className="modal-header">
          <h4>Choose Color</h4>
        </div>
        <div className="modal-body">
          {COLOR_CHOICES.map(color =>
            <button key={color} onClick={this.setNewColor} style={{ background: color }} />)}
        </div>
        <div className="modal-buttons">
          <button onClick={this.onCancelClick} className="cancel-button">Cancel</button>
        </div>
      </Modal>
    );
  }
}

ColorPickerModal.propTypes = {
  color: React.PropTypes.string.isRequired,
  onColorSet: React.PropTypes.func.isRequired
};
