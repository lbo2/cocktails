const fs = require('fs-extra')
const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const unidades = require('../../jsons/unidades.json');

const Ingrediente = require("../../schemas/ingredientes.schema");
const Receta = require("../../schemas/recetas.schema");

async function addRecetaModule(req, res) {
    console.log("🚀 ~ addRecetaModule ~ addRecetaModule:")
    try {
        console.log(req.body);
        const receta = req.body;
        const ingredientesDB = await Ingrediente.find();
        let arrIngredientes = [];

        for(let ingrediente of receta.ingredientes) {
            arrIngredientes.push({
                "id": await getIdIngrediente(ingrediente, ingredientesDB),
                "cantidad": ingrediente.cantidad,
                "unidad": ingrediente.unidad,
            })
        }

        receta.ingredientes = arrIngredientes;
        const newReceta = new Receta(receta);
        await newReceta.save();
        return res.status(200).json(newReceta);
    } catch (error) {
        console.log("🚀 ~ addRecetaModule ~ error:", error)
        return res.status(500).json(error.message);
    }
};

async function getIdIngrediente(ingrediente, listIngredientes) {
    const encontrado = listIngredientes.find(({ nombre }) => nombre === ingrediente.nombre);
    if(encontrado != undefined) {
        id = encontrado._id;
    } else {
        const nuevoIngrediente = await addIngrediente(ingrediente);
        id = nuevoIngrediente._id;
    }
    return id;
}

async function addIngrediente(ingrediente) {
    let newIngrediente = new Ingrediente({ nombre: ingrediente.nombre, imagen: ""});
    return await newIngrediente.save();
}

module.exports = addRecetaModule;