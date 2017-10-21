import React, { Component } from 'react';
import wp from 'wordpress'
import logo from './logo.svg';
import './App.css';

const client = wp.createClient({
  url: "www.loselectrodomesticos.cl",
  username: "api_test",
  password: "asdasd"
});

class App extends Component {
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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
