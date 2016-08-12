import React from 'react';
import { connect } from 'react-redux';
import { EDIT_MODE, VIEW_MODE } from '../constants';
import * as actions from '../actions';

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title
    };

    this.editTitle = this.editTitle.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.saveTitle = this.saveTitle.bind(this);
  }

  componentDidUpdate() {
    if (this.props.titleMode === EDIT_MODE) {
      this.field.focus();
    }
  }

  onKeyUp(event) {
    if (event.keyCode === 27) {
      this.props.editTitleCancel();
    } else if (event.keyCode === 13) {
      this.saveTitle();
    }
  }

  saveTitle() {
    this.props.editTitleSave(this.state.title);
  }

  changeTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  editTitle() {
    this.setState({
      title: this.props.title
    });

    this.props.editTitle();
  }

  renderTitle() {
    if (this.props.titleMode === VIEW_MODE) {
      return this.renderStaticTitle();
    }

    return this.renderEditableTitle();
  }

  renderStaticTitle() {
    return (
      <div onClick={this.editTitle} id="model-title" title="Click to edit title">
        <h2>{this.props.title}</h2>
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
          onClick={this.props.editTitleCancel}
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
  title: React.PropTypes.string.isRequired,
  titleMode: React.PropTypes.string.isRequired,
  editTitle: React.PropTypes.func.isRequired,
  editTitleSave: React.PropTypes.func.isRequired,
  editTitleCancel: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    title: state.title,
    titleMode: state.titleMode
  };
}

export default connect(mapStateToProps, actions)(Title);
