export const WIDTH_CONSTRAINT = 90;
let biggerCircleTextNodesCount = 0;
let biggerCircleNodesCount = 0;

// Saves configuration to have custom position to text labels
const getTextOffset = (id) => {
  switch (id) {
    case 1:
      return { x: WIDTH_CONSTRAINT / 2 + 10, y: 0 };
    case 2:
      return { x: 0, y: 10 };
    case 4:
      return { x: 0, y: -10 };
    default:
      return { x: -WIDTH_CONSTRAINT / 2 - 10, y: 0 };
  }
};

export const setBigCircleTextNodes = (node = {}, nodesCount = 0, dotNodesCount = 0) => {
  const topId = 5 + dotNodesCount;
  if (node.id <= topId) {
    return node;
  }
  // Calculate the angle at which the element will be placed.
  const angle = (biggerCircleTextNodesCount / (nodesCount / 2)) * Math.PI;
  biggerCircleTextNodesCount += 1;
  const textAlign = biggerCircleTextNodesCount < nodesCount ? 'right' : 'left';
  return {
    ...node,
    id: dotNodesCount + node.id,
    physics: false,
    fixed: true,
    font: { align: textAlign },
    shape: 'text',
    widthConstraint: WIDTH_CONSTRAINT,
    label: node.wpLabel,
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x: (450 * Math.cos(angle)) / 2,
    y: (450 * Math.sin(angle)) / 2,
  };
};

export const setSmallCircleTextNodes = (
  node = {},
  nodesCount = 0,
  network = null,
  dotNodesCount = 0,
) => {
  const xOffset = -35;
  const yOffset = -45;
  // Not doing anything when node isn't on the first four
  if (node.id > 5) {
    return { ...node, group: `group-${node.wpId}`, id: dotNodesCount + node.id };
  }
  // Centered text node inside circle
  if (node.id === 5) {
    return {
      ...node,
      shape: 'text',
      label: node.wpLabel,
      group: `group-${node.wpId}`,
      x: 0,
      y: 0,
    };
  }
  const textOffset = getTextOffset(node.id);
  const canvasWidth = network.canvas.width || network.canvas.canvasViewCenter.x * 2;
  const width = canvasWidth > 75 ? 75 : canvasWidth;
  // Calculate the angle at which the element will be placed.
  const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI;
  biggerCircleNodesCount += 1;
  // Limiting width if nodes is left or right
  const widthConstraint = node.id === 1 || node.id === 3 ? WIDTH_CONSTRAINT : false;
  const textAlign = node.id === 3 ? 'right' : 'left';
  // console.log(dotNodesCount + node.id);
  return {
    ...node,
    id: dotNodesCount + node.id,
    physics: false,
    fixed: true,
    shape: 'text',
    group: `group-${node.wpId}`,
    label: node.wpLabel,
    font: { align: textAlign },
    widthConstraint,
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x: 75 * Math.cos(angle) + width / 2 + xOffset + textOffset.x,
    y: 75 * Math.sin(angle) + width / 2 + yOffset + textOffset.y,
  };
};
