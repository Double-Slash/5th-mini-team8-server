const mysql = require('../library/mysql');

async function selectIngredientsByUser(userData){
    const selectQuery = `SELECT ingredients_name FROM user_has_ingredients WHERE user_id = ?`;
    return await mysql.query(selectQuery, [userData]);
}

module.exports = {
    selectIngredientsByUser
}