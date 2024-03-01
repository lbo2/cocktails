const mongoose = require("mongoose");
const ingredientesSchema = require("./ingredientes.schema");

const misIngredientesSchema = new mongoose.Schema({
    idIngrediente: { type: mongoose.SchemaTypes.ObjectId , ref: ingredientesSchema}
});

module.exports = mongoose.model("MiIngrediente", misIngredientesSchema);