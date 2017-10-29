import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisGraph from 'react-graph-vis';

const props = {
  data : PropTypes.shape({
    /* todo define node properties */
    nodes : PropTypes.array,
    edges : PropTypes.arrayOf(PropTypes.shape({
      from : PropTypes.number,
      to : PropTypes.number
    }))
  }),
  options : PropTypes.object,
  onClick : PropTypes.func
};


const defaultProps = {
  data : {
    nodes : [],
    edges: []
  },
  events : null,
  options : {
    physics:{
      enabled: true
    },
    edges: {
      arrows : {
        to : {enabled : false}
      },
      chosen: false,
      color : { color:"#818280"}
    },
    nodes : {
      labelHighlightBold : false,
      shape : "dot",
      chosen : {
        label : {}
      }
    },
    manipulation:{
      enabled: false,
      editNode : function(nodeData,callback) {

        if (nodeData.label.length>0){
          nodeData.label = "";
        } else {
          nodeData.label = nodeData.hiddenLabel;
        }

        callback(nodeData);
      }
    },
    interaction:{
      hover: true
    }
  }
};

class Graph extends Component {
  constructor(props){
    super(props);
    this.state = {
      showLabel : false,
      /* graph instance */
      network : null,
      data : {
        nodes : this.props.data.nodes || [],
        edges : this.props.data.edges || []
      }
    };

    this.hoverNode = this.hoverNode.bind(this);
    this.blurNode = this.blurNode.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
    this.setLabelColor = this.setLabelColor.bind(this);
    this.setNetworkInstance = this.setNetworkInstance.bind(this);
  }

  hoverNode({pointer,event,node}) {
    // console.log(pointer,event,node)
    if (this.state.network) {
      const {network} = this.state;
      network.enableEditMode();
      event.target.style.cursor = "pointer";
      network.selectNodes([node]);
      network.editNode()
    }
  }

  blurNode({pointer,event,node}){
    const {network} = this.state;
    network.editNode();
    event.target.style.cursor = "auto";
    network.disableEditMode();
    network.unselectAll();
  }

  setNetworkInstance(nw) {
    this.setState({
      network: nw,
    })
  }

  setLabelColor(values, id, selected, hovering) {
    const node = this.state.data.nodes.find(n=>n.id===id);
    if (node)
      values.color = node.color;
  }

  onNodeClick({nodes,event}){
    if (nodes.length>0){
      /*this.state.network.focus(nodes[0],{animation: {             // animation object, can also be Boolean
        duration: 1000,                 // animation duration in milliseconds (Number)
        easingFunction: "easeInOutQuad" // Animation easing function, available are:
      }       })*/
    }
    // const position = event.center;

    if (nodes.length===1 && nodes[0]){
      // opening modal
      this.props.onClick(nodes[0])
    }
    // this.state.network.moveTo({position})
  }

  render() {
    const {data} = this.state;
    let options = this.props.options;
    options.nodes.chosen.label = this.setLabelColor;
    const events = Object.assign({},
      {click : this.onNodeClick },
      {hoverNode : this.hoverNode },
      {blurNode : this.blurNode }
    );

    // console.log(events);
    return (
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