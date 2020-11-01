const mysql = require('../library/mysql');

async function insertIngredient(ingredient){
    const insertQuery = `INSERT INTO Ingredients(ingredient_name) VALUES (?)`;
    return await mysql.query(insertQuery, [ingredient]);
}

async function selectIngredient(ingredient){
    const selectQuery = `SELECT ingredient_name FROM Ingredients where ingredient_name = ?`;
    return await mysql.query(selectQuery, [ingredient]);
}

async function selectIngredientWhereContain(ingredient){
    const selectQuery = `SELECT ingredient_name FROM Ingredients where ingredient_name like ? order by ingredient_name`;
    return await mysql.query(selectQuery, [ingredient]);
}

async function selectIngredientFromUserHasIngredients(userId, ingredient){
    const selectQuery = `SELECT ingredients_name FROM User_has_Ingredients where user_id = ? and ingredients_name = ?`;
    return await mysql.query(selectQuery, [userId, ingredient]);
}

async function deleteIngredientFromUserHasIngredients(userId, ingredient){
    const deleteQuery = `DELETE FROM User_has_Ingredients WHERE user_id = ? and ingredients_name = ?`;
    return await mysql.query(deleteQuery, [userId, ingredient]);
}

module.exports = {
    insertIngredient,
    selectIngredient,
    selectIngredientWhereContain,
    selectIngredientFromUserHasIngredients,
    deleteIngredientFromUserHasIngredients
}