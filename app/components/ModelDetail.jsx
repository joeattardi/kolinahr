import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { withRouter } from 'react-router';
import autoBind from 'auto-bind';

import EditCardModal from './EditCardModal';
import SaveButton from './SaveButton';
import Column from './Column';
import Title from './Title';
import Canvas from './Canvas';
import ErrorBanner from './ErrorBanner';
import EmptyBanner from './EmptyBanner';
import Tooltip from './Tooltip';
import { loadModel, setPrivate } from '../actions';
import socketClient from '../socketClient';

import '../images/loading.gif';

class ModelDetail extends React.Component {
  constructor(props) {
    super(props);

    autoBind(this);
  }

  componentDidMount() {
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    this.props.loadModel(this.props.routeParams.modelId);
    socketClient.startEditing(this.props.routeParams.modelId);
  }

  componentWillUnmount() {
    socketClient.stopEditing(this.props.routeParams.modelId);
  }

  togglePrivate() {
    this.props.setPrivate(!this.props.privateModel);
  }

  renderSave() {
    return this.props.auth ? <SaveButton /> : <span />;
  }

  renderPrivate() {
    if (this.props.auth) {
      return (
        <Tooltip text="Only visible to logged in users">
          <div>
            <input
              type="checkbox" id="private-model-checkbox"
              checked={this.props.privateModel} onChange={this.togglePrivate}
            />
            <label htmlFor="private-model-checkbox">Private</label>
          </div>
        </Tooltip>
      );
    }

    return <div />;
  }

  render() {
    if (this.props.loading) {
      return <img className="loadingIndicator" alt="Loading" src="/loading.gif" />;
    }
    return (
      <div id="model-detail">
        <div className="title-area">
          <Title />
          {this.renderPrivate()}
          {this.renderSave()}
        </div>
        <ErrorBanner />
        <EmptyBanner />
        <div id="column-container">
          <Column stateKey="inputs" name="Inputs" linkKey="activities" className="column" />
          <Canvas left="inputs" right="activities" />
          <Column stateKey="activities" name="Activities" linkKey="outputs" className="column" />
          <Canvas left="activities" right="outputs" />
          <Column stateKey="outputs" name="Outputs" linkKey="outcomes" className="column" />
          <Canvas left="outputs" right="outcomes" />
          <Column
            stateKey="outcomes" name="Outcomes" linkKey="impact" className="column column-dark"
          />
          <Canvas left="outcomes" right="impact" />
          <Column stateKey="impact" name="Impact" className="column column-dark" />
        </div>
        <EditCardModal />
      </div>
    );
  }
}

ModelDetail.propTypes = {
  privateModel: React.PropTypes.bool.isRequired,
  auth: React.PropTypes.bool.isRequired,
  loadModel: React.PropTypes.func.isRequired,
  setPrivate: React.PropTypes.func.isRequired,
  routeParams: React.PropTypes.object.isRequired,
  loading: React.PropTypes.bool.isRequired,
  router: React.PropTypes.object.isRequired,
  route: React.PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    loading: state.loading,
    auth: state.auth,
    privateModel: state.privateModel
  };
}

export default compose(
  DragDropContext(HTML5Backend),
  connect(mapStateToProps, { loadModel, setPrivate })
)(withRouter(ModelDetail));

