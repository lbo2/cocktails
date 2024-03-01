const recetas = require('./recetas.json');
const ingredientes = require('./ingredientes.json');
const misIngredientes = require('./misIngredientes.json');
const unidades = require('./unidades.json');

function ingredientesUnidades() {
    // (NULL, 1, 1),
    console.log(ingredientes)
    console.log("INSERT INTO `ingredientesUnidades` (`id`,`idIngrediente`,`idUnidad`)");
    console.log("VALUES")
    ingredientes.ingredientes.forEach(ing => {
        ing.unidades.forEach(unidad => {
            console.log(`(NULL, ${ing.id + 1}, ${unidad + 1}),`);
        });
    });
}

function recetasIngredientes() {
    // (NULL, 1, 1),
    
    console.log(recetas)
    console.log("CREATE TABLE `recetasIngredientes` (");
    console.log("    `id` INT NOT NULL AUTO_INCREMENT,");
    console.log("    `idReceta` INT,");
    console.log("    `idIngrediente` INT,");
    console.log("    `idUnidad` INT,");
    console.log("    `cantidad` VARCHAR(255)");
    console.log("      );");

    console.log("INSERT INTO `recetasIngredientes` (`id`,`idReceta`,`idIngrediente`,`idUnidad`,`cantidad`)");
    console.log("VALUES")
    recetas.recetas.forEach(receta => {
        receta.ingredientes.forEach(ingrediente => {
            console.log(`(NULL, ${receta.id + 1}, ${ingrediente.id + 1}, ${ingrediente.unidad + 1}, ${ingrediente.cantidad}),`);
        });
    });
}

// ingredientesUnidades();
recetasIngredientes()