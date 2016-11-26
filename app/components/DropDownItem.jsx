import React from 'react';

export default function DropDownItem(props) {
  return (
    <button className={props.className} onClick={props.onClick}>{props.children}</button>
  );
}

DropDownItem.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node.isRequired,
  onClick: React.PropTypes.func.isRequired
};
