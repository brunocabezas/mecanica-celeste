import React, { Component } from "react";
import {
  nodes as nodesSelector,
  categories as categoriesSelector
} from "./selectors";
import App from "./app/App";
import APImock from "./mocks/api.mock.js";
const wpRestUrl = "http://www.poeticaastronomica.cchv.cl/wp-json/wp/v2/";
// acfUrl = "http://www.poeticaastronomica.cchv.cl/wp-json/acf/v3/";

const postsRoute = wpRestUrl + "posts",
  categoriesRoute = wpRestUrl + "repositorio";

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: null,
      nodes: null,
      loading: false
    };
  }

  componentWillMount() {
    this.setState({ loading: true });

    return fetch(categoriesRoute)
      .then(response => response.json())
      .then(json => {
        const categories = categoriesSelector(json);
        this.setState({ categories });
        fetch(postsRoute)
          .then(response => response.json())
          .then(json => {
            const nodes = nodesSelector(json, categories);
            // console.log(nodes)
            this.setState({ nodes });
          });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { nodes, loading, categories } = this.state;
    const data = {
      nodes,
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 3 }
      ]
    };

    return <App categories={categories} loading={loading} data={data} />;
  }
}

export default AppContainer;
