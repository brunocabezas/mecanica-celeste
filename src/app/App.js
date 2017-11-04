import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Graph from './Graph';
import Modal from './Modal';
import Categories from './Categories';
import nodes from '../mocks/nodes.mock';
import './App.css';

const categories = [
  {label : "declamaciones" , color :"#FD7B35"},
  {label : "relatos" , color :"#A7BCC9"},
  {label : "politicas" , color :"#1F201E"},
  {label : "observaciones" , color :"#818280"},
  {label : "misterios" , color :""},
  {label : "la cueca" , color :""}
];

const propTypes = {
  data : PropTypes.shape({
    nodes : PropTypes.array,
    edges : PropTypes.arrayOf(PropTypes.shape({
      from : PropTypes.number,
      to : PropTypes.number
    }))
  })
};

const defaultProps = {
  data : null
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen : false,
      activeNode : null
    };

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onNodeClick = this.onNodeClick.bind(this);
  }

  onCloseModal(){
    this.setState({
      modalOpen: false,
      activeNode : null
    });
  };

  onNodeClick(nodeId){
    const node = nodes.find(n=>n.id===nodeId);
    if (node)
      this.setState({
        modalOpen: true,
        activeNode : node
      });
  };

  render() {
    const {modalOpen,activeNode} = this.state,
      {data} = this.props,
      showGraph = !!(data && data.nodes);

    return (
      <div ref={"app"} className="app">
        <h1 className="app__title">poética astronómica</h1>
        <Categories onClick={"onFilter"} categories={categories}/>
        <Modal open={modalOpen} onClose={this.onCloseModal} data={activeNode} />
        <Graph show={showGraph} onClick = {this.onNodeClick} data={data} />
      </div>
    );
  }
}

App.defaultProps = defaultProps;
App.propTypes = propTypes;
export default App;
