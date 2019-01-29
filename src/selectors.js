// Helpers to set fixed nodes
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

// const setSmallCircleTextNodes = (node) => {
//   if (node.id === 1) {
//     return {
//       ...node,
//       physics,
//       fixed,
//       x: -15,
//       shape: 'text',
//       y: -15,
//     };
//   }
//   if (node.id === 2) {
//     return {
//       ...node,
//       physics,
//       fixed,
//       shape: 'text',
//       x: smallRadius,
//       y: -50,
//     };
//   }
//   if (node.id === 3) {
//     return {
//       ...node,
//       physics,
//       fixed,
//       shape: 'text',
//       x: -15,
//       y: -smallRadius - 50,
//     };
//   }
//   if (node.id === 4) {
//     return {
//       ...node,
//       physics,
//       fixed,
//       shape: 'text',
//       x: -smallRadius,
//       y: -50,
//     };
//   }
//   return node;
// };

export const nodes = (nodeArray) => {
  if (!nodeArray) return nodeArray;

  // Create base node array
  const dotNodes = nodeArray.map((obj, i) => ({
    wpId: obj.id,
    wpLabel: obj.title ? obj.title.rendered.toUpperCase() : '',
    title: obj.title ? obj.title.rendered.toUpperCase() : '',
    id: i + 1,
    acf: obj.acf,
    color: {
      background: 'white',
      border: 'white',
      hover: 'gray',
    },
    shape: 'dot',
    size: 3,
    borderWidth: 0,
  }));

  return [...[], ...dotNodes];
};
