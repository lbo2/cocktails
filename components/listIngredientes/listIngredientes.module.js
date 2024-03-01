const Ingrediente = require("../../schemas/ingredientes.schema");

const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const unidades = require('../../jsons/unidades.json');
const misIngredientes = require('../../jsons/misIngredientes.json');

async function listIngredientes(req, res) {
    console.log("🚀 ~ listIngredientes ~ listIngredientes:")
    try {
        const ingredientesDB = await Ingrediente.find();

        return res.status(200).json(ingredientesDB);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = listIngredientes;