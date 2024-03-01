const mongoose = require("mongoose");

const ingredientesSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    imagen: { type: String }
});

module.exports = mongoose.model("Ingrediente", ingredientesSchema);