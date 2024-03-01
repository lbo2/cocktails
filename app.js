const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;


const listRecetasModule = require("./components/listRecetas/listRecetas.module");
const addRecetaModule = require("./components/addReceta/addReceta.module");
const buscarPorIngredientesModule = require("./components/buscarPorIngredientes/buscarPorIngredientes.module");
const getRecetaByIdModule = require("./components/getRecetaById/getRecetaById.module");
const addMiIngredienteModule = require("./components/addMiIngrediente/addMiIngrediente.module");
const eliminarMiIngredienteModule = require("./components/eliminarMiIngrediente/eliminarMiIngrediente.module");
const listMisIngredientesModule = require("./components/listMisIngredientes/listMisIngredientes.module");
const listIngredientesModule = require("./components/listIngredientes/listIngredientes.module");

const app = express();
app.use(cors())
app.use(bodyParser.json());

app.get( '/recetas', listRecetasModule);
app.post( '/addreceta', addRecetaModule);
app.post( '/buscarporingredientes', buscarPorIngredientesModule);
app.get( '/getrecetabyid', getRecetaByIdModule);
app.post( '/addmiingrediente', addMiIngredienteModule);
app.post( '/eliminarmiingrediente', eliminarMiIngredienteModule);
app.get( '/listMisIngredientes', listMisIngredientesModule);
app.get( '/listingredientes', listIngredientesModule);

connectDB();

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

function connectDB() {
    mongoose.connect('mongodb+srv://lbo2mail:OUvXOPYHDI1C1cRw@cluster0.c1lpqrw.mongodb.net/cocktails?retryWrites=true&w=majority');
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection failed: "));
    db.once("open", function () {
        console.log("Connected to the database successfully");
    })
}
