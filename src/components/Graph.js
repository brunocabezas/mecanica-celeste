/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisGraph from 'react-graph-vis';
import { config } from './app.props';
import { MAX_SVG_DRAW_WIDTH } from '../selectors/dotNodes';

export default class Graph extends Component {
  static propTypes = {
    data: PropTypes.shape({
      /* todo define node properties */
      nodes: PropTypes.array,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          from: PropTypes.number,
          to: PropTypes.number,
        }),
      ),
    }),
    options: config.isRequired,
    onClick: PropTypes.func.isRequired,
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

  afterzoomlimit = {
    position: { x: 0, y: 0 },
    scale: 0.49,
  };

  state = {
    /* graph instance */
    network: null,
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

  hoverEdge = () => {
    /* console.log(this.state.network.getConnectedNodes(a.edge))
    console.log("hoverEdge",a); */
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
      // opening modal
      onClick(nodes[0]);
    }
  };

  onZoom = () => {
    const { network } = this.state;
    // Limitting zoom to 0,49 scale
    if (network.getScale() <= 0.49) {
      network.moveTo(this.afterzoomlimit);
    }
  };

  // draw main white dashed cross with its lines
  drawCross = (ctx) => {
    const canvasWidth = ctx.canvas.width
      > MAX_SVG_DRAW_WIDTH ? MAX_SVG_DRAW_WIDTH : ctx.canvas.width;
    const canvasHeight = ctx.canvas.height
      > MAX_SVG_DRAW_WIDTH ? MAX_SVG_DRAW_WIDTH : ctx.canvas.height;
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
    // const { data } = this.state;
    const { options, show, data } = this.props;

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
