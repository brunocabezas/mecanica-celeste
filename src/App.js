import React, { Component } from 'react';
import wp from 'wordpress'
import Graph from './app/Graph';
import Modal from './app/Modal';
import Categories from './app/Categories';
import './App.css';

const categories = [
  {label : "declamaciones" , color :""},
  {label : "relatos" , color :""},
  {label : "politicas" , color :""},
  {label : "observaciones" , color :""},
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
    this.onNodeSelect = this.onNodeSelect.bind(this);
  }
  componentWillMount(){

    client.getPosts({type:"noticia"},null,function( error, posts ) {
      console.log(error,posts)
        // console.log( "Found " + posts.length + " posts!" );
    });

   /* client.getPostTypes(function( error, posts ) {
      console.log(error,posts)
    });*/

    client.getMediaLibrary({type:'galeria'},function( error, posts ) {
      console.log(error,posts)
    });
  }

  onCloseModal(){
    this.setState({ modalOpen: false });
  };

  onNodeSelect(){
    this.setState({ modalOpen: true });
  };

  render() {
    const {modalOpen} = this.state;
    return (
      <div className="app">
        <h1 className="app__title">poética astronómica</h1>
        <Categories onClick={"onFilter"} categories={categories}/>
        <Modal open={modalOpen} onClose={this.onCloseModal} data={[]} />
        <Graph events = {{select : this.onNodeSelect}} />
      </div>
    );
  }
}

export default App;
