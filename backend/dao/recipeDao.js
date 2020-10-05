const mysql = require('../library/mysql');

async function insertRecipe(recipeData, recipeText){
    const insertQuery = `INSERT INTO Recipe(name, howtomake, imgUrl_big, imgUrl_small, calorie, protein, fat, natrium) VALUES (?,?,?,?,?,?,?,?)`;
    return await mysql.query(insertQuery, [recipeData.id, recipeText, recipeData.imgUrl_big, recipeData.imgUrl_small, recipeData.calorie, recipeData.protein, recipeData.fat, recipeData.natrium]);
}

async function insertRecipeforFood(r_name, i_name, metering){
    const insertQuery = `INSERT INTO Ingredients_for_Food(recipe_name, ingredients_name, metering) VALUES (?,?,?) ON DUPLICATE KEY UPDATE recipe_name = ?, ingredients_name = ?, metering = ?`;
    return await mysql.query(insertQuery, [r_name, i_name, metering,r_name, i_name, metering]);
}

async function selectRecipeByRecipeNameUsingJoin(recipeName){
    const selectQuery = `SELECT r.recipe_name, r.howtomake, r.protein, r.natrium, r.fat, group_concat(i.ingredients_name) as ingredients, group_concat(i.metering) as metering
                        FROM recipe r join ingredients_for_food i ON r.recipe_name = i.recipe_name
                        WHERE r.recipe_name = ?`;
    return await mysql.query(selectQuery, [recipeName]);
}

async function selectRecipeListByUser(userId){
    const selectQuery = `SELECT i.recipe_name, 
        (SELECT count(*) FROM ingredients_for_food WHERE i.recipe_name = ingredients_for_food.recipe_name) as total,
        count(*) as my_count
        FROM user_has_ingredients u JOIN ingredients_for_food i ON u.ingredients_name = i.ingredients_name
        WHERE u.user_id = ?
        GROUP BY i.recipe_name
        HAVING (my_count/total) * 100 >= 60`;
    return await mysql.query(selectQuery, [userId]);
}

async function selectRecipeByRecipeName(recipeName){
    const selectQuery = `SELECT name, imgUrl_big, imgUrl_small, calorie
                        FROM recipe
                        WHERE name = ?`;
    return await mysql.query(selectQuery, [recipeName]);
}

module.exports = {
    insertRecipe,
    insertRecipeforFood,
    selectRecipeByRecipeNameUsingJoin,
    selectRecipeListByUser,
    selectRecipeByRecipeName
}