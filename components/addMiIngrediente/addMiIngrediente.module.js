const fs = require('fs-extra')
const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const misIngredientes = require('../../jsons/misIngredientes.json');
const unidades = require('../../jsons/unidades.json');

async function addMiIngrediente(req, res) {
    console.log("🚀 ~ addMiIngrediente ~ addMiIngrediente:")
    try {
        console.log(req.body);
        const ingrediente = req.body;
        console.log("🚀 ~ addMiIngrediente ~ ingrediente:", ingrediente)
        let index;
        let encontrado;
        if(ingrediente.id == undefined) {
            index = await addIngrediente(ingrediente);
            encontrado = {
                id: index,
                nombre: ingrediente.nombre,
                unidades: ingrediente.unidad != undefined ? [ingrediente.unidad] : [],
                imagen: ingrediente.imagen
            }
        } else {
            encontrado = ingredientes.ingredientes.find(({ id }) => id === ingrediente.id);
        }
        console.log("🚀 ~ addMiIngrediente ~ encontrado:", encontrado)
        misIngredientes.misIngredientes.push(encontrado.id)
        await fs.writeFile("./jsons/misIngredientes.json", JSON.stringify(misIngredientes));
        return res.status(200).json(misIngredientes.misIngredientes);
    } catch (error) {
        console.log("🚀 ~ addMiIngrediente ~ error:", error)
        return res.status(500).json(error);
    }
};

async function addIngrediente(ingrediente) {
    let index;
    if(ingredientes.ingredientes.length == 0) {
        index = 0;
    } else {
        const lastItem = ingredientes.ingredientes[ingredientes.ingredientes.length-1]
        index = lastItem.id + 1;
    }
    ingredientes.ingredientes.push({
        "id": index,
        "nombre": ingrediente.nombre,
        "unidades": ingrediente.unidad != undefined ? [unidades.unidades.find(({ nombre }) => nombre === ingrediente.unidad).id] : [],
        "imagen": ""
    })
    await fs.writeFile("./jsons/ingredientes.json", JSON.stringify(ingredientes));
    return index;
}

module.exports = addMiIngrediente;