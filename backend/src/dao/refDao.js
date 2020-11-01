const mysql = require('../library/mysql');

async function selectIngredientsByUser(userData){
    const selectQuery = `SELECT ingredients_name FROM User_has_Ingredients WHERE user_id = ?`;
    return await mysql.query(selectQuery, [userData]);
}

module.exports = {
    selectIngredientsByUser
}