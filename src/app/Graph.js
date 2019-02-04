/* eslint no-param-reassign: ["error", { "props": false }] */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisGraph from 'react-graph-vis';
import graphOpts from './graph.config';
import { config } from './app.props';
import {
  setBigCircleNodes,
  setSmallCircleNodes,
  setSmallCircleTextNodes,
  setBigCircleTextNodes,
  getBigCircleEdges,
  MAX_SVG_DRAW_WIDTH,
} from '../helpers';

const simpleEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

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
      groups: {},
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
    if (!simpleEqual(nextProps.data, data) && this.state.network) {
      console.log('cwrp');
      this.setState(prevState => ({
        data: this.setStateFromProps(nextProps.data, prevState.network),
      }));
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

  setStateFromProps = (data = null, nw = null) => {
    if (!data || !nw) {
      return console.error('network instance or props not valid');
    }
    const xViewportOffset = 300;
    const yViewportOffset = 300;
    // Counting nodes for the big circle
    const nodesCount = data.nodes.filter(n => n.id > 5).length;
    const dotNodes = data.nodes
      .map(node => setBigCircleNodes(node, nodesCount, nw))
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
      .map(node => setSmallCircleNodes(node, 4, nw));

    const textNodes = data.nodes
      .map(node => setSmallCircleTextNodes(node, 4, nw, dotNodes.length))
      .map(node => setBigCircleTextNodes(node, nodesCount, dotNodes.length));

    const groups = data.nodes.reduce(
      (acc, curr) => ({
        ...acc,
        [`group-${curr.wpId}`]: {
          color: {
            hover: { background: 'red' },
            background: 'white',
            highlight: 'white',
          },
          font: { color: 'white' },
          chosen: {
            label(values, id, selected, hovering) {
              console.log(values, id, selected, hovering);
              if (hovering) {
                values.color = 'red'; // eslint-disable-line
              }
            },
            node(values, id, selected, hovering) {
              if (hovering) {
                values.color = 'red'; // eslint-disable-line
              }
            },
          },
        },
      }),
      {},
    );

    const newData = {
      edges: [...data.edges, ...getBigCircleEdges(data.nodes)],
      nodes: [...dotNodes, ...textNodes],
      groups,
    };

    return {
      network: nw,
      data: newData,
    };
  };

  setNetworkInstance = (nw) => {
    const newState = this.setStateFromProps(this.props.data, nw);
    return this.setState({ ...newState });
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
    const canvasWidth = ctx.canvas.width > MAX_SVG_DRAW_WIDTH
      ? MAX_SVG_DRAW_WIDTH : ctx.canvas.width;
    const canvasHeight = ctx.canvas.height > MAX_SVG_DRAW_WIDTH
      ? MAX_SVG_DRAW_WIDTH : ctx.canvas.height;
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
        options={{ ...options, groups: data.groups }}
        events={events}
      />
    );
  }
}
