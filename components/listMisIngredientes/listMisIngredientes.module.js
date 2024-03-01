const MiIngrediente = require("../../schemas/misIngredientes.schema")
const Ingrediente = require("../../schemas/ingredientes.schema")

const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const unidades = require('../../jsons/unidades.json');
const misIngredientes = require('../../jsons/misIngredientes.json');

async function listMisIngredientes(req, res) {
    console.log("🚀 ~ listMisIngredientes ~ listMisIngredientes:")
    try {

        // const ingDB = await Ingrediente.find();
        // console.log("🚀 ~ listRecetasModule ~ ingDB:", ingDB)


        // let result = ingredientes.ingredientes.filter((ing) => misIngredientes.misIngredientes.includes(ing.id));
        // console.log("🚀 ~ listMisIngredientes ~ result:", result)
        // result.forEach(async ing => {
        //     const idIngrediente = ingDB.find(({ nombre })  => nombre == ing.nombre);
        //     console.log("🚀 ~ listMisIngredientes ~ idIngrediente:", idIngrediente["_id"])
        //     const ingrediente = new MiIngrediente({ "idIngrediente": idIngrediente["_id"] });
        //     await ingrediente.save();
        // });

        const misIngs = await MiIngrediente.find({}, { "_id": false, "__v": false }).populate("idIngrediente");
        console.log("🚀 ~ listMisIngredientes ~ misIngs:", misIngs)
        return res.status(200).json(misIngs);
    } catch (error) {
        console.log("🚀 ~ listMisIngredientes ~ error:", error)
        return res.status(500).json(error);
    }
};

module.exports = listMisIngredientes;