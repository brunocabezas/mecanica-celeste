import React, {Component } from 'react';
import PropTypes from 'prop-types';
import './Categories.css';

const propTypes = {
  categories : PropTypes.arrayOf(PropTypes.shape({
    label : PropTypes.string.isRequired,
    color : PropTypes.string.isRequired
  })),
  onClick : PropTypes.string
};

class Categories extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const {categories} = this.props,
        show =categories && categories.length>0;

    return !show ? null :
      <ul className={"app__categories"}>
        {categories.map((cat,i)=>
          <li key={i+cat.label}>{cat.label}</li>
        )}
      </ul>;
  }
}

Categories.propTypes = propTypes;
export default Categories;
