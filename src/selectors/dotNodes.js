/* eslint-disable */
// Helpers to draw svg shapes
export const MAX_SVG_DRAW_WIDTH = 600;

let biggerCircleNodesCount = 0;
export const setBigCircleNodes = (node = [], nodesCount = 0) => {
  // First five nodes are on the smaller circle
  if (node.id <= 5) {
    return node;
  }
  // Calculate the angle at which the element will be placed.
  const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI;
  biggerCircleNodesCount += 1;

  return {
    ...node,
    physics: false,
    fixed: true,
    group: `group-${node.wpId}`,
    x: (450 * Math.cos(angle)) / 2,
    y: (450 * Math.sin(angle)) / 2,
  };
};

export const setSmallCircleNodes = (node = [], nodesCount = 0, network = null) => {
  const xOffset = -35;
  const yOffset = -45;
  // Only modifying first four nodes
  if (node.id > 4) {
    return node;
  }
  const canvasWidth = network.canvas.width || network.canvas.canvasViewCenter.x * 2;
  const width = canvasWidth > 75 ? 75 : canvasWidth;
  // Calculate the angle at which the element will be placed.
  const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI;
  biggerCircleNodesCount += 1;
  return {
    ...node,
    physics: false,
    fixed: true,
    group: `group-${node.wpId}`,
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x: 75 * Math.cos(angle),
    y: 75 * Math.sin(angle),
  };
};
