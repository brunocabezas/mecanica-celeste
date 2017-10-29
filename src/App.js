import React, { Component } from 'react';
import wp from 'wordpress'
import Graph from './app/Graph';
import Modal from './app/Modal';
import Categories from './app/Categories';
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
    this.setState({ modalOpen: false });
  };

  onNodeClick(nodes){
    if (nodes.length===1 && nodes[0])
      this.setState({
        modalOpen: true,
        activeNode : nodes[0]
      });
  };

  render() {
    const {modalOpen,activeNode} = this.state;

    return (
      <div className="app">
        <h1 className="app__title">poética astronómica</h1>
        <Categories onClick={"onFilter"} categories={categories}/>
        <Modal open={modalOpen} onClose={this.onCloseModal} data={activeNode} />
        <Graph onClick = {this.onNodeClick} />
      </div>
    );
  }
}

export default App;
