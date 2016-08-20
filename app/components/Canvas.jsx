import React from 'react';
import { connect } from 'react-redux';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.drawLines = this.drawLines.bind(this);
    this.setCanvasElement = this.setCanvasElement.bind(this);
    this.setCanvasContainer = this.setCanvasContainer.bind(this);

    this.calcWidth = this.calcWidth.bind(this);
    this.calcHeight = this.calcHeight.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.drawLines);
  }

  componentDidUpdate() {
    this.drawLines();
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

  calcWidth() {
    const { columnOffsets, left, right } = this.props;

    if (columnOffsets[left] && columnOffsets[right]) {
      const leftOffset = columnOffsets[left];
      const rightOffset = columnOffsets[right];

      const width = rightOffset.left - (leftOffset.left + leftOffset.width) + 30;
      return width;
    }

    return 30;
  }

  calcHeight() {
    const { columnOffsets, left, right } = this.props;

    if (columnOffsets[left] && columnOffsets[right]) {
      return Math.max(columnOffsets[left].height, columnOffsets[right].height);
    }

    return 500;
  }

  drawLines() {
    const ctx = this.canvasElement.getContext('2d');
    ctx.lineWidth = 3;
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    const { left, cards, cardOffsets } = this.props;

    cards[left].forEach(card => {
      if (card.links) {
        card.links.forEach(link => {
          if (this.props.dragging !== card.id && this.props.dragging !== link) {
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
          }
        });
      }
    });
  }

  render() {
    return (
      <div ref={this.setCanvasContainer} className="canvas-container">
        <canvas ref={this.setCanvasElement} width={this.calcWidth()} height={this.calcHeight()} />
      </div>
    );
  }
}

Canvas.propTypes = {
  left: React.PropTypes.string.isRequired,
  right: React.PropTypes.string.isRequired,
  cardOffsets: React.PropTypes.object.isRequired,
  columnOffsets: React.PropTypes.object.isRequired,
  cards: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    cards: state.cards,
    cardOffsets: state.cardOffsets,
    columnOffsets: state.columnOffsets,
    dragging: state.dragging
  };
}

export default connect(mapStateToProps)(Canvas);
