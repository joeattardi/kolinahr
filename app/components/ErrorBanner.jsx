import React from 'react';
import { connect } from 'react-redux';

function ErrorBanner(props) {
  if (Object.keys(props.validationErrors).length > 0) {
    return (
      <div className="banner banner-error">
        <h2>The logic model is not complete.</h2>
        One or more cards are missing links.
      </div>
    );
  }

  return <div />;
}

ErrorBanner.propTypes = {
  validationErrors: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    validationErrors: state.validationErrors
  };
}

export default connect(mapStateToProps)(ErrorBanner);
