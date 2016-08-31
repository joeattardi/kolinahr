import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import autoBind from 'auto-bind';

import { deleteModel, createModel, loadModels } from '../actions';
import NewModelModal from './NewModelModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

class ModelList extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.loadModels();
  }

  setNewModelModal(modal) {
    this.newModelModal = modal;
  }

  setConfirmDeleteModal(modal) {
    this.confirmDeleteModal = modal;
  }

  showNewModelModal() {
    this.newModelModal.showModal();
  }

  deleteModel(id) {
    this.setState({ deleteId: id });
    this.confirmDeleteModal.setState({ show: true });
  }

  confirmDeleteModel() {
    this.props.deleteModel(this.state.deleteId);
  }

  renderModel(model) {
    /* eslint-disable no-underscore-dangle */
    return (
      <li className="model-list-item" key={model._id}>
        <Link to={`/edit/${model._id}`}>
          <i className="fa fa-file-text-o" /> {model.title}
        </Link>
        <i onClick={() => this.deleteModel(model._id)} className="fa fa-trash-o" />
      </li>
    );
  }

  render() {
    return (
      <div>
        <button className="button-primary" onClick={this.showNewModelModal}>
          <i className="fa fa-plus" /> New
        </button>
        <button onClick={this.props.loadModels}><i className="fa fa-refresh" /> Refresh</button>
        <div id="model-list">
          <h2>Logic Models</h2>
          <ul>
            {this.props.models.map(this.renderModel)}
          </ul>
        </div>
        <NewModelModal ref={this.setNewModelModal} createModel={this.props.createModel} />
        <ConfirmDeleteModal
          ref={this.setConfirmDeleteModal}
          type="Logic Model"
          onConfirmDelete={this.confirmDeleteModel}
        />
      </div>
    );
  }
}

ModelList.propTypes = {
  loadModels: React.PropTypes.func.isRequired,
  deleteModel: React.PropTypes.func.isRequired,
  createModel: React.PropTypes.func.isRequired,
  models: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    models: state.allModels
  };
}

export default connect(mapStateToProps, { deleteModel, createModel, loadModels })(ModelList);
