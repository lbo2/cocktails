const MiIngrediente = require("../../schemas/misIngredientes.schema")

async function eliminarMiIngrediente(req, res) {
    console.log("🚀 ~ eliminarMiIngrediente ~ eliminarMiIngrediente:")
    try {
        const ingrediente = req.body.id;
        console.log("🚀 ~ eliminarMiIngrediente ~ ingrediente:", ingrediente)
        const misIngs = await MiIngrediente.find().populate("idIngrediente");

        let newMisIngredientes = [];
        for (let i = 0; i < misIngs.length; i++) {
            console.log("🚀 ~ eliminarMiIngrediente ~ misIngs[i]:", misIngs[i])
            if(misIngs[i].idIngrediente && misIngs[i].idIngrediente._id == ingrediente) {
                await MiIngrediente.deleteOne({ _id: misIngs[i]._id });
            } else {
                if(misIngs[i].idIngrediente)
                    newMisIngredientes.push(misIngs[i].idIngrediente);
            }
        }

        return res.status(200).json(newMisIngredientes);
    } catch (error) {
        console.log("🚀 ~ eliminarMiIngrediente ~ error:", error)
        return res.status(500).json(error);
    }
};

module.exports = eliminarMiIngrediente;