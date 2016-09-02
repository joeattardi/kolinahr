import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import { deleteModel, createModel, copyModel, loadModels } from '../actions';
import NewModelModal from './NewModelModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import ModelListItem from './ModelListItem';
import { TITLE, ADD_MODE, COPY_MODE } from '../constants';

class ModelList extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    document.title = TITLE;
    this.props.loadModels();
  }

  setNewModelModal(modal) {
    this.newModelModal = modal;
  }

  setConfirmDeleteModal(modal) {
    this.confirmDeleteModal = modal;
  }

  createNewModel() {
    this.newModelModal.showModal(ADD_MODE);
  }

  copyModel(modelId) {
    this.newModelModal.showModal(COPY_MODE, modelId);
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
    return (
      <ModelListItem
        key={model._id}
        model={model}
        deleteModel={this.deleteModel} copyModel={this.copyModel}
      />
    );
  }

  render() {
    if (this.props.loading) {
      return <img className="loadingIndicator" alt="Loading" src="/loading.gif" />;
    }

    return (
      <div>
        <button className="button-primary" onClick={this.createNewModel}>
          <i className="fa fa-plus" /> New
        </button>
        <button onClick={this.props.loadModels}><i className="fa fa-refresh" /> Refresh</button>
        <div id="model-list">
          <h2>Logic Models</h2>
          {this.props.models.map(this.renderModel)}
        </div>
        <NewModelModal
          ref={this.setNewModelModal}
          createModel={this.props.createModel}
          copyModel={this.props.copyModel}
        />
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
  copyModel: React.PropTypes.func.isRequired,
  models: React.PropTypes.array.isRequired,
  loading: React.PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    models: state.allModels,
    loading: state.loading
  };
}

export default connect(mapStateToProps, {
  deleteModel, createModel, copyModel, loadModels })(ModelList);
