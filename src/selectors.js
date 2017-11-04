import {colors} from './helpers';

export const nodes = (nodes,categories = null)=> {
  if (!nodes) return nodes;

  return nodes
    /* removing items with nothing defined under "acf" attribute (all keys nulled) */
    .filter(obj=>Object.keys(obj.acf)
      .find(key=>obj.acf[key]))
    .map((obj, i) =>{
      const category = !categories || !obj.repositorio.length === 0 ? null :
        categories.find(cat => cat.id === obj.repositorio[0]);

      return Object.assign({
        wpId: obj.id,
        id: i + 1,
        label: "",
        acf : obj.acf,
        hiddenLabel: obj.title ? obj.title.rendered : "",
        category,
        color : category ? category.color :
          colors.randomElement()
      });
    });
};


export const categories = (categories)=>{
  if(!categories) return categories;

  return categories
    .map((obj,i)=>Object.assign({
      id : obj.id,
      label : obj.name,
      slug : obj.slug,
      color : colors.randomElement(),
      desc : obj.description,
      acf : obj.acf
    }));
};