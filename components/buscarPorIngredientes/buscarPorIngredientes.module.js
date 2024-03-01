const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const unidades = require('../../jsons/unidades.json');

async function buscarPorIngredientes(req, res) {
    console.log("🚀 ~ buscarPorIngredientes ~ buscarPorIngredientes:")
    console.log("🚀 ~ buscarPorIngredientes ~ req.body:", req.body)
    try {
        let result;
        const ingredientesRecetas = getIngredientesRecetas(req.body.ingredientes);
        console.log("🚀 ~ buscarPorIngredientes ~ ingredientesRecetas:", ingredientesRecetas)
        // const adentro = estaDentro(ingredientesRecetas, req.body.ingredientes)
        // console.log("🚀 ~ buscarPorIngredientes ~ adentro:", adentro)
        
        return res.status(200).json(ingredientesRecetas);
    } catch (error) {
        return res.status(500).json(error);
    }
};

function getIngredientesRecetas(ingredientesInput) {
  try {
    console.log("🚀 ~ getIngredientesRecetas ~ ingredientesInput:", ingredientesInput)
    let listRecetas = [];
    recetas.recetas.forEach(receta => {
        console.log("🚀 ~ getIngredientesRecetas ~ receta:", receta.nombre)
        let ingredientesTemp = [];
        receta.ingredientes.forEach(ingrediente => {
            ingredientesTemp.push(ingrediente.id);
        });
        ingredientesTemp = ingredientesTemp;
        console.log("🚀 ~ getIngredientesRecetas ~ ingredientes:", ingredientesTemp)
        const adentro = estaDentro(ingredientesTemp, ingredientesInput)
        console.log("🚀 ~ getIngredientesRecetas ~ adentro:", adentro)
        if(adentro) {
          let arrIngredientes = [];
          let ingredients = receta.ingredientes.map(ingrediente => {
              resultIngrediente = {
                  "nombre": ingredientes.ingredientes.find(({ id }) => id === ingrediente.id).nombre,
                  "cantidad": ingrediente.cantidad,
                  "unidad": unidades.unidades.find(({ id }) => id === ingrediente.unidad).nombre
              }
              return resultIngrediente
          })
          arrIngredientes.push(ingredients);
          const result = {
              id: receta.id,
              nombre: receta.nombre,
              ingredientes: arrIngredientes,
              instrucciones: receta.instrucciones,
              imagen: receta.imagen
          }
          console.log("🚀 ~ getIngredientesRecetas ~ result:", result)
          listRecetas.push(result)
        }
    })
    console.log("🚀 ~ getIngredientesRecetas ~ listRecetas:", listRecetas)
    return listRecetas
  } catch (error) {
    console.log("🚀 ~ getIngredientesRecetas ~ error:", error)
    
  }
    
}

function estaDentro(ingredientesReceta, arreglo) {
  if (arreglo.length >= ingredientesReceta.length) {
    let coincide = true;
    for (let j = 0; j < ingredientesReceta.length; j++) {
      if (!arreglo.includes(ingredientesReceta[j])) {
        coincide = false;
        break;
      }
    }
    if (coincide) {
      return true;
    }
  }
  return false;
}

module.exports = buscarPorIngredientes;