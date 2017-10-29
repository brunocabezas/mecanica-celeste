import React, { Component } from 'react';
import wp from 'wordpress'
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

const client = wp.createClient({
  url: "www.loselectrodomesticos.cl",
  username: "api_test",
  password: "asdasd"
});

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
  componentWillMount(){

   /* client.getPosts({type:"noticia"},null,function( error, posts ) {
      console.log(error,posts)
        // console.log( "Found " + posts.length + " posts!" );
    });*/

   /* client.getPostTypes(function( error, posts ) {
      console.log(error,posts)
    });*/
/*
    client.getMediaLibrary({type:'galeria'},function( error, posts ) {
      console.log(error,posts)
    });*/
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
      data = { nodes,
        edges : [
          {from: 1, to: 2},
          {from: 1, to: 3},
          {from: 2, to: 4},
          {from: 2, to: 5}
        ]
      };

    return (
      <div className="app">
        <h1 className="app__title">poética astronómica</h1>
        <Categories onClick={"onFilter"} categories={categories}/>
        <Modal open={modalOpen} onClose={this.onCloseModal} data={activeNode} />
        <Graph onClick = {this.onNodeClick} data={data} />
      </div>
    );
  }
}

export default App;
