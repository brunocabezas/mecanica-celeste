export default {
  physics:{
    enabled: true
  },
  edges: {
    arrows : {
      to : {enabled : false}
    },
    chosen: false,
      color : { color:"#818280"},
    font : { strokeWidth : 0},
    hoverWidth : function (width) {
      // console.log(width)
      return 0.;},
    selectionWidth : 0
  },
  nodes : {
    labelHighlightBold : false,
      shape : "dot",
      chosen : {
      label : {}
    }
  },
  manipulation:{
    enabled: false,
      editNode : function(nodeData,callback) {

      if (nodeData.label.length>0){
        nodeData.label = "";
      } else {
        nodeData.label = nodeData.hiddenLabel;
      }

      callback(nodeData);
    }
  },
  interaction:{
    hover: true,
      dragView : false,
      hoverConnectedEdges : false
  }
}