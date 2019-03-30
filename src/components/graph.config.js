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
    labelHighlightBold: true,
    font: {
      size: 6,
      face: 'Roboto-Light',
    },
    shape: 'dot',
    size: 3,
    shadow: true,
    borderWidth: 0,
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

const smoothH = { enabled: true, type: 'horizontal', roundness: 0.8 };
const smoothV = { enabled: true, type: 'vertical', roundness: 0.8 };
const smallCircleEdges = [
  {
    from: 1,
    to: 2,
    smooth: smoothV,
    dashes: [1, 4],
  },
  {
    from: 2,
    to: 3,
    smooth: smoothH,
    dashes: [1, 4],
  },
  {
    from: 3,
    to: 4,
    smooth: smoothV,
    dashes: [1, 4],
  },
  {
    from: 4,
    to: 1,
    smooth: smoothH,
    dashes: [1, 4],
  },
];
const bigCircleEdges = [];
export const edges = [...smallCircleEdges, ...bigCircleEdges];
