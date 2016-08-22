import React from 'react';

export default class Tooltip extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };

    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.setTooltipContainer = this.setTooltipContainer.bind(this);
    this.setTooltipBody = this.setTooltipBody.bind(this);
  }

  setTooltipContainer(element) {
    this.tooltipContainer = element;
  }

  setTooltipBody(element) {
    this.tooltipBody = element;
  }

  handleMouseOver() {
    this.setState({
      show: true,
      top: this.tooltipContainer.offsetTop + this.tooltipContainer.offsetHeight,
      left: this.tooltipContainer.offsetLeft +
        (this.tooltipContainer.offsetWidth / 2) - (this.tooltipBody.offsetWidth / 2)
    });
  }

  handleMouseOut() {
    this.setState({
      show: false
    });
  }


  render() {
    return (
      <div className="tooltip-container">
        <div
          ref={this.setTooltipContainer}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
        >
          {this.props.children}
        </div>
        <div
          style={{
            visibility: this.state.show ? 'visible' : 'hidden',
            top: this.state.top,
            left: this.state.left
          }}
          className={`tooltip ${this.props.className}`}
        >
          <div className="arrow" />
          <div ref={this.setTooltipBody} className="tooltip-body">{this.props.text}</div>
        </div>
      </div>
    );
  }
}

Tooltip.propTypes = {
  text: React.PropTypes.string.isRequired,
  children: React.PropTypes.object.isRequired
};
