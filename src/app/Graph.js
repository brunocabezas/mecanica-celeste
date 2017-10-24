import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VisGraph from 'react-graph-vis';

const props = {
  data : PropTypes.shape({
    nodes : PropTypes.array,
    edges : PropTypes.arrayOf(PropTypes.shape({
      from : PropTypes.number,
      to : PropTypes.number
    }))
  }),
  options : PropTypes.object,
  events : PropTypes.object
};

const defaultProps = {
  data : {
    nodes: [
      {id: 1, label: 'asdas',color :"#FD7B35",size : 25},
      {id: 2, label: '',color :"#A7BCC9",size : 10},
      {id: 3, label: '',color :"#1F201E", size : 30},
      {id: 4, label: '',color :"#818280", size: 40},
      {id: 5, label: ''}
    ],
    edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
  },
  events : null,
  options : {
    edges: {
      arrows : {
        to : {enabled : false}
      },
      chosen: false,
      color : { color:"#818280"}
    },
    nodes : {
      shape : "dot",
      chosen : {
        node : function(values, id, selected, hovering) {
          if(hovering)
            values.color = "red";
        }
      }
    },
    interaction:{
      hover: true
    }
  }
};

class Graph extends Component {

  render() {
    const {data, options, events} = this.props;

    return <VisGraph graph={data} options={options} events={events}/>;
  }
}

Graph.defaultProps = defaultProps;
Graph.propTypes = props;
export default Graph;