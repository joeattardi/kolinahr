import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import { loadModels } from '../actions';

class ModelList extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidMount() {
    this.props.loadModels();
  }

  renderModel(model) {
    /* eslint-disable no-underscore-dangle */
    return <li key={model._id}>{model.title}</li>;
  }

  render() {
    return (
      <div>
        <h2>Logic Models</h2>
        <button className="button-primary"><i className="fa fa-plus" /> New</button>
        <button onClick={this.props.loadModels}><i className="fa fa-refresh" /> Refresh</button>
        <div id="model-list">
          <ul>
            {this.props.models.map(this.renderModel)}
          </ul>
        </div>
      </div>
    );
  }
}

ModelList.propTypes = {
  loadModels: React.PropTypes.func.isRequired,
  models: React.PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    models: state.allModels
  };
}

export default connect(mapStateToProps, { loadModels })(ModelList);
