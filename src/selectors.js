import { colors } from "./helpers";

const setSmallCircleNodes = node => {
  const radius = 100;
  if (node.id == 1) {
    return { ...node, physics: false, fixed: true, ...{ x: 0, y: radius } };
  } else if (node.id == 2) {
    return { ...node, physics: false, fixed: true, ...{ x: radius, y: 0 } };
  } else if (node.id == 3) {
    return { ...node, physics: false, fixed: true, ...{ x: 0, y: -radius } };
  } else if (node.id == 4) {
    return { ...node, physics: false, fixed: true, ...{ x: -radius, y: 0 } };
  } else {
    return node;
  }
};

const setCenterNode = node => {
  if (node.id == 5) {
    return { ...node, physics: false, fixed: true, ...{ x: 0, y: 0 } };
  } else {
    return node;
  }
};

export const nodes = (nodes, categories = null) => {
  if (!nodes) return nodes;

  return (
    nodes
      /* removing items with nothing defined under "acf" attribute (all keys nulled) */
      .filter(obj => Object.keys(obj.acf).find(key => obj.acf[key]))

      .map((obj, i) => {
        const category =
          !categories || !obj.repositorio.length === 0
            ? null
            : categories.find(cat => cat.id === obj.repositorio[0]);

        return {
          wpId: obj.id,
          id: i + 1,
          acf: obj.acf,
          label: obj.title ? obj.title.rendered.toUpperCase() : "",
          category,
          color: "#FFFFFF",
          borderWidth: 0,
          size: 10
          // color : category ? category.color :
          //  colors.randomElement()
        };
      })
      .filter(n => !(n.id > 5))
      .map(setSmallCircleNodes)
      .map(setCenterNode)
  );
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
