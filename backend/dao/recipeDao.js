const mysql = require('../library/mysql');

async function insertRecipe(recipeData, recipeText){
    const insertQuery = `INSERT INTO Recipe(name, howtomake, imgUrl_big, imgUrl_small, calorie, protein, fat, natrium) VALUES (?,?,?,?,?,?,?,?)`;
    return await mysql.query(insertQuery, [recipeData.id, recipeText, recipeData.imgUrl_big, recipeData.imgUrl_small, recipeData.calorie, recipeData.protein, recipeData.fat, recipeData.natrium]);
}

async function insertRecipeforFood(r_name, i_name, metering){
    const insertQuery = `INSERT INTO Ingredients_for_Food(recipe_name, ingredients_name, metering) VALUES (?,?,?) ON DUPLICATE KEY UPDATE recipe_name = ?, ingredients_name = ?, metering = ?`;
    return await mysql.query(insertQuery, [r_name, i_name, metering,r_name, i_name, metering]);
}

async function selectRecipeByRecipeName(recipeName){
    const selectQuery = `SELECT r.recipe_name, r.howtomake, r.protein, r.natrium, r.fat, group_concat(i.ingredients_name) as ingredients, group_concat(i.metering) as metering
                        FROM recipe r join ingredients_for_food i ON r.recipe_name = i.recipe_name
                        WHERE r.recipe_name = ?`;
    return await mysql.query(selectQuery, [recipeName]);
}

module.exports = {
    insertRecipe,
    insertRecipeforFood,
    selectRecipeByRecipeName
}