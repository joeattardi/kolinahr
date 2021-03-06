import React from 'react';
import { connect } from 'react-redux';

function EmptyBanner(props) {
  if (props.cards.impact.length === 0) {
    return (
      <div className="banner banner-info">
        <h2>The logic model is empty.</h2>
        Add an Impact to get started.
      </div>
    );
  }

  return <div />;
}

EmptyBanner.propTypes = {
  cards: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.cards
  };
}

export default connect(mapStateToProps)(EmptyBanner);
