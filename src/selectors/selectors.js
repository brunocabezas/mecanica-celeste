export const nodes = (nodeArray) => {
  if (!nodeArray) return nodeArray;

  // Create base node array
  const dotNodes = nodeArray.map((obj, i) => ({
    wpId: obj.id,
    wpLabel: obj.title ? obj.title.rendered.toUpperCase() : '',
    title: obj.title ? obj.title.rendered.toUpperCase() : '',
    id: i + 1,
    acf: obj.acf,
  }));

  return [...[], ...dotNodes];
};

// Text nodes
export const getBigCircleEdges = (nodeArray = []) => {
  const count = nodeArray.filter(n => n.id > 5).length;
  return [
    ...nodeArray
      .filter(n => n.id > 5)
      .map(n => ({
        from: n.id,
        to: n.id + 1,
        dashes: [1, 4],
      }))
      .slice(0, -1), // Removing last item
    //  From the lasxt one to the start of big circle nodes
    { from: 5 + count, to: 6, dashes: [1, 4] },
  ];
};
