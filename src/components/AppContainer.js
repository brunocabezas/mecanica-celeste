import 'whatwg-fetch';
import React, { Component } from 'react';
import { nodes as nodesSelector } from '../selectors/selectors';
import App from './App';
import { edges } from './graph.config';

const API_URL = 'https://www.poeticaastronomica.cchv.cl/wp-json/wp/v2/';
const postsRoute = `${API_URL}posts?per_page=100`;

export default class AppContainer extends Component {
  state = {
    nodes: [],
    loading: false,
  };

  componentWillMount = () => {
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
  };

  render() {
    const { nodes, loading, categories } = this.state;
    const data = {
      nodes,
      edges,
    };

    return <App categories={categories} loading={loading} data={data} />;
  }
}
