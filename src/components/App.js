import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph';
import AboutModal from './modals/LoadableAboutModal';
import NodeModal from './modals/LoadableNodeModal';
import { nodes as nodeProps } from './app.props';
import * as url from '../helpers/url';
import { capitalize } from '../helpers/string';
import { getBigCircleEdges } from '../selectors/selectors';
import { setBigCircleNodes, setSmallCircleNodes } from '../selectors/dotNodes';
import {
  setSmallCircleTextNodes,
  setBigCircleTextNodes,
} from '../selectors/textNodes';
import graphOpts from './graph.config';
import { getJsonFromUrl } from '../helpers';
import './_app.styl';

const APP_TITLE = 'Mecanica Celeste';
const NODE_COLOR = '#DADADA';

export default class App extends Component {
  static propTypes = {
    data: PropTypes.shape({
      nodes: nodeProps,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          from: PropTypes.number,
          to: PropTypes.number,
        }),
      ).isRequired,
    }),
    loading: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    data: {
      nodes: [],
      edges: [],
    },
  };

  state = {
    activeNode: {
      wpLabel: null,
      id: null,
      label: null,
      acf: { video: '' },
    },
    aboutUsOpened: false,
    data: null,
    textNodes: [],
    groups: {},
    dotNodes: [],
    visitedGroups: [],
  };

  componentWillReceiveProps = (nextProps) => {
    const paramsInUrl = url.hasParams();
    const hasAboutOpened = url.get().includes('nosotros');

    if (paramsInUrl && nextProps.data.nodes) {
      const { video } = getJsonFromUrl(url.get());
      const videoFromUrl = video.replace(/_/g, ' ');
      const videoInData = nextProps.data.nodes.find(
        n => n.wpLabel.toLowerCase() === videoFromUrl,
      );

      if (videoInData) {
        // Updating title and opening modal
        document.title = `${APP_TITLE} | ${capitalize(videoInData.wpLabel)}`;
        this.setState({ activeNode: videoInData });
      } else {
        console.warn('Video from url not found');
        // Clearing url
        url.clear();
      }
    } else if (hasAboutOpened) {
      this.setState({ aboutUsOpened: true });
    }
  };

  onCloseModal = () => {
    document.title = APP_TITLE;
    const activeNode = {
      wpLabel: null,
      id: null,
      label: null,
      acf: { video: '' },
    };
    this.setState({
      activeNode,
    });
    url.clear();
  };

  onNodeClick = (id) => {
    const { textNodes, dotNodes, visitedGroups } = this.state;
    // If node is not found on dotNodes, then look for it on textNodes
    const node = dotNodes.find(n => n.id === id) || textNodes.find(n => n.id === id);
    if (node) {
      document.title = `${APP_TITLE} | ${capitalize(node.wpLabel)}`;
      url.setVideo(node.wpLabel);
      this.setState({
        activeNode: Object.assign({}, node),
        visitedGroups: [...new Set([...visitedGroups, node.group])],
      });
    }
  };

  setNetworkInstance = (nw) => {
    this.setState({ network: nw }, () => {
      const state = this.setStateFromProps();
      this.setState({ ...state });
    });
  };

  toggleAboutUs = () => {
    this.setState((prevState) => {
      const isBeingClosed = !!prevState.aboutUsOpened;
      if (isBeingClosed) {
        url.clear();
      } else {
        url.push('/nosotros');
      }
      console.log(isBeingClosed);
      return { aboutUsOpened: !prevState.aboutUsOpened };
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
      .map(node => setSmallCircleTextNodes(node, 4, dotNodes.length))
      .map(node => setBigCircleTextNodes(node, nodesCount, dotNodes.length));

    const groups = data.nodes.reduce(
      (acc, curr) => ({
        ...acc,
        [`group-${curr.wpId}`]: {
          color: {
            hover: { background: NODE_COLOR },
            background: 'white',
            highlight: 'white',
          },
          font: { color: 'white' },
          chosen: {
            label(values, id, selected, hovering) {
              if (hovering) {
                values.color = NODE_COLOR; // eslint-disable-line no-param-reassign
              }
            },
            node(values, id, selected, hovering) {
              if (hovering) {
                values.color = NODE_COLOR; // eslint-disable-line no-param-reassign
              }
            },
          },
        },
      }),
      {},
    );
    return {
      network,
      data: {
        edges: [...data.edges, ...getBigCircleEdges(data.nodes)],
        nodes: [...dotNodes, ...textNodes],
      },
      textNodes,
      dotNodes,
      groups,
    };
  };

  render() {
    const {
      activeNode,
      data,
      groups,
      aboutUsOpened,
      visitedGroups,
    } = this.state;
    const openModal = activeNode && !!activeNode.id;
    const { loading } = this.props;
    const graphData = data || this.props.data; // eslint-disable-line react/destructuring-assignment
    const contentElem = loading ? (
      <div className="app__loader">
        <span className="loader" />
      </div>
    ) : (
      <div className="app__content">
        <NodeModal
          open={openModal}
          onClose={this.onCloseModal}
          data={activeNode}
        />
        <Graph
          groupsVisited={visitedGroups}
          setNetworkInstance={this.setNetworkInstance}
          onClick={this.onNodeClick}
          data={graphData}
          options={{ ...graphOpts, groups }}
        />
      </div>
    );

    return (
      <div ref="app" className="app">
        <button
          title="Acerca de nosotros"
          onClick={this.toggleAboutUs}
          type="button"
          className="app__title"
        >
          Mecánica celeste
        </button>
        <AboutModal show={aboutUsOpened} onClose={this.toggleAboutUs} />
        {contentElem}
      </div>
    );
  }
}
