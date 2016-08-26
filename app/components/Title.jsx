import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import { EDIT_MODE, VIEW_MODE } from '../constants';
import * as actions from '../actions';
import Tooltip from './Tooltip';

class Title extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title
    };

    autoBind(this);
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
    this.setState({ updated: this.state.title !== this.props.title });
  }

  changeTitle(event) {
    this.setState({
      title: event.target.value
    });
  }

  editTitle() {
    this.setState({
      title: this.props.title,
      updated: false
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
    const cls = this.state.updated ? 'yellow-fade' : '';
    return (
      <Tooltip text="Click to edit title">
        <div className={cls} onClick={this.editTitle} id="model-title">
          <h2>{this.props.title}</h2>
          <span className="edit-hint">
            <i className="fa fa-pencil-square-o" />
          </span>
        </div>
      </Tooltip>
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
          onClick={this.saveTitle}
        >
          <i className="fa fa-2x fa-check" />
        </button>
        <button
          id="edit-title-cancel"
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
