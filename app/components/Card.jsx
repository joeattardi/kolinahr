import React from 'react';

export default function Card(props) {
  return (
    <div className="card fade-in">
      {props.text}
    </div>
  );
}

Card.propTypes = {
  text: React.PropTypes.string.isRequired
};
