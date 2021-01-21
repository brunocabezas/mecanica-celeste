/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisGraph from 'react-graph-vis';
import { config, dataProps } from './app.props';
import { MAX_SVG_DRAW_WIDTH } from '../selectors/dotNodes';
import { VISITED_NODE_COLOR } from './app.static';

const afterZoomLimit = {
  position: { x: 0, y: 0 },
  scale: 0.49,
};

export default class Graph extends Component {
  static propTypes = {
    data: dataProps,
    options: config.isRequired,
    onClick: PropTypes.func.isRequired,
    groupsVisited: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    setNetworkInstance: PropTypes.func,
    show: PropTypes.bool,
  };

  static defaultProps = {
    data: {
      nodes: [],
      edges: [],
      groups: {},
    },
    setNetworkInstance: null,
    show: true,
  };

  state = {
    /* graph instance */
    network: null,
    options: this.props.options,
  };

  componentWillReceiveProps = (nextProps) => {
    const { groupsVisited, options } = nextProps;

    // If groups visited change, updating state options styles
    if (
      JSON.stringify(groupsVisited) !== JSON.stringify(this.props.groupsVisited)
    ) {
      // Getting visited groups style
      const opts = Object.assign({}, options, {
        groups: Object.keys(Object.assign({}, options.groups)).reduce(
          (acc, curr) => {
            // if current group has been visited, adding styles
            if (groupsVisited.includes(curr)) {
              acc[curr] = Object.assign({}, options.groups[curr], {
                chosen: (values) => {
                  values.color = VISITED_NODE_COLOR;
                },
                font: { color: VISITED_NODE_COLOR, face: 'Roboto' },
                color: {
                  background: VISITED_NODE_COLOR,
                  highlight: VISITED_NODE_COLOR,
                },
              });
            }
            return acc;
          },
          {},
        ),
      });
      this.state.network.setOptions(opts);
      this.setState({ options: opts });
      // If options are different, updating state
    } else if (JSON.stringify(options) !== JSON.stringify(this.props.options)) {
      this.setState({ options });
    }
  };

  hoverNode = ({ event }) => {
    event.target.style.cursor = 'pointer';
  };

  blurNode = ({ event }) => {
    const { network } = this.state;
    network.editNode();
    event.target.style.cursor = 'auto';
    network.disableEditMode();
    network.unselectAll();
  };

  setNetworkInstance = (nw) => {
    const { setNetworkInstance } = this.props;
    if (setNetworkInstance) {
      setNetworkInstance(nw);
    }
    return this.setState({ network: nw });
  };

  setLabelColor = (values, id) => {
    const {
      data: { nodes },
    } = this.state;
    const node = nodes.find(n => n.id === id);
    if (node) values.color = node.category ? node.category.color : node.color;
  };

  onNodeClick = (args) => {
    const { nodes } = args;
    const { onClick } = this.props;
    if (nodes.length === 1 && nodes[0]) {
      // Open video modal
      onClick(nodes[0]);
    }
  };

  onZoom = () => {
    const { network } = this.state;
    // Limitting zoom to 0,49 scale
    if (network.getScale() <= 0.49) {
      network.moveTo(afterZoomLimit);
    }
  };

  // draw main white dashed cross with its lines
  drawCross = (ctx) => {
    const canvasWidth = ctx.canvas.width > MAX_SVG_DRAW_WIDTH
      ? MAX_SVG_DRAW_WIDTH
      : ctx.canvas.width;
    const canvasHeight = ctx.canvas.height > MAX_SVG_DRAW_WIDTH
      ? MAX_SVG_DRAW_WIDTH
      : ctx.canvas.height;
    const width = (canvasWidth * 2) / 3;
    const height = canvasHeight;
    const heightDivideBy4 = height / 4;
    // Height is divide by 4; the cross is twice as big as one line
    const lineHeight = heightDivideBy4 + 15;
    const crossHeight = heightDivideBy4 * 2 - 30;
    // Axis zeros of the user viewport
    const xZero = -(width / 2);
    const yZero = -(height / 2);
    const verticalLinesInclination = 35;

    ctx.strokeStyle = 'white';
    // dashes of width/space_between with ratio of 1/4
    ctx.lineJoin = 'round';
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 4]);

    // First two vertical lines (Right and left)
    ctx.beginPath();
    ctx.moveTo(xZero + verticalLinesInclination, yZero);
    ctx.lineTo(xZero, yZero + lineHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xZero + width - verticalLinesInclination, yZero);
    ctx.lineTo(xZero + width, yZero + lineHeight);
    ctx.stroke();

    // Lines that make the central cross
    ctx.beginPath();
    ctx.moveTo(xZero, yZero + lineHeight);
    ctx.lineTo(xZero + width, yZero + crossHeight + lineHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xZero, yZero + lineHeight + crossHeight);
    ctx.lineTo(xZero + width, yZero + lineHeight);
    ctx.stroke();

    // Last two vertical lines (Right and left)
    ctx.beginPath();
    ctx.moveTo(xZero + width, yZero + lineHeight + crossHeight);
    ctx.lineTo(xZero + width - verticalLinesInclination, yZero + height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xZero, yZero + lineHeight + crossHeight);
    ctx.lineTo(xZero + verticalLinesInclination, yZero + height);
    ctx.stroke();
  };

  render() {
    console.log('Graph data', this.props.data);
    const { show, data } = this.props;
    const { options } = this.state;
    const events = {
      zoom: this.onZoom,
      click: this.onNodeClick,
      hoverNode: this.hoverNode,
      blurNode: this.blurNode,
      beforeDrawing: this.drawCross,
    };
    return !show ? null : (
      <VisGraph
        getNetwork={this.setNetworkInstance}
        graph={data}
        options={options}
        events={events}
      />
    );
  }
}
