import React, { Component } from "react";
import PropTypes from "prop-types";
import VisGraph from "react-graph-vis";
import graphOpts from "./graph.config";

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
      this.setState({ data: nextProps.data });
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
    const xViewportOffset = nw.canvas.canvasViewCenter.x / 2;
    const yViewportOffset = nw.canvas.canvasViewCenter.y / 2;
    console.log(xViewportOffset, nw, nw.canvas.width);
    const nodes = data.nodes.map(n => {
      if (n.id > 5) {
        return {
          ...n,
          x: n.x - xViewportOffset,
          y: n.y - yViewportOffset
        };
      } else return n;
    });
    this.setState({
      network: nw,
      show: true,
      data: { ...data, nodes }
    });
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
    const width = (ctx.canvas.width * 2) / 3;
    const height = ctx.canvas.height;
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
