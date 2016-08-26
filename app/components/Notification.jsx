import React from 'react';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';

import { hideNotification } from '../actions';

class Notification extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentDidUpdate() {
    if (this.element && this.props.notification) {
      const leftPosition = (window.innerWidth / 2) - (this.element.offsetWidth / 2);
      this.element.style.left = `${leftPosition}px`;
      this.element.className = 'notification';
      setTimeout(this.hideNotification, 5000);
    }
  }

  setElement(element) {
    this.element = element;
  }

  hideNotification() {
    this.element.className = 'notification notification-exit';
    setTimeout(this.props.hideNotification, 500);
  }

  render() {
    if (this.props.notification) {
      return (
        <div
          ref={this.setElement}
          className="notification"
        >
          <i className="fa fa-check-circle-o" /> {this.props.notification}
        </div>
      );
    }

    return <div />;
  }
}

Notification.propTypes = {
  notification: React.PropTypes.string,
  hideNotification: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    notification: state.notification
  };
}

export default connect(mapStateToProps, { hideNotification })(Notification);
