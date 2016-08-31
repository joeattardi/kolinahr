import moment from 'moment';
import React from 'react';
import { Link } from 'react-router';

export default class ModelListItem extends React.Component {
  render() {
    const { model } = this.props;

    return (
      <div className="model-list-item">
        <Link to={`/edit/${model._id}`}>
          <i className="fa fa-file-text-o" /> {model.title}
        </Link>
        <i onClick={() => this.props.deleteModel(model._id)} className="fa fa-trash-o" />
        <div className="model-list-item-timestamp">
          Created {moment(model.created).fromNow()},
          updated {moment(model.updated).fromNow()}
        </div>
      </div>
    );
  }
}

ModelListItem.propTypes = {
  model: React.PropTypes.object.isRequired,
  deleteModel: React.PropTypes.func.isRequired
};
