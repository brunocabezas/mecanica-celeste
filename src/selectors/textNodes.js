// Text nodes max width
export const WIDTH_CONSTRAINT = 90;
const BIG_CIRCLE_RADIUS = 450;
const SMALL_CIRCLE_RADIUS = 75;
let biggerCircleTextNodesCount = 0;
let biggerCircleNodesCount = 0;

// getTextNodesOffset: Returns custom (x, y) positions for text nodes
// Based on wpId attr, coordinates are defined statically
// Coordanes represent the distance from the dot node
const getTextNodesOffset = (wpId) => {
  switch (wpId) {
    // The four small circle text nodes
    case 91:
      return { x: 38, y: -8 };
    case 93:
      return { x: -53, y: 0 };
    case 95:
      return { x: 0, y: 10 };
    case 97:
      return { x: 55, y: 0 };
    // Big circle text nodes
    case 26:
      return { x: 55, y: 0 };
    case 29:
      return { x: 55, y: -5 };
    case 31:
      return { x: 55, y: 0 };
    case 40:
      return { x: 55, y: 0 };
    case 42:
      return { x: 5, y: -10 };
    case 44:
      return { x: -55, y: 0 };
    case 46:
      return { x: -55, y: 0 };
    case 63:
      return { x: -55, y: 0 };
    case 65:
      return { x: -55, y: 0 };
    case 67:
      return { x: -55, y: 0 };
    case 69:
      return { x: -55, y: 0 };
    case 71:
      return { x: -55, y: 0 };
    case 73:
      return { x: -55, y: 0 };
    case 75:
      return { x: -55, y: 0 };
    case 77:
      return { x: 0, y: 10 };
    case 79:
      return { x: 55, y: 0 };
    case 81:
      return { x: 55, y: 0 };
    case 83:
      return { x: 55, y: 0 };
    case 85:
      return { x: 55, y: 0 };
    case 87:
      return { x: 55, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

export const setBigCircleTextNodes = (
  node = {},
  nodesCount = 0,
  dotNodesCount = 0,
) => {
  const topId = 5 + dotNodesCount;
  if (node.id <= topId) {
    return node;
  }
  // Calculate the angle at which the element will be placed.
  const angle = (biggerCircleTextNodesCount / (nodesCount / 2)) * Math.PI;
  biggerCircleTextNodesCount += 1;
  const textOffset = getTextNodesOffset(node.wpId);
  const xAngle = (BIG_CIRCLE_RADIUS * Math.cos(angle)) / 2;
  const yAngle = (BIG_CIRCLE_RADIUS * Math.sin(angle)) / 2;
  const zeroAngle = BIG_CIRCLE_RADIUS / 2;
  let textAlign = xAngle < 0
    && xAngle > -zeroAngle
    && yAngle < zeroAngle
    && yAngle > -zeroAngle
    ? 'right'
    : 'left';
  if (yAngle === -zeroAngle || yAngle === zeroAngle) {
    textAlign = 'center';
  }
  if (xAngle === -zeroAngle) {
    textAlign = 'right';
  }
  // console.log(node, node.wpId, xAngle, yAngle, textAlign);
  return {
    ...node,
    id: dotNodesCount + node.id,
    physics: false,
    fixed: true,
    font: { align: textAlign },
    shape: 'text',
    widthConstraint: node.id === 36 || node.id === 46 ? false : WIDTH_CONSTRAINT,
    label: node.wpLabel,
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x: xAngle + textOffset.x,
    y: yAngle + textOffset.y,
  };
};

export const setSmallCircleTextNodes = (
  node = {},
  nodesCount = 0,
  // network = null,
  dotNodesCount = 0,
) => {
  // Not doing anything when node isn't on the first four
  if (node.id > 5) {
    return {
      ...node,
      group: `group-${node.wpId}`,
      id: dotNodesCount + node.id,
    };
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
  const textOffset = getTextNodesOffset(node.wpId);
  // Calculate the angle at which the element will be placed.
  const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI;
  biggerCircleNodesCount += 1;
  // Limiting width if nodes is left or right
  const textAlign = node.id === 3 ? 'right' : 'left';
  // console.log(node, node.id);
  return {
    ...node,
    id: dotNodesCount + node.id,
    physics: false,
    fixed: true,
    shape: 'text',
    group: `group-${node.wpId}`,
    label: node.wpLabel,
    font: { align: textAlign, lineHeight: 20 },
    widthConstraint: node.id === 2 ? false : WIDTH_CONSTRAINT,
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x: SMALL_CIRCLE_RADIUS * Math.cos(angle) + textOffset.x,
    y: SMALL_CIRCLE_RADIUS * Math.sin(angle) + textOffset.y,
  };
};
