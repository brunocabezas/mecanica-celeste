import React, { Component } from "react";
import PropTypes from "prop-types";
import VisGraph from "react-graph-vis";
import graphOpts from "./graph.config";

const props = {
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

const defaultProps = {
  data: {
    nodes: [],
    edges: []
  },
  show: true,
  events: null,
  options: graphOpts
};

class Graph extends Component {
  constructor(props) {
    super(props);

    const { data } = this.props;

    this.state = {
      showLabel: false,
      /* graph instance */
      network: null,
      data: {
        nodes: data ? data.nodes : [],
        edges: data ? data.edges : []
      }
    };

    this.hoverNode = this.hoverNode.bind(this);
    this.hoverEdge = this.hoverEdge.bind(this);
    this.blurNode = this.blurNode.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
    this.setLabelColor = this.setLabelColor.bind(this);
    this.setNetworkInstance = this.setNetworkInstance.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && (!this.props.data || !this.props.data.nodes)) {
      this.setState({ data: nextProps.data });
    }
  }

  hoverNode({ pointer, event, node }) {
    if (this.state.network) {
      const { network } = this.state;
      network.enableEditMode();
      event.target.style.cursor = "pointer";
      network.selectNodes([node]);
      network.editNode();
    }
  }

  blurNode({ pointer, event, node }) {
    const { network } = this.state;
    network.editNode();
    event.target.style.cursor = "auto";
    network.disableEditMode();
    network.unselectAll();
  }

  hoverEdge(a) {
    /*console.log(this.state.network.getConnectedNodes(a.edge))
    console.log("hoverEdge",a);*/
  }

  setNetworkInstance(nw) {
    this.setState({
      network: nw
    });
  }

  setLabelColor(values, id, selected, hovering) {
    const node = this.state.data.nodes.find(n => n.id === id);
    if (node) values.color = node.category ? node.category.color : node.color;
  }

  onNodeClick({ nodes, event }) {
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
  }

  render() {
    const { data } = this.state;
    let options = this.props.options;
    options.nodes.chosen.label = this.setLabelColor;
    const events = {
      click: this.onNodeClick,
      hoverNode: this.hoverNode,
      blurNode: this.blurNode
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

Graph.defaultProps = defaultProps;
Graph.propTypes = props;
export default Graph;
