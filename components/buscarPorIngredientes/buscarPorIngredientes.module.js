const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const unidades = require('../../jsons/unidades.json');

const Receta = require("../../schemas/recetas.schema");

async function buscarPorIngredientes(req, res) {
    console.log("🚀 ~ buscarPorIngredientes ~ buscarPorIngredientes:")
    console.log("🚀 ~ buscarPorIngredientes ~ req.body:", req.body)
    try {
        const ingredientesRecetas = await getIngredientesRecetas(req.body.ingredientes);
        console.log("🚀 ~ buscarPorIngredientes ~ ingredientesRecetas:", ingredientesRecetas)
        // const adentro = estaDentro(ingredientesRecetas, req.body.ingredientes)
        // console.log("🚀 ~ buscarPorIngredientes ~ adentro:", adentro)
        
        return res.status(200).json(ingredientesRecetas);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getIngredientesRecetas(ingredientesInput) {
  try {
    console.log("🚀 ~ getIngredientesRecetas ~ ingredientesInput:", ingredientesInput)
    let listRecetas = [];
    const recetasDB = await Receta.find().populate("ingredientes.id");

    recetasDB.forEach(receta => {
        console.log("🚀 ~ getIngredientesRecetas ~ receta:", receta.nombre)
        let ingredientesTemp = [];
        receta.ingredientes.forEach(ingrediente => {
          ingredientesTemp.push(ingrediente.id._id.toString());
        });
        console.log("🚀 ~ getIngredientesRecetas ~ ingredientes:", ingredientesTemp)
        const adentro = estaDentro(ingredientesTemp, ingredientesInput)
        console.log("🚀 ~ getIngredientesRecetas ~ adentro:", adentro)
        if(adentro) {
          let arrIngredientes = [];
          let ingredients = receta.ingredientes.map(ingrediente => {
              resultIngrediente = {
                  "nombre": ingrediente.id.nombre,
                  "cantidad": ingrediente.cantidad,
                  "unidad": ingrediente.unidad,
              }
              return resultIngrediente
          })
          arrIngredientes.push(ingredients);
          const result = {
              id: receta._id,
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
    console.log("🚀 ~ estaDentro ~ arreglo:", arreglo)
    for (let j = 0; j < ingredientesReceta.length; j++) {
      console.log("🚀 ~ estaDentro ~ ingredientesReceta[j]:", ingredientesReceta[j])
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