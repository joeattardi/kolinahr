import React from 'react';

export default function DropDownItem(props) {
  return (
    <button onClick={props.onClick}>{props.children}</button>
  );
}

DropDownItem.propTypes = {
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func.isRequired
};
