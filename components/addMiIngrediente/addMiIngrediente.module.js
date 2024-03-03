const MiIngrediente = require("../../schemas/misIngredientes.schema")
const Ingrediente = require("../../schemas/ingredientes.schema")

async function addMiIngrediente(req, res) {
    console.log("🚀 ~ addMiIngrediente ~ addMiIngrediente:")
    try {
        console.log(req.body);
        const ingrediente = req.body;
        console.log("🚀 ~ addMiIngrediente ~ ingrediente:", ingrediente)
        if(ingrediente.id == undefined) {
            await addIngrediente(ingrediente);
        }
        const miIng = new MiIngrediente({ idIngrediente: ingrediente.id });
        await miIng.save();
        const misIngs = await MiIngrediente.find().populate("idIngrediente");
        let newMisIngredientes = [];
        for(let ingrediente of misIngs) {
            if(ingrediente.idIngrediente)
                newMisIngredientes.push(ingrediente.idIngrediente);
        }
        return res.status(200).json(newMisIngredientes);
    } catch (error) {
        console.log("🚀 ~ addMiIngrediente ~ error:", error)
        return res.status(500).json(error);
    }
};

async function addIngrediente(ingrediente) {
    let newIngrediente = new Ingrediente({ nombre: ingrediente.nombre, imagen: ingrediente.imagen});
    await newIngrediente.save();
}

module.exports = addMiIngrediente;