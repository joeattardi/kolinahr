import React from 'react';
import { connect } from 'react-redux';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.setCanvasElement = this.setCanvasElement.bind(this);
    this.setCanvasContainer = this.setCanvasContainer.bind(this);
  }

  componentDidUpdate() {
    const ctx = this.canvasElement.getContext('2d');
    ctx.lineWidth = 3;
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    const { left, cards, cardOffsets } = this.props;

    cards[left].forEach(card => {
      if (card.links) {
        card.links.forEach(link => {
          const srcOffset = cardOffsets[card.id];
          const destOffset = cardOffsets[link];

          ctx.beginPath();

          const srcX = 0;
          const srcY = this.getYCoordinate(srcOffset);
          ctx.moveTo(srcX, srcY);

          const destX = this.canvasElement.offsetWidth - 1;
          const destY = this.getYCoordinate(destOffset);
          ctx.lineTo(destX, destY);
          ctx.stroke();

          ctx.closePath();
        });
      }
    });
  }

  getYCoordinate(offset) {
    /* eslint-disable no-mixed-operators */
    return offset.top - this.canvasContainer.offsetTop - this.canvasElement.offsetTop +
      (offset.height / 2);
  }

  setCanvasElement(element) {
    this.canvasElement = element;
  }

  setCanvasContainer(element) {
    this.canvasContainer = element;
  }

  render() {
    return (
      <div ref={this.setCanvasContainer} className="canvas-container">
        <canvas ref={this.setCanvasElement} width="25" height="500" />
      </div>
    );
  }
}

Canvas.propTypes = {
  left: React.PropTypes.string.isRequired,
  right: React.PropTypes.string.isRequired,
  cardOffsets: React.PropTypes.object.isRequired,
  cards: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
    cardOffsets: state.cardOffsets
  };
}

export default connect(mapStateToProps)(Canvas);
