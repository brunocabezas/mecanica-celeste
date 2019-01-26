import React, { Component } from "react";
import PropTypes from "prop-types";
import VisGraph from "react-graph-vis";
import graphOpts from "./graph.config";

let biggerCircleNodesCount = 0;
const MAX_WIDTH = 600;
export default class Graph extends Component {
  static props = {
    data: PropTypes.shape({
      /* todo define node properties */
      nodes: PropTypes.array,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          from: PropTypes.number,
          to: PropTypes.number
        })
      )
    }),
    options: PropTypes.object,
    onClick: PropTypes.func,
    show: PropTypes.bool
  };

  static defaultProps = {
    data: {
      nodes: [],
      edges: []
    },
    events: null,
    options: graphOpts
  };

  afterzoomlimit = {
    position: { x: 0, y: 0 },
    scale: 0.49
  };

  state = {
    showLabel: false,
    /* graph instance */
    network: null,
    show: false,
    data: {
      nodes: this.props.data ? this.props.data.nodes : [],
      edges: this.props.data ? this.props.data.edges : []
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.data && (!this.props.data || !this.props.data.nodes)) {
      const nodesCount = nextProps.data.nodes.filter(n => n.id > 5).length;

      this.setState({
        data: {
          ...nextProps.data,
          nodes: nextProps.data.nodes.map(node =>
            this.setBigCircleNodes(node, nodesCount)
          )
        }
      });
      if (this.state.network) {
        this.state.network.moveTo({ position: { x: 0, y: 0 } });
      }
    }
  };

  hoverNode = ({ pointer, event, node }) => {
    event.target.style.cursor = "pointer";
  };

  blurNode = ({ pointer, event, node }) => {
    const { network } = this.state;
    network.editNode();
    event.target.style.cursor = "auto";
    network.disableEditMode();
    network.unselectAll();
  };

  hoverEdge = a => {
    /*console.log(this.state.network.getConnectedNodes(a.edge))
    console.log("hoverEdge",a);*/
  };

  setNetworkInstance = nw => {
    const { data } = this.props;
    // When getting instance; modify biggerCircleNodes axis to fit viewport
    const xViewportOffset =
      nw.canvas.canvasViewCenter.x * 2 > 600 ? 300 : nw.canvasViewCenter / 2;
    const yViewportOffset =
      nw.canvas.canvasViewCenter.y * 2 > 600 ? 300 : nw.canvasViewCenter / 2;
    const nodesCount = [...data.nodes].filter(n => n.id > 5).length;
    const network = {
      canvas: { width: nw.canvas.width, height: nw.canvas.height }
    };
    console.log(network, nw);
    const nodes = data.nodes

      .map(node => this.setBigCircleNodes(node, nodesCount, nw))
      .map(n => {
        if (n.id > 5) {
          return {
            ...n,
            x: n.x - xViewportOffset,
            y: n.y - yViewportOffset
          };
        } else return n;
      });
    console.log(nodes);
    this.setState(
      {
        network: nw,
        show: true,
        data: { ...data, nodes }
      },
      () => {
        nw.moveTo({ position: { x: 0, y: 0 } });
      }
    );
  };

  setLabelColor = (values, id, selected, hovering) => {
    const node = this.state.data.nodes.find(n => n.id === id);
    if (node) values.color = node.category ? node.category.color : node.color;
  };

  onNodeClick = ({ nodes, event, ...others }) => {
    if (nodes.length > 0) {
      /*this.state.network.focus(nodes[0],{animation: {             // animation object, can also be Boolean
        duration: 1000,                 // animation duration in milliseconds (Number)
        easingFunction: "easeInOutQuad" // Animation easing function, available are:
      }       })*/
    }
    // const position = event.center;
    if (nodes.length === 1 && nodes[0]) {
      // opening modal
      this.props.onClick(nodes[0]);
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
  drawCross = ctx => {
    const canvasWidth =
      ctx.canvas.width > MAX_WIDTH ? MAX_WIDTH : ctx.canvas.width;
    const canvasHeight =
      ctx.canvas.height > MAX_WIDTH ? MAX_WIDTH : ctx.canvas.height;
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

    ctx.strokeStyle = "white";
    // dashes of width/space_between with ratio of 1/4
    ctx.lineJoin = "round";
    ctx.lineWidth = 0.5;
    ctx.setLineDash([2, 4]);

    //First two vertical lines (Right and left)
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

    //Last two vertical lines (Right and left)
    ctx.beginPath();
    ctx.moveTo(xZero + width, yZero + lineHeight + crossHeight);
    ctx.lineTo(xZero + width - verticalLinesInclination, yZero + height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xZero, yZero + lineHeight + crossHeight);
    ctx.lineTo(xZero + verticalLinesInclination, yZero + height);
    ctx.stroke();

    //console.log(ctx.canvas.width, ctx.canvas.height, ctx);
    //console.log("x1:", xZero + 20, yZero, "x2", xZero, yZero + lineHeight);
  };

  setBigCircleNodes = (node = [], nodesCount = 0, networkInstance = null) => {
    const xOffset = 0;
    const yOffset = -0;
    if (!this.state.network && !networkInstance) {
      console.error("No network instance");
      return node;
    }
    const network = networkInstance || this.state.network;
    console.log(networkInstance);
    const canvasWidth =
      network.canvas.width || network.canvas.canvasViewCenter.x * 2;
    const width = canvasWidth > MAX_WIDTH ? MAX_WIDTH : canvasWidth;
    const canvasHeight =
      network.canvas.height > MAX_WIDTH ? MAX_WIDTH : network.canvas.height;
    if (node.id <= 5) {
      return node;
    }
    const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
    biggerCircleNodesCount += 1;
    console.log("x", 200 * Math.cos(angle) + width / 2, node.label);
    console.log("y", 200 * Math.sin(angle) + width / 2, node.label);
    return {
      ...node,
      physics: false,
      fixed: true,
      // For a semicircle, we would use (i / numNodes) * Math.PI.
      x: 200 * Math.cos(angle) + width / 2 + xOffset,
      y: 200 * Math.sin(angle) + width / 2 + yOffset
    };
  };
  render() {
    const { data } = this.state;
    let options = this.props.options;
    //options.nodes.chosen.label = this.setLabelColor;
    const events = {
      zoom: this.onZoom,
      click: this.onNodeClick,
      hoverNode: this.hoverNode,
      blurNode: this.blurNode,
      beforeDrawing: this.drawCross
    };

    console.log(options);
    if (this.state.network) {
      console.log(this.state.network.getViewPosition());
    }
    return !this.props.show || !data || !data.nodes ? null : (
      <VisGraph
        getNetwork={this.setNetworkInstance}
        graph={data}
        options={options}
        events={events}
      />
    );
  }
}
