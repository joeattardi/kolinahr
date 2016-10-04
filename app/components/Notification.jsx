import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import { hideNotification } from '../actions';
import { NOTIFICATION_SUCCESS, NOTIFICATION_ERROR } from '../constants';

const NOTIFICATION_DURATION = 5000;
const NOTIFICATION_ANIMATION_DURATION = 500;

const icons = {
  [NOTIFICATION_SUCCESS]: 'fa-check-circle-o',
  [NOTIFICATION_ERROR]: 'fa-exclamation-triangle'
};

class Notification extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidUpdate() {
    if (this.element && this.props.notification) {
      const leftPosition = (window.innerWidth / 2) - (this.element.offsetWidth / 2);
      this.element.style.left = `${leftPosition}px`;
      this.element.className = `notification ${this.props.notification.type}`;
      setTimeout(this.hideNotification, NOTIFICATION_DURATION);
    }
  }

  setElement(element) {
    this.element = element;
  }

  getIcon() {
    return icons[this.props.notification.type] || 'fa-info-circle';
  }

  hideNotification() {
    if (this.props.notification && this.element) {
      this.element.className = `notification notification-exit ${this.props.notification.type}`;
      setTimeout(this.props.hideNotification, NOTIFICATION_ANIMATION_DURATION);
    }
  }

  render() {
    if (this.props.notification) {
      return (
        <div
          ref={this.setElement}
          className={`notification ${this.props.notification.type}`}
        >
          <i className={`fa ${this.getIcon()}`} /> {this.props.notification.message}
        </div>
      );
    }

    return <div />;
  }
}

Notification.propTypes = {
  notification: React.PropTypes.object,
  hideNotification: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

export default connect(mapStateToProps, { hideNotification })(Notification);
