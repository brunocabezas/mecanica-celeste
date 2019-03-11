import React, { Component } from 'react';
import PropTypes from 'prop-types';
import equal from 'fast-deep-equal';
import Graph from './Graph';
import Modal from './LoadableModal';
import { nodes as nodeProps } from './app.props';
import { getBigCircleEdges } from '../selectors/selectors';
import { setBigCircleNodes, setSmallCircleNodes } from '../selectors/dotNodes';
import { setSmallCircleTextNodes, setBigCircleTextNodes } from '../selectors/textNodes';
import graphOpts from './graph.config';
import { getJsonFromUrl } from '../helpers';
import './_app.styl';

const APP_TITLE = 'Mecanica Celeste';

export default class App extends Component {
  static propTypes = {
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

  static defaultProps = {
    data: null,
  };

  state = {
    activeNode: {
      wpLabel: null,
      id: null,
      label: null,
      acf: { video: [] },
    },
    data: null,
    textNodes: [],
    groups: {},
    dotNodes: [],
  };

  componentWillReceiveProps = (nextProps) => {
    const paramsInUrl = window.location.href.includes('?');
    const { data } = this.props;
    // console.log(!equal(data, nextProps.data), data, nextProps.data);
    if (
      paramsInUrl
      && !data.nodes
      && !equal(data, nextProps.data)
      && nextProps.data
      && nextProps.data.nodes
    ) {
      const { video } = getJsonFromUrl(window.location.href);
      const videoInData = nextProps.data.nodes.find(n => n.wpLabel === video);
      // console.log('videoHeight', videoInData, video);

      if (videoInData) {
        document.title = `${APP_TITLE} | ${videoInData.wpLabel}`;
        this.setState({ activeNode: videoInData });
      }
    }
  };

  onCloseModal = () => {
    document.title = APP_TITLE;
    this.setState({
      activeNode: {
        wpLabel: null,
        id: null,
        label: null,
        acf: { video: [] },
      },
    });
    window.history.pushState(null, null, `${window.location.href.split('?')[0]}`);
  };

  onNodeClick = (id) => {
    const { textNodes, dotNodes } = this.state;
    // If node is not found on dotNodes, then look for it on textNodes
    const node = dotNodes.find(n => n.id === id) || textNodes.find(n => n.id === id);
    if (node) {
      document.title = `${APP_TITLE} | ${node.wpLabel}`;
      window.history.pushState(null, null, `${window.location.href}?video=${node.wpLabel}`);
      this.setState({
        activeNode: node,
      });
    }
  };

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
    const nodesCount = data.nodes.filter(n => n.id > 5).length;

    const dotNodes = data.nodes
      .map(node => setBigCircleNodes(node, nodesCount))
      .map(node => setSmallCircleNodes(node, 4, network));

    const textNodes = data.nodes
      .map(node => setSmallCircleTextNodes(node, 4, network, dotNodes.length))
      .map(node => setBigCircleTextNodes(node, nodesCount, dotNodes.length));

    const groups = data.nodes.reduce(
      (acc, curr) => ({
        ...acc,
        [`group-${curr.wpId}`]: {
          color: {
            hover: { background: '#DADADA' },
            background: 'white',
            highlight: 'white',
          },
          font: { color: 'white' },
          chosen: {
            label(values, id, selected, hovering) {
              if (hovering) {
                values.color = '#DADADA'; // eslint-disable-line
              }
            },
            node(values, id, selected, hovering) {
              if (hovering) {
                values.color = '#DADADA'; // eslint-disable-line
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
    const { activeNode, data, groups } = this.state;
    const openModal = !!activeNode;
    const { loading } = this.props;
    const graphData = data || this.props.data; /* eslint-disable-line */
    const contentElem = loading ? (
      <div className="app__loader">
        <span className="signal-loader" />
      </div>
    ) : (
      <div className="app__content">
        <Modal open={openModal} onClose={this.onCloseModal} data={activeNode} />
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
