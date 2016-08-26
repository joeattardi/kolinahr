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
    const { columnOffsets, cardOffsets, left, right } = this.props;

    if (columnOffsets[left] && columnOffsets[right]) {
      const cardOffset = cardOffsets[Object.keys(cardOffsets)[0]];

      if (cardOffset) {
        const leftVal = 5 + cardOffset.left - columnOffsets[cardOffset.column].left;
        this.canvasElement.style.left = `${-1 * leftVal}px`;

        const width = (leftVal * 2);
        return width;
      }
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

    const { left, cards, cardOffsets, columnOffsets } = this.props;

    const leftOffset = columnOffsets[left];
    if (cardOffsets[left]) {
      const leftCardOffset = cardOffsets[left][0];
      this.canvasElement.style.left = -1 * (leftOffset.left - leftCardOffset.width);
    }

    cards[left].forEach(card => {
      if (card.links) {
        card.links.forEach(link => {
          if (this.props.dragging !== card.id && this.props.dragging !== link) {
            const srcOffset = cardOffsets[card.id];
            const destOffset = cardOffsets[link];

            if (srcOffset && destOffset) {
              const srcX = 0;
              const srcY = this.getYCoordinate(srcOffset);
              ctx.moveTo(srcX, srcY);

              const destX = this.canvasElement.offsetWidth - 1;
              const destY = this.getYCoordinate(destOffset);

              this.drawArrow(ctx, srcX, srcY, destX, destY);

              ctx.closePath();
            }
          }
        });
      }
    });
  }

  drawArrow(context, fromx, fromy, tox, toy) {
    const headlen = 10;   // length of head in pixels
    const angle = Math.atan2(toy - fromy, tox - fromx);
    context.beginPath();
    context.moveTo(fromx, fromy);
    context.lineTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6),
      toy - headlen * Math.sin(angle - Math.PI / 6));
    context.moveTo(tox, toy);
    context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6),
      toy - headlen * Math.sin(angle + Math.PI / 6));
    context.stroke();
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
  cards: React.PropTypes.object.isRequired,
  dragging: React.PropTypes.string
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
