import {colors} from './helpers';

export const nodes = (nodes)=>{
  if(!nodes) return nodes;

  return nodes
    .map((obj,i)=>Object.assign({
        wpId:obj.id ,
        id : i+1,
        label : "",
        color : colors.randomElement(),
        hiddenLabel : obj.acf.nombre
      }))
    .map(d=>d);
};