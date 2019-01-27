export default {
  width: '100%',
  height: '100%',
  physics: {
    enabled: false,
  },
  edges: {
    dashes: true,
    arrows: {
      to: { enabled: false },
    },
    chosen: false,
    color: { color: '#FFFFFF' },
    font: { strokeWidth: 10 },
    hoverWidth() {
      // console.log(width)
      return 0;
    },
    selectionWidth: 0,
  },
  nodes: {
    labelHighlightBold: false,
    shape: 'dot',
    size: 4,
    font: {
      color: '#FFFFFF',
      face: 'Lato, "Lucida Grande", Tahoma, Sans-Serif;',
    },
  },
  manipulation: {
    enabled: false,
    editNode(nodeData, callback) {
      callback(nodeData);
    },
  },
  interaction: {
    hover: true,
    dragView: true,
    dragNodes: false,
    hoverConnectedEdges: false,
  },
};

const smoothH = { enabled: true, type: 'horizontal', roundness: 0.9 };
const smoothV = { enabled: true, type: 'vertical', roundness: 0.9 };
const smallCircleEdges = [
  {
    from: 1,
    to: 2,
    smooth: smoothH,
    dashes: [1, 4],
  },
  {
    from: 2, to: 3, smooth: smoothV, dashes: [1, 4],
  },
  {
    from: 3, to: 4, smooth: smoothH, dashes: [1, 4],
  },
  {
    from: 4, to: 1, smooth: smoothV, dashes: [1, 4],
  },
];
const bigCircleEdges = [];
export const edges = [...smallCircleEdges, ...bigCircleEdges];
