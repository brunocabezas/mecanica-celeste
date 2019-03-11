import React, { Component } from 'react';
import 'whatwg-fetch';
import { nodes as nodesSelector } from '../selectors/selectors';
import App from './App';
import { edges } from './graph.config';

const wpRestUrl = 'http://www.poeticaastronomica.cchv.cl/wp-json/wp/v2/';
const postsRoute = `${wpRestUrl}posts?per_page=100`;

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: null,
      loading: false,
    };
  }

  componentWillMount() {
    this.setState({ loading: true });

    fetch(postsRoute)
      .then(response => response.json())
      .then((jsonNodes) => {
        const nodes = nodesSelector(jsonNodes);
        this.setState({ nodes, loading: false });
      })
      .catch((err) => {
        console.error(`error fetching ${postsRoute} : `, err);
        this.setState({ loading: false });
      });
  }

  render() {
    const { nodes, loading, categories } = this.state;
    const data = {
      nodes,
      edges,
    };

    return <App categories={categories} loading={loading} data={data} />;
  }
}

export default AppContainer;
