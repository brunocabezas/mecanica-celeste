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
      {id: 1, label: ''},
      {id: 2, label: ''},
      {id: 3, label: ''},
      {id: 4, label: ''},
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