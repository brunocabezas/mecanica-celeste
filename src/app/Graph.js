/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisGraph from 'react-graph-vis';
import graphOpts from './graph.config';
import { config } from './app.props';

// max width of the drawing
const MAX_WIDTH = 600;
const WIDTH_CONSTRAINT = 100;
// helper to count nodes belonging to the bigger circle
let biggerCircleNodesCount = 0;
let biggerCircleTextNodesCount = 0;

// Saves configuration to have custom position to text labels
const getTextOffset = (id) => {
  switch (id) {
    case 1:
      return { x: WIDTH_CONSTRAINT / 2 + 10, y: 0 };
    case 2:
      return { x: 0, y: 10 };
    case 4:
      return { x: 0, y: -10 };
    default:
      return { x: -WIDTH_CONSTRAINT / 2 - 10, y: 0 };
  }
};

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
    options: config,
    onClick: PropTypes.func.isRequired,
    show: PropTypes.bool,
  };

  static defaultProps = {
    data: {
      nodes: [],
      edges: [],
    },
    show: false,
    options: graphOpts,
  };

  afterzoomlimit = {
    position: { x: 0, y: 0 },
    scale: 0.49,
  };

  /* eslint-disable react/destructuring-assignment */
  state = {
    /* graph instance */
    network: null,
    data: {
      nodes: this.props.data ? this.props.data.nodes : [],
      edges: this.props.data ? this.props.data.edges : [],
    },
  };
  /* eslint-disable react/destructuring-assignment */

  componentWillReceiveProps = (nextProps) => {
    const { data } = this.props;
    if (nextProps.data && (!data || !data.nodes)) {
      this.setState({
        data: nextProps.data,
      });
      const { network } = this.state;
      if (network) {
        network.moveTo({ position: { x: 0, y: 0 } });
      }
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

  hoverEdge = () => {
    /* console.log(this.state.network.getConnectedNodes(a.edge))
    console.log("hoverEdge",a); */
  };

  setNetworkInstance = (nw) => {
    const { data } = this.props;
    // When getting instance; modify biggerCircleNodes coordinates to fit already existing drawing
    // X and Y offsets depend on the viewport; the drawing has MAX_WIDTH as constant and if
    // viewport is bigger using (300, 300) as default
    const xViewportOffset = nw.canvas.canvasViewCenter.x * 2 > MAX_WIDTH ? 300 : nw.canvasViewCenter / 2;
    const yViewportOffset = nw.canvas.canvasViewCenter.y * 2 > MAX_WIDTH ? 300 : nw.canvasViewCenter / 2;
    // Counting nodes for the big circle
    const nodesCount = data.nodes.filter(n => n.id > 5).length;
    const dotNodes = data.nodes
      .map(node => this.setBigCircleNodes(node, nodesCount, nw))
      .map((n) => {
        if (n.id > 5) {
          return {
            ...n,
            x: n.x - xViewportOffset,
            y: n.y - yViewportOffset,
          };
        }
        return n;
      })
      .map(node => this.setSmallCircleNodes(node, 4, nw));

    const textNodes = data.nodes
      .map(node => this.setSmallCircleTextNodes(node, 4, nw, dotNodes.length))
      .map(node => this.setBigCircleTextNodes(node, nodesCount, nw, dotNodes.length));
    // Transforming nodes to set state
    this.setState(
      {
        network: nw,
        data: {
          edges: [...data.edges, ...this.getBigCircleEdges(data.nodes)],
          nodes: [...dotNodes, ...textNodes],
        },
      },
      () => {
        nw.moveTo({ position: { x: 0, y: 0 } });
      },
    );
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
    // this.state.network.moveTo({position})
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
    const canvasWidth = ctx.canvas.width > MAX_WIDTH ? MAX_WIDTH : ctx.canvas.width;
    const canvasHeight = ctx.canvas.height > MAX_WIDTH ? MAX_WIDTH : ctx.canvas.height;
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

    // console.log(ctx.canvas.width, ctx.canvas.height, ctx);
  };

  setBigCircleNodes = (node = [], nodesCount = 0, networkInstance = null) => {
    const { network } = this.state;
    if (node.id <= 5 || (!network && !networkInstance)) {
      console.warn('No network instance');
      return node;
    }
    const instance = networkInstance || network;
    const canvasWidth = instance.canvas.width || instance.canvas.canvasViewCenter.x * 2;
    const width = canvasWidth > MAX_WIDTH ? MAX_WIDTH : canvasWidth;
    // Calculate the angle at which the element will be placed.
    const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI;
    biggerCircleNodesCount += 1;
    return {
      ...node,
      physics: false,
      fixed: true,
      // For a semicircle, we would use (i / numNodes) * Math.PI.
      x: 200 * Math.cos(angle) + width / 2,
      y: 200 * Math.sin(angle) + width / 2,
    };
  };

  setSmallCircleNodes = (node = [], nodesCount = 0, networkInstance = null) => {
    const xOffset = -35;
    const yOffset = -45;
    const { network } = this.state;
    if (node.id > 4 || (!network && !networkInstance)) {
      console.warn('No network instance');
      return node;
    }
    const instance = networkInstance || network;
    const canvasWidth = instance.canvas.width || instance.canvas.canvasViewCenter.x * 2;
    const width = canvasWidth > 75 ? 75 : canvasWidth;
    // Calculate the angle at which the element will be placed.
    const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI;
    biggerCircleNodesCount += 1;
    return {
      ...node,
      physics: false,
      fixed: true,
      // For a semicircle, we would use (i / numNodes) * Math.PI.
      x: 75 * Math.cos(angle) + width / 2 + xOffset,
      y: 75 * Math.sin(angle) + width / 2 + yOffset,
    };
  };

  setSmallCircleTextNodes = (
    node = {},
    nodesCount = 0,
    networkInstance = null,
    dotNodesCount = 0,
  ) => {
    const xOffset = -35;
    const yOffset = -45;
    const { network } = this.state;
    if (node.id > 5 || (!network && !networkInstance)) {
      console.warn('No network instance');
      return { ...node, id: dotNodesCount + node.id };
    }
    if (node.id === 5) {
      return {
        ...node,
        shape: 'text',
        label: node.wpLabel,
        x: 0,
        y: 0,
      };
    }
    const textOffset = getTextOffset(node.id);
    const instance = networkInstance || network;
    const canvasWidth = instance.canvas.width || instance.canvas.canvasViewCenter.x * 2;
    const width = canvasWidth > 75 ? 75 : canvasWidth;
    // Calculate the angle at which the element will be placed.
    const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI;
    biggerCircleNodesCount += 1;
    // Limiting width if nodes is left or right
    const widthConstraint = node.id === 1 || node.id === 3 ? WIDTH_CONSTRAINT : false;
    const textAlign = node.id === 3 ? 'right' : 'left';
    console.log(dotNodesCount + node.id);
    return {
      ...node,
      id: dotNodesCount + node.id,
      physics: false,
      fixed: true,
      shape: 'text',
      label: node.wpLabel,
      font: { align: textAlign },
      widthConstraint,
      // For a semicircle, we would use (i / numNodes) * Math.PI.
      x: 75 * Math.cos(angle) + width / 2 + xOffset + textOffset.x,
      y: 75 * Math.sin(angle) + width / 2 + yOffset + textOffset.y,
    };
  };

  setBigCircleTextNodes = (
    node = {},
    nodesCount = 0,
    networkInstance = null,
    dotNodesCount = 0,
  ) => {
    const { network } = this.state;
    const topId = 5 + dotNodesCount;
    if (node.id <= topId || (!network && !networkInstance)) {
      console.warn('No network instance');
      return node;
    }
    // Calculate the angle at which the element will be placed.
    const angle = (biggerCircleTextNodesCount / (nodesCount / 2)) * Math.PI;
    biggerCircleTextNodesCount += 1;
    const textAlign = biggerCircleTextNodesCount < nodesCount ? 'right' : 'left';
    return {
      ...node,
      id: dotNodesCount + node.id,
      physics: false,
      fixed: true,
      font: { align: textAlign },
      shape: 'text',
      widthConstraint: WIDTH_CONSTRAINT,
      label: node.wpLabel,
      // For a semicircle, we would use (i / numNodes) * Math.PI.
      x: (450 * Math.cos(angle)) / 2,
      y: (450 * Math.sin(angle)) / 2,
    };
  };

  getBigCircleEdges = (nodes = []) => {
    // const smoothH = { enabled: true, type: "horizontal", roundness: 0.5 };
    // const smoothV = { enabled: true, type: "vertical", roundness: 0.5 };
    const count = nodes.filter(n => n.id > 5).length;
    return [
      ...nodes
        .filter(n => n.id > 5)
        .map(n => ({
          from: n.id,
          to: n.id + 1,
          dashes: [1, 4],
        }))
        .slice(0, -1), // Removing last item
      //  From the lasxt one to the start of big circle nodes
      { from: 5 + count, to: 6, dashes: [1, 4] },
    ];
  };

  render() {
    const { data } = this.state;
    const { options, show } = this.props;

    const events = {
      zoom: this.onZoom,
      click: this.onNodeClick,
      hoverNode: this.hoverNode,
      blurNode: this.blurNode,
      beforeDrawing: this.drawCross,
    };

    return !show || !data || !data.nodes ? null : (
      <VisGraph
        getNetwork={this.setNetworkInstance}
        graph={data}
        options={options}
        events={events}
      />
    );
  }
}
