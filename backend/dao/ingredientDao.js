const mysql = require('../library/mysql');

async function insertIngredient(ingredient){
    const insertQuery = `INSERT INTO ingredients(ingredient_name) VALUES (?)`;
    return await mysql.query(insertQuery, [ingredient]);
}

async function selectIngredient(ingredient){
    const selectQuery = `SELECT ingredient_name FROM ingredients where ingredient_name = ?`;
    return await mysql.query(selectQuery, [ingredient]);
}

async function selectIngredientFromUserHasIngredients(ingredient){
    const selectQuery = `SELECT ingredients_name FROM user_has_ingredients where ingredients_name = ?`;
    return await mysql.query(selectQuery, [ingredient]);
}

module.exports = {
    insertIngredient,
    selectIngredient,
    selectIngredientFromUserHasIngredients
}