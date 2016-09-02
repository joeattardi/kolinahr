import React from 'react';

export default function DropDownMenu(props) {
  return (
    <div className="dropdown-menu">
      <button>{props.title} <i className="fa fa-caret-down" /></button>
      <div className="dropdown-content">
        {props.children}
      </div>
    </div>
  );
}

DropDownMenu.propTypes = {
  title: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired
};
