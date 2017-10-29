import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisGraph from 'react-graph-vis';

const props = {
  data : PropTypes.shape({
    /* todo define properties */
    nodes : PropTypes.array,
    edges : PropTypes.arrayOf(PropTypes.shape({
      from : PropTypes.number,
      to : PropTypes.number
    }))
  }),
  options : PropTypes.object,
  onClick : PropTypes.func
};

const nodes = [
  {id: 1, label: "", hidedlabel: 'LOREM IPSUM', color :"#FD7B35",size : 25},
  {id: 2, label : "", hidedlabel: 'RELATOS',color :"#A7BCC9",size : 10},
  {id: 3, label : "", hidedlabel: 'POLITICAS',color :"#1F201E", size : 30},
  {id: 4, label : "", hidedlabel: 'CONVERSACIONES',color :"#818280", size: 40},
  {id: 5, label : "", hidedlabel: 'LA CUECA'},
  {id: 6, label : "", hidedlabel: 'DECLAMACIONES'}
];

const defaultProps = {
  data : {
    nodes,
    edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
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
          nodeData.label = nodeData.hidedlabel;
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
      this.state.network.focus(nodes[0])
    }
    const position = event.center;
    // this.state.network.moveTo({position})
    this.props.onClick(nodes)
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