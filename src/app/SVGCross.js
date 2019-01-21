import React from "react";
import PropTypes from "prop-types";

const propTypes = {
  color: PropTypes.string
};

const defaultProps = {
  color: "white"
};
const SVGCross = ({ color }) => {
  return (
    <svg height="100%" width="100%">
      <line
        x1={180}
        y1={0}
        x2={200}
        y2={100}
        style={{ stroke: color, strokeWidth: 2 }}
      />
      <line
        x1={20}
        y1={0}
        x2={0}
        y2={100}
        style={{ stroke: color, strokeWidth: 2 }}
      />
      <line
        x1={0}
        y1={100}
        x2={200}
        y2={300}
        style={{ stroke: color, strokeWidth: 2 }}
      />
      <line
        x1={0}
        y1={300}
        x2={200}
        y2={100}
        style={{ stroke: color, strokeWidth: 2 }}
      />
      <line
        x1={200}
        y1={300}
        x2={180}
        y2={400}
        style={{ stroke: color, strokeWidth: 2 }}
      />
      <line
        x1={0}
        y1={300}
        x2={20}
        y2={400}
        style={{ stroke: color, strokeWidth: 2 }}
      />
      Sorry, your browser does not support inline SVG.
    </svg>
  );
};
SVGCross.propTypes = propTypes;
SVGCross.defaultProps = defaultProps;
export default SVGCross;
