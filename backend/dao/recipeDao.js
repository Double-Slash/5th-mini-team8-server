const mysql = require('../library/mysql');

async function insertRecipe(recipeData, recipeText){
    const insertQuery = `INSERT INTO Recipe(name, howtomake, imgUrl_big, imgUrl_small, calorie, protein, fat, natrium) VALUES (?,?,?,?,?,?,?,?)`;
    return await mysql.query(insertQuery, [recipeData.id, recipeText, recipeData.imgUrl_big, recipeData.imgUrl_small, recipeData.calorie, recipeData.protein, recipeData.fat, recipeData.natrium]);
}

async function insertRecipeforFood(r_name, i_name, metering){
    const insertQuery = `INSERT INTO Ingredients_for_Food(recipe_name, ingredients_name, metering) VALUES (?,?,?)`;
    return await mysql.query(insertQuery, [r_name, i_name, metering]);
}

module.exports = {
    insertRecipe,
    insertRecipeforFood
}