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
      {id: 1, label: 'Node 1'},
      {id: 2, label: 'Node 2'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ],
    edges: [
      {from: 1, to: 2},
      {from: 1, to: 3},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ]
  },
  events : {
    select: function(event) {
      var { nodes, edges } = event;
    }
  },
  options : {
    edges: {
      color: "#000000"
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