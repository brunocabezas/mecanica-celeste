import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph';
import Modal from './Modal';
import { nodes as nodeProps } from './app.props';
import {
  setBigCircleNodes,
  setSmallCircleNodes,
  setSmallCircleTextNodes,
  setBigCircleTextNodes,
  getBigCircleEdges,
} from '../selectors';
import graphOpts from './graph.config';
import './_app.styl';

const propTypes = {
  data: PropTypes.shape({
    nodes: nodeProps,
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number,
        to: PropTypes.number,
      }),
    ),
  }),
  loading: PropTypes.bool.isRequired,
};

const defaultProps = {
  data: null,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      activeNode: null,
      data: null,
      textNodes: [],
      groups: {},
      dotNodes: [],
    };

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
  }

  onCloseModal() {
    this.setState({
      modalOpen: false,
      activeNode: null,
    });
  }

  onNodeClick(id) {
    const { textNodes, dotNodes } = this.state;
    // If node is not found on dotNodes, then look for it on textNodes
    const node = dotNodes.find(n => n.id === id) || textNodes.find(n => n.id === id);
    if (node) {
      this.setState({
        modalOpen: true,
        activeNode: node,
      });
    }
  }

  setNetworkInstance = (nw) => {
    this.setState({ network: nw }, () => {
      const state = this.setStateFromProps();
      this.setState({ ...state });
    });
  };

  setStateFromProps = () => {
    const { data } = this.props;
    const { network } = this.state;
    if (!data || !network) {
      return console.error('network instance or props not valid');
    }
    const xViewportOffset = 300;
    const yViewportOffset = 300;
    // Counting nodes for the big circle
    const nodesCount = data.nodes.filter(n => n.id > 5).length;
    const dotNodes = data.nodes
      .map(node => setBigCircleNodes(node, nodesCount, network))
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
      .map(node => setSmallCircleNodes(node, 4, network));

    const textNodes = data.nodes
      .map(node => setSmallCircleTextNodes(node, 4, network, dotNodes.length))
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
    };

    return {
      network,
      data: newData,
      textNodes,
      dotNodes,
      groups,
    };
  };

  render() {
    const {
      modalOpen, activeNode, data, groups,
    } = this.state;
    const { loading } = this.props;
    const graphData = data || this.props.data; /* eslint-disable-line */
    const contentElem = loading ? (
      <div className="app__loader">
        <span className="loader-wrapper">Cargando . . .</span>
      </div>
    ) : (
      <div className="app__content">
        <Modal open={modalOpen} onClose={this.onCloseModal} data={activeNode} />
        <Graph
          setNetworkInstance={this.setNetworkInstance}
          onClick={this.onNodeClick}
          data={graphData}
          options={{ ...graphOpts, groups }}
        />
      </div>
    );

    return (
      <div ref="app" className="app">
        <h1 className="app__title">Mecánica celeste</h1>
        {contentElem}
      </div>
    );
  }
}

App.defaultProps = defaultProps;
App.propTypes = propTypes;
export default App;
