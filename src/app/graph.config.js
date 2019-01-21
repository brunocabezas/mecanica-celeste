export default {
  physics: {
    enabled: false
  },
  edges: {
    dashes: [4, 1],
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
    chosen: {
      label: {}
    },
    font: {
      color: "#FFFFFF",
      face: 'Lato, "Lucida Grande", Tahoma, Sans-Serif;'
    }
  },
  manipulation: {
    enabled: false,
    editNode: function(nodeData, callback) {
      if (nodeData.label.length > 0) {
        nodeData.label = "";
      } else {
        nodeData.label = nodeData.hiddenLabel;
      }

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
