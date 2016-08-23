import React from 'react';
import { connect } from 'react-redux';

function ErrorNotification(props) {
  if (Object.keys(props.validationErrors).length > 0) {
    return (
      <div className="notification notification-error">
        <i className="fa fa-exclamation-triangle" />
        <strong>The logic model is not complete.</strong> One or more cards are missing links.
      </div>
    );
  }

  return <div />;
}

ErrorNotification.propTypes = {
  validationErrors: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    validationErrors: state.validationErrors
  };
}

export default connect(mapStateToProps)(ErrorNotification);
