import moment from 'moment';
import React from 'react';
import autoBind from 'auto-bind';
import { Link } from 'react-router';

import modelIcon from '../images/model.png';

import DropDownMenu from './DropDownMenu';
import DropDownItem from './DropDownItem';

export default class ModelListItem extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  deleteModel() {
    this.props.deleteModel(this.props.model._id);
  }

  copyModel() {
    this.props.copyModel(this.props.model._id);
  }

  renderAction() {
    if (this.props.auth) {
      return (
        <div className="model-list-item-buttons">
          <DropDownMenu title="Actions">
            <DropDownItem onClick={this.deleteModel}>
              <span className="delete"><i className="fa fa-trash-o" /> Delete</span>
            </DropDownItem>
            <DropDownItem onClick={this.copyModel}>
              <i className="fa fa-files-o" /> Copy
            </DropDownItem>
          </DropDownMenu>
        </div>
      );
    }

    return <span />;
  }

  render() {
    const { model } = this.props;

    return (
      <div className="model-list-item">
        <div className="icon"><img src={modelIcon} alt="Logic Model" width="62" height="51" /></div>
        <div>
          <Link to={`/edit/${model._id}`}>
            {model.title}
          </Link>
          <div className="model-list-item-timestamp">
            Created {moment(model.created).fromNow()} by
            <img src={model.createdBy.picture} className="user-image" alt="" />
            <strong>{model.createdBy.name}</strong><br />
            Updated {moment(model.updated).fromNow()} by
            <img src={model.updatedBy.picture} alt="" className="user-image" />
            <strong>{model.updatedBy.name}</strong>
          </div>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

ModelListItem.propTypes = {
  auth: React.PropTypes.bool.isRequired,
  model: React.PropTypes.object.isRequired,
  deleteModel: React.PropTypes.func.isRequired,
  copyModel: React.PropTypes.func.isRequired
};
