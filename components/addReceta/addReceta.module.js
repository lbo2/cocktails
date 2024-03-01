const fs = require('fs-extra')
const recetas = require('../../jsons/recetas.json');
const ingredientes = require('../../jsons/ingredientes.json');
const unidades = require('../../jsons/unidades.json');

async function addRecetaModule(req, res) {
    console.log("🚀 ~ addRecetaModule ~ addRecetaModule:")
    try {
        console.log(req.body);
        const receta = req.body;
        let arrIngredientes = [];

        receta.ingredientes.map( ingrediente => {
            const unidadId =  getIdUnidad(ingrediente.unidad);
            const ingredienteId =  getIdIngrediente(ingrediente);
            arrIngredientes.push({
                "id": ingredientes.ingredientes.find(({ nombre }) => nombre === ingrediente.nombre).id,
                "cantidad": ingrediente.cantidad,
                "unidad":unidades.unidades.find(({ nombre }) => nombre === ingrediente.unidad).id
            })
        })
        receta.ingredientes = arrIngredientes;
        receta.id = getLastIdRecetas();
        console.log("🚀 ~ addRecetaModule ~ receta:", receta)
        recetas.recetas.push(receta);
        await fs.writeFile("./jsons/recetas.json", JSON.stringify(recetas));
        return res.status(200).json(receta);
    } catch (error) {
        return res.status(500).json(error);
    }
};

async function getIdUnidad(unidad) {
    const encontrado = unidades.unidades.find(({ nombre }) => nombre === unidad);
    id = encontrado != undefined ? encontrado.id : await addUnidad(unidad);
    return id;
}

async function addUnidad(unidad) {
    let index;
    if(unidades.unidades.length == 0) {
        index = 0;
    } else {
        const lastItem = unidades.unidades[unidades.unidades.length-1]
        index = lastItem.id + 1;
    }
    unidades.unidades.push({
        "id": index,
        "nombre": unidad,
    })
    await fs.writeFile("./jsons/unidades.json", JSON.stringify(unidades));
    return index;
}

async function getIdIngrediente(ingrediente) {
    const encontrado = ingredientes.ingredientes.find(({ nombre }) => nombre === ingrediente.nombre);
    id = encontrado != undefined ? encontrado.id : await addIngrediente(ingrediente);
    return id;
}

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
        "unidades": [unidades.unidades.find(({ nombre }) => nombre === ingrediente.unidad).id],
        "imagen": ""
    })
    await fs.writeFile("./jsons/ingredientes.json", JSON.stringify(ingredientes));
    return index;
}

function getLastIdRecetas() {
    let index;
    if(recetas.recetas.length == 0) {
        index = 0;
    } else {
        const lastItem = recetas.recetas[recetas.recetas.length-1]
        index = lastItem.id + 1;
    }
    return index;
}

module.exports = addRecetaModule;