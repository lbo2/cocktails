const fs = require('fs-extra')
const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const misIngredientes = require('../../jsons/misIngredientes.json');
const unidades = require('../../jsons/unidades.json');

async function eliminarMiIngrediente(req, res) {
    console.log("🚀 ~ eliminarMiIngrediente ~ eliminarMiIngrediente:")
    try {
        const ingrediente = req.body.id;
        let indexEliminar;
        for (let i = 0; i < misIngredientes.misIngredientes.length; i++) {
            if(misIngredientes.misIngredientes[i] == ingrediente) {
                indexEliminar = i;
                break;
            }
        }
        if(indexEliminar != undefined) {
            misIngredientes.misIngredientes.splice(indexEliminar, 1);
        }
        await fs.writeFile("./jsons/misIngredientes.json", JSON.stringify(misIngredientes));
        return res.status(200).json(misIngredientes.misIngredientes);
    } catch (error) {
        console.log("🚀 ~ eliminarMiIngrediente ~ error:", error)
        return res.status(500).json(error);
    }
};

module.exports = eliminarMiIngrediente;