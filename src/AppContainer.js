import React, { Component } from 'react';
import { nodes as nodesSelector } from './selectors';
import App from './app/App';
import { edges } from './app/graph.config';
// import APImock from "./mocks/api.mock.js";
const wpRestUrl = 'http://www.poeticaastronomica.cchv.cl/wp-json/wp/v2/';
// acfUrl = "http://www.poeticaastronomica.cchv.cl/wp-json/acf/v3/";

const postsRoute = `${wpRestUrl}posts?per_page=100`;

// const categoriesRoute = `${wpRestUrl}repositorio`;

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

    return fetch(postsRoute)
      .then(response => response.json())
      .then((jsonNodes) => {
        const nodes = nodesSelector(jsonNodes);
        this.setState({ nodes });
      })
      .catch((err) => {
        console.log(`error fetching ${postsRoute} : `, err);
      })
      .finally(() => this.setState({ loading: false }));
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
