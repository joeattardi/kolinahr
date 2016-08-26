import React from 'react';
import { connect } from 'react-redux';

function EmptyNotification(props) {
  if (props.cards.impact.length === 0) {
    return (
      <div className="notification notification-info">
        <i className="fa fa-info-circle" />
        <strong>The logic model is empty.</strong> Add an Impact to get started.
      </div>
    );
  }

  return <div />;
}

EmptyNotification.propTypes = {
  cards: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

export default connect(mapStateToProps)(EmptyNotification);
