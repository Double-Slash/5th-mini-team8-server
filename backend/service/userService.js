const userDao = require('../dao/userDao');
const ingredientDao = require('../dao/ingredientDao');


async function getUser(userId){
    const userData = await userDao.selectUserByUserId(userId);
    if(userData.length == 0){ // 내가 찾는 user_id 가 없으면
        return -1;
    }
    else{
        return userData;
    }
}

// 이미 있는 재료는 넣으면 안됨.
async function postIngredients(userId, ingredients){
    console.log(ingredients);

    var dataList = [];
    for(var i=0; i<ingredients.length; i++){
        // 인자로 받은 재료중에 ingredients 테이블에 있는지 확인
        const existIngredient = ingredientDao.selectIngredient(ingredients[i]);
        if(existIngredient.length == 0){ // 없으면
            const data = await userDao.insertIngredientsByUser(userId, ingredients[i]);
            dataList.push(data);
            console.log(data);
        }
    }
    return dataList;
}

module.exports = {
    getUser,
    postIngredients
}