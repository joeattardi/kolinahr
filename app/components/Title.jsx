import React from 'react';

export default class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: 'view',
      title: props.title
    };

    this.onKeyUp = this.onKeyUp.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
    this.cancelChanges = this.cancelChanges.bind(this);
  }

  componentDidUpdate() {
    if (this.state.mode === 'edit') {
      this.field.focus();
    }
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.cancelChanges();
    } else if (event.keyCode === 13) {
      this.saveTitle();
    }
  }

  saveTitle() {
    this.setState({
      mode: 'view',
      title: this.field.value
    });
  }

  cancelChanges() {
    this.setState({
      mode: 'view',
      title: this.state.previousTitle
    });
  }

  changeTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  editTitle() {
    this.setState({
      mode: 'edit',
      previousTitle: this.state.title
    });
  }

  renderTitle() {
    if (this.state.mode === 'view') {
      return this.renderStaticTitle();
    }

    return this.renderEditableTitle();
  }

  renderStaticTitle() {
    return (
      <div onClick={this.editTitle} id="model-title" title="Click to edit title">
        <h2>{this.state.title}</h2>
        <span className="edit-hint">
          <i className="fa fa-pencil-square-o" />
        </span>
      </div>
    );
  }

  renderEditableTitle() {
    return (
      <div className="editable-title">
        <input
          type="text"
          ref={field => { this.field = field; }}
          className="title-edit"
          value={this.state.title}
          onChange={this.changeTitle}
          onKeyUp={this.onKeyUp}
        />
        <button
          id="edit-title-save"
          title="Save new title"
          onClick={this.saveTitle}
        >
          <i className="fa fa-2x fa-check" />
        </button>
        <button
          id="edit-title-cancel"
          title="Cancel changes"
          onClick={this.cancelChanges}
        >
          <i className="fa fa-2x fa-times" />
        </button>
      </div>
    );
  }

  render() {
    return this.renderTitle();
  }
}

Title.propTypes = {
  title: React.PropTypes.string.isRequired
};
