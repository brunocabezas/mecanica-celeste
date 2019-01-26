import { colors } from "./helpers";

// Helpers to set fixed nodes
const physics = false;
const fixed = true;
const smallRadius = 100;
const bigRadius = 300;

// Set small circle based on smallRadius
const setSmallCircleNodes = node => {
  if (node.id === 1) {
    return { ...node, physics, fixed, ...{ x: 0, y: smallRadius } };
  } else if (node.id === 2) {
    return { ...node, physics, fixed, ...{ x: smallRadius, y: 0 } };
  } else if (node.id === 3) {
    return { ...node, physics, fixed, ...{ x: 0, y: -smallRadius } };
  } else if (node.id === 4) {
    return { ...node, physics, fixed, ...{ x: -smallRadius, y: 0 } };
  } else {
    return node;
  }
};

const setCenterNode = node => {
  if (node.id !== 5) {
    return node;
  }
  return {
    ...node,
    physics,
    shape: "text",
    fixed,
    x: 0,
    y: 0
  };
};

// Set small circle based on bigRadius
let biggerCircleNodesCount = 0;
const setBigCircleNodes = (node = [], nodesCount = 0) => {
  if (node.id <= 5) {
    return node;
  }
  const width = bigRadius * 2;
  const angle = (biggerCircleNodesCount / (nodesCount / 2)) * Math.PI; // Calculate the angle at which the element will be placed.
  biggerCircleNodesCount += 1;
  console.log("x", bigRadius * Math.cos(angle) + width / 2, node.label);
  console.log("y", bigRadius * Math.sin(angle) + width / 2, node.label);
  return {
    ...node,
    physics: false,
    fixed,
    // For a semicircle, we would use (i / numNodes) * Math.PI.
    x: bigRadius * Math.cos(angle) + width / 2,
    y: bigRadius * Math.sin(angle) + width / 2
  };
};

export const nodes = (nodeArray, categories = null) => {
  if (!nodeArray) return nodeArray;

  // Create base node array
  const nodes = nodeArray.map((obj, i) => ({
    wpId: obj.id,
    id: i + 1,
    acf: obj.acf,
    label: obj.title ? obj.title.rendered.toUpperCase() : "",
    category:
      !categories || !obj.repositorio.length === 0
        ? null
        : categories.find(cat => cat.id === obj.repositorio[0]),
    color: "#FFFFFF",
    borderWidth: 0
  }));

  // Obtaining length of nodes to place on bigger circle
  const biggerCircleNodes = [...nodes].filter(n => n.id > 5).length;
  return nodes
    .map(setSmallCircleNodes)
    .map(setCenterNode)
    .map(node => setBigCircleNodes(node, biggerCircleNodes));
};

export const categories = categories => {
  if (!categories) return categories;

  return categories.map((obj, i) => ({
    id: obj.id,
    label: obj.name,
    slug: obj.slug,
    color: colors.randomElement(),
    desc: obj.description,
    acf: obj.acf
  }));
};
