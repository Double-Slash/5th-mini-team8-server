const mysql = require('../library/mysql');

async function insertRecipe(recipeData, recipeText){
    const insertQuery = `INSERT INTO Recipe(name, howtomake, imgUrl_big, imgUrl_small, calorie, protein, fat, natrium) VALUES (?,?,?,?,?,?,?,?)`;
    return await mysql.query(insertQuery, [recipeData.id, recipeText, recipeData.imgUrl_big, recipeData.imgUrl_small, recipeData.calorie, recipeData.protein, recipeData.fat, recipeData.natrium]);
}

async function insertRecipeforFood(r_name, i_name, metering){
    const insertQuery = `INSERT INTO Ingredients_for_Food(recipe_name, ingredients_name, metering) VALUES (?,?,?) ON DUPLICATE KEY UPDATE recipe_name = ?, ingredients_name = ?, metering = ?`;
    return await mysql.query(insertQuery, [r_name, i_name, metering,r_name, i_name, metering]);
}

async function selectRecipeListByUser(userId){
    const selectQuery = `SELECT i.recipe_name, 
        (SELECT count(*) FROM ingredients_for_food WHERE i.recipe_name = ingredients_for_food.recipe_name) as total,
        count(*) as my_count
        FROM user_has_ingredients u JOIN ingredients_for_food i ON u.ingredients_name = i.ingredients_name
        WHERE u.user_id = ?
        GROUP BY i.recipe_name`;
    return await mysql.query(selectQuery, [userId]);
}

module.exports = {
    insertRecipe,
    insertRecipeforFood,
    selectRecipeListByUser
}