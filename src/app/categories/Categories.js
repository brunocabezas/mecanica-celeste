import React from 'react';
import PropTypes from 'prop-types';
import Circle from './CircleSVG';
import './Categories.css';

const propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  })),
  onClick: PropTypes.string,
};

const Categories = (props) => {
  const { categories } = props;


  const show = categories && categories.length > 0;

  return !show ? null
    : (
      <ul className="app__categories">
        {categories.map((cat, i) => (
          <li key={i + cat.label}>
            <Circle size={16} r="5" color={cat.color} />
            {' '}
            {cat.label}
          </li>
        ))}
      </ul>
    );
};

Categories.propTypes = propTypes;
export default Categories;
