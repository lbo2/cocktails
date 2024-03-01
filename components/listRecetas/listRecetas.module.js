const mongoose = require("mongoose");

const User = require("../../schemas/user.schema");
const Receta = require("../../schemas/recetas.schema");
const Ingrediente = require("../../schemas/ingredientes.schema");

const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const unidades = require('../../jsons/unidades.json');

async function listRecetasModule(req, res) {
    console.log("🚀 ~ listRecetasModule ~ listRecetasModule:")
    try {

        // TEST MONGO
        // const user = new User({ email: "lbo2mail@gmail.com", password: "121212" });
        // await user.save();
        // console.log("🚀 ~ listRecetasModule ~ user:", user)

        // ingredientes.ingredientes.forEach(async ing => {
        //     console.log("🚀 ~ listRecetasModule ~ ing:", ing.nombre)
        //     if(ing.nombre != undefined) {
        //         const ingrediente = new Ingrediente({"nombre": ing.nombre});
        //         await ingrediente.save();
        //         console.log("🚀 ~ listRecetasModule ~ ingrediente:", ingrediente)
        //     }
        // });


        // const receta = new Receta({
        //     "nombre": "Manhattan",
        //     "ingredientes": [
        //         {
        //             "id": '65e0f061f56ec882b83cf913',
        //             "cantidad": "2",
        //             "unidad": "ml"
        //         },
        //         {
        //             "id": '65e0f061f56ec882b83cf918',
        //             "cantidad": "1",
        //             "unidad": "ml"
        //         },
        //         {
        //             "id": '65e0f061f56ec882b83cf90f',
        //             "cantidad": "4",
        //             "unidad": "roca"
        //         }
        //     ],
        //     "instrucciones": "Mezclar el whisky de centeno, el vermut dulce y las gotas de Angostura en un vaso con hielo. Remover bien y colar en una copa de cóctel fría. Decorar con una cereza al marrasquino.",
        //     "imagen": "https://www.pamperedchef.com/iceberg/com/recipe/1445550-lg.jpg"
        // });
        // await receta.save();
        // console.log("🚀 ~ listRecetasModule ~ user:", receta)

        // const ingDB = await Ingrediente.find();
        // console.log("🚀 ~ listRecetasModule ~ ingDB:", ingDB)

        // let newRecetas = [];
        // recetas.recetas.forEach(receta => {
        //     let newIngredientes = [];
        //     receta.ingredientes.forEach(ing => {
        //         if(ing.id != undefined && ing.cantidad != undefined) {
        //             const nombreIngrediente = ingredientes.ingredientes.find(({ id }) => id === ing.id).nombre
        //             newIngredientes.push({
        //                 "id": ingDB.find(({ nombre }) => nombre === nombreIngrediente)._id,
        //                 "cantidad": ing.cantidad,
        //                 "unidad": unidades.unidades.find(({ id }) => id === ing.unidad).nombre
        //             })
        //         }
        //     });
        //     const newReceta = {
        //         "nombre": receta.nombre,
        //         "ingredientes": newIngredientes,
        //         "instrucciones": receta.instrucciones,
        //         "imagen": receta.imagen
        //     }
        //     newRecetas.push(newReceta)
        //     console.log("🚀 ~ listRecetasModule ~ newReceta:", newReceta)
        //     const recetaModel = new Receta(newReceta);
        //     recetaModel.save();
        // });


        // const ingDB = await Ingrediente.find();
        // console.log("🚀 ~ listRecetasModule ~ ingDB:", ingDB)

        const recetasDB = await Receta.find().populate("ingredientes.id");
        // console.log("🚀 ~ listRecetasModule ~ recetasDB:", recetasDB)
        // recetasDB.forEach(rec => {
        //     console.log("🚀 ~ listRecetasModule ~ ingDB:", rec.ingredientes)
        // });

        let result = recetasDB.map(receta => {
            let arrIngredientes = [];
            let ingredients = receta.ingredientes.map(ingrediente => {
                resultIngrediente = {
                    "nombre": ingrediente.id.nombre,
                    "cantidad": ingrediente.cantidad,
                    "unidad": ingrediente.unidad,
                }
                return resultIngrediente
            })
            arrIngredientes.push(ingredients);
            return {
                id: receta.id,
                nombre: receta.nombre,
                ingredientes: arrIngredientes,
                instrucciones: receta.instrucciones,
                imagen: receta.imagen
            }
        })
        return res.status(200).json(result);
    } catch (error) {
        console.log("🚀 ~ listRecetasModule ~ error:", error)
        return res.status(500).json(error);
    }
};

module.exports = listRecetasModule;