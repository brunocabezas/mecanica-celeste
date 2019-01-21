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
    show: true,
    events: null,
    options: graphOpts
  };

  state = {
    showLabel: false,
    /* graph instance */
    network: null,
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
    if (this.state.network) {
      const { network } = this.state;
      network.enableEditMode();
      event.target.style.cursor = "pointer";
      network.selectNodes([node]);
      network.editNode();
    }
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
    this.setState({
      network: nw
    });
  };

  setLabelColor = (values, id, selected, hovering) => {
    const node = this.state.data.nodes.find(n => n.id === id);
    if (node) values.color = node.category ? node.category.color : node.color;
  };

  onNodeClick = ({ nodes, event }) => {
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

  drawCross = ctx => {
    const width = (ctx.canvas.width * 2) / 3;
    const height = ctx.canvas.height;
    const heightDivideBy4 = height / 4;
    // Height is divide by 4; the cross is twice as big as one line
    const lineHeight = heightDivideBy4;
    const crossHeight = heightDivideBy4 * 2;
    const xZero = -(width / 2);
    const yZero = -(height / 2);

    ctx.strokeStyle = "white";
    ctx.setLineDash([4]);

    //First two vertical lines (Right and left)
    ctx.beginPath();
    ctx.moveTo(xZero + 20, yZero);
    ctx.lineTo(xZero, yZero + lineHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xZero + width - 20, yZero);
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
    ctx.lineTo(xZero + width - 20, yZero + height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(xZero, yZero + lineHeight + crossHeight);
    ctx.lineTo(xZero + 20, yZero + height);
    ctx.stroke();

    console.log(ctx.canvas.width, ctx.canvas.height, ctx);
    console.log("x1:", xZero + 20, yZero, "x2", xZero, yZero + lineHeight);
  };

  render() {
    const { data } = this.state;
    let options = this.props.options;
    options.nodes.chosen.label = this.setLabelColor;
    const events = {
      click: this.onNodeClick,
      hoverNode: this.hoverNode,
      blurNode: this.blurNode,
      beforeDrawing: this.drawCross
    };

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
