export default {
  width: "100%",
  height: "100%",
  physics: {
    enabled: false
  },
  edges: {
    dashes: true,
    arrows: {
      to: { enabled: false }
    },
    chosen: false,
    color: { color: "#FFFFFF" },
    font: { strokeWidth: 10 },
    hoverWidth: function(width) {
      // console.log(width)
      return 0;
    },
    selectionWidth: 0
  },
  nodes: {
    labelHighlightBold: false,
    shape: "dot",
    size: 4,
    font: {
      color: "#FFFFFF",
      face: 'Lato, "Lucida Grande", Tahoma, Sans-Serif;'
    }
  },
  manipulation: {
    enabled: false,
    editNode: function(nodeData, callback) {
      callback(nodeData);
    }
  },
  interaction: {
    hover: true,
    dragView: true,
    dragNodes: false,
    hoverConnectedEdges: false
  }
};
