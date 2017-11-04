import React, { Component } from 'react';
import {nodes as nodesSelector} from './selectors'
import App from './app/App'

const acfUrl = "http://www.poeticaastronomica.cchv.cl/wp-json/acf/v3/",
  wpRestUrl = "http://www.poeticaastronomica.cchv.cl/wp-json/wp/v2/";

class AppContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories : null,
      nodes : null
    };
  }

  componentWillMount(){

    fetch(acfUrl+'posts')
      .then(response => response.json())
      .then(json => {
        const nodes = nodesSelector(json);
        console.log(nodes)
        this.setState({nodes});
      });
  }

  render() {
    const {nodes} = this.state,
      data = { nodes ,
        edges : [
          {from: 1, to: 2},
          {from: 1, to: 3},
          {from: 2, to: 4},
          {from: 2, to: 3}
        ]
      };

    return <App categories ={[]} data={data}/>;
  }
}

export default AppContainer;
