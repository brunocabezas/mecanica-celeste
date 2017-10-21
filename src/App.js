import React, { Component } from 'react';
import wp from 'wordpress'
import Graph from './app/Graph';
import Modal from './app/Modal';
import './App.css';

const client = wp.createClient({
  url: "www.loselectrodomesticos.cl",
  username: "api_test",
  password: "asdasd"
});

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      modalOpen : false
    };

    this.onCloseModal = this.onCloseModal.bind(this);
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

  render() {
    const {modalOpen} = this.state;
    return (
      <div className="App">
        <Modal open={modalOpen} onClose={this.onCloseModal} data={[]} />
        <Graph />
      </div>
    );
  }
}

export default App;
