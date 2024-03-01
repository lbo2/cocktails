const mongoose = require("mongoose");
const ingredientesSchema = require("./ingredientes.schema");

const recetaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    ingredientes: [{
        id: { type: mongoose.SchemaTypes.ObjectId , ref: ingredientesSchema},
        cantidad: String,
        unidad: String
    }],
    instrucciones: { type: String, required: true },
    imagen: String
});

module.exports = mongoose.model("Receta", recetaSchema);