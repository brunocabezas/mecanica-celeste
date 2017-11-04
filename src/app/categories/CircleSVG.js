import React from 'react'

const Circle = ({color,size,radium}) => {
  return (
    <svg height={size} width={size}>
      <circle
        cx={size/2}
        cy={size/2}
        r={size/2}
        // stroke="black"
        // strokeWidth="3"
        fill={color}
      />
    </svg>
  )
};

export default Circle;