const userDao = require('../dao/userDao');
const ingredientDao = require('../dao/ingredientDao');

const { verify } = require('../library/jwt');

async function getUser(token){
    const verifiedToken = verify(token);
    if(verifiedToken < 0) {
        return -2;
    }
    //console.log(verifiedToken.id)
    const userData = await userDao.selectUserByUserId(verifiedToken.id);
    //console.log(userData.length)
    if(userData.length == 0){ // 내가 찾는 user_id 가 없으면
        return -1;
    }
    else{
        return userData;
    }
}

// 이미 있는 재료는 넣으면 안됨.
async function postIngredients(userId, ingredients){
    //console.log(ingredients);

    var dataList = [];
    for(let i=0; i<ingredients.length; i++){
        // 인자로 받은 재료중에 user_has_ingredients 테이블에 있는지 확인
        const existIngredient = await ingredientDao.selectIngredientFromUserHasIngredients(userId, ingredients[i]);
        if(existIngredient.length == 0){ // 없으면
            const data = await userDao.insertIngredientsByUser(userId, ingredients[i]);
            dataList.push(data);
            console.log(data);
        }
    }
    return dataList;
}

async function deleteIngredients(userId, ingredients){
    for(let i=0; i<ingredients.length; i++){
        // 인자로 받은 재료중에 user_has_ingredients 테이블에 있는지 확인
        const existIngredient = await ingredientDao.selectIngredientFromUserHasIngredients(userId, ingredients[i]);
        if(existIngredient.length == 0){ // 없으면
            return -1; // 없는 재료를 삭제하려고 하는 것.
        }
        else{
            // 삭제
            const deletedData = await ingredientDao.deleteIngredientFromUserHasIngredients(userId, ingredients[i]);
            //console.log(deletedData);
        }
    }
    return 1;
}

module.exports = {
    getUser,
    postIngredients,
    deleteIngredients
}