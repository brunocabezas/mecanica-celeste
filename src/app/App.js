import React, { Component } from "react";
import PropTypes from "prop-types";
import Graph from "./Graph";
import Modal from "./Modal";
import { nodes } from "./app.props";
import "./_app.styl";

const propTypes = {
  data: PropTypes.shape({
    nodes,
    edges: PropTypes.arrayOf(
      PropTypes.shape({
        from: PropTypes.number,
        to: PropTypes.number
      })
    )
  }),
  // todo improve prop type def
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      acf: PropTypes.array,
      id: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  loading: PropTypes.bool.isRequired
};

const defaultProps = {
  data: null
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      activeNode: null
    };

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
  }

  onCloseModal() {
    this.setState({
      modalOpen: false,
      activeNode: null
    });
  }

  onNodeClick(nodeId) {
    const { data } = this.props,
      node = data && data.nodes.find(n => n.id === nodeId);
    if (node)
      this.setState({
        modalOpen: true,
        activeNode: node
      });
  }

  render() {
    const { modalOpen, activeNode } = this.state,
      { data, loading } = this.props,
      showGraph = !!(data && data.nodes);

    const contentElem = loading ? (
      <div className="app__loader">
        <span className="loader-wrapper">Cargando . . .</span>
      </div>
    ) : (
      <div className="app__content">
        <Modal open={modalOpen} onClose={this.onCloseModal} data={activeNode} />
        <Graph show={showGraph} onClick={this.onNodeClick} data={data} />
      </div>
    );
    return (
      <div ref={"app"} className="app">
        <h1 className="app__title">Mecánica celeste</h1>
        {contentElem}
      </div>
    );
  }
}

App.defaultProps = defaultProps;
App.propTypes = propTypes;
export default App;
