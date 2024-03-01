const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const unidades = require('../../jsons/unidades.json');

async function getRecetaById(req, res) {
    console.log("🚀 ~ getRecetaById ~ req.query:", req.query)
    console.log("🚀 ~ getRecetaById ~ getRecetaById:")
    try {
        const receta = recetas.recetas.find(({ id }) => id === Number(req.query.id))
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
        return res.status(200).json({
            id: receta.id,
            nombre: receta.nombre,
            ingredientes: arrIngredientes,
            instrucciones: receta.instrucciones,
            imagen: receta.imagen
        })
    } catch (error) {
        console.log("🚀 ~ getRecetaById ~ error:", error)
        return res.status(500).json(JSON.stringify(error))
    }
};

module.exports = getRecetaById;