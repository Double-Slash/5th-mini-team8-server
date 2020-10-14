const mysql = require('../library/mysql');

async function selectUserByUserId(userData){
    const selectQuery = `SELECT * FROM User WHERE user_id = ?`;
    return await mysql.query(selectQuery, [userData]);
}

async function insertIngredientsByUser(userId, ingredient){
    const insertQuery = `INSERT INTO User_has_Ingredients(user_id, ingredients_name) VALUES (?, ?)`;
    return await mysql.query(insertQuery, [userId, ingredient]);
}

module.exports = {
    selectUserByUserId,
    insertIngredientsByUser
}