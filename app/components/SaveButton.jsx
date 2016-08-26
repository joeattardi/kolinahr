import React from 'react';
import { connect } from 'react-redux';

import { saveData } from '../actions/index';

function SaveButton(props) {
  if (props.saving) {
    return <button id="save-button" disabled className="button-primary-disabled">Save</button>;
  }

  return (
    <button
      onClick={props.saveData}
      id="save-button"
      className="button-primary"
    >
      Save
    </button>
  );
}

SaveButton.propTypes = {
  saving: React.PropTypes.bool.isRequired,
  saveData: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    saving: state.saving
  };
}

export default connect(mapStateToProps, { saveData })(SaveButton);
