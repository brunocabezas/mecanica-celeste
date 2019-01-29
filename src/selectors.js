// Helpers to set fixed nodes
const physics = false;
const fixed = true;
const smallRadius = 25;
// const bigRadius = 200;

// Set small circle based on smallRadius
// const setSmallCircleDotNodes = (node) => {
//   if (node.id === 1) {
//     return {
//       ...node,
//       physics,
//       fixed,
//       x: 0,
//       label: 'a',
//       y: smallRadius,
//     };
//   }
//   if (node.id === 2) {
//     return {
//       ...node,
//       physics,
//       fixed,
//       label: 'b',
//       x: smallRadius,
//       y: 0,
//     };
//   }
//   if (node.id === 3) {
//     return {
//       ...node,
//       physics,
//       fixed,
//       x: 0,
//       label: 'c',
//       y: -smallRadius,
//     };
//   }
//   if (node.id === 4) {
//     return {
//       ...node,
//       physics,
//       label: 'd',
//       fixed,
//       x: -smallRadius,
//       y: 0,
//     };
//   }
//   return node;
// };

const setSmallCircleTextNodes = (node) => {
  if (node.id === 1) {
    return {
      ...node,
      physics,
      fixed,
      x: -15,
      shape: 'text',
      y: -15,
    };
  }
  if (node.id === 2) {
    return {
      ...node,
      physics,
      fixed,
      shape: 'text',
      x: smallRadius,
      y: -50,
    };
  }
  if (node.id === 3) {
    return {
      ...node,
      physics,
      fixed,
      shape: 'text',
      x: -15,
      y: -smallRadius - 50,
    };
  }
  if (node.id === 4) {
    return {
      ...node,
      physics,
      fixed,
      shape: 'text',
      x: -smallRadius,
      y: -50,
    };
  }
  return node;
};

const setCenterNode = (node) => {
  if (node.id !== 5) {
    return node;
  }
  return {
    ...node,
    physics,
    shape: 'text',
    fixed,
    x: 0,
    y: 0,
  };
};

// let biggerCircleNodesCount = 0;
// const xOffset = 150;
// const yOffset = -100;
// const setBigCircleNodes = (node = [], nodesCount = 0) => {
//   if (node.id <= 5) {
//     return node;
//   }
//   const width = 600;
// Calculate the angle at which the element will be placed.
//   const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI;
//   biggerCircleNodesCount += 1;
//   return {
//     ...node,
//     physics: false,
//     fixed,
//     // For a semicircle, we would use (i / numNodes) * Math.PI.
//     x: bigRadius * Math.cos(angle) + width / 2 + xOffset,
//     y: bigRadius * Math.sin(angle) + width / 2 + yOffset
//   };
// };

export const nodes = (nodeArray) => {
  if (!nodeArray) return nodeArray;

  // Create base node array
  const dotNodes = nodeArray.map((obj, i) => ({
    wpId: obj.id,
    wpLabel: obj.title ? obj.title.rendered.toUpperCase() : '',
    title: 'Asdas',
    id: i + 1,
    acf: obj.acf,
    label: false,
    color: '#FFFFFF',
    shape: 'dot',
    size: 2,
    borderWidth: 0,
  }));

  return [...[], ...dotNodes];
};
