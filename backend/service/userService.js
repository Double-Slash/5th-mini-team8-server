const userDao = require('../dao/userDao');

async function getUser(userId){
    const userData = await userDao.selectUserByUserId(userId);
    if(userData.length == 0){ // 내가 찾는 user_id 가 없으면
        return -1;
    }
    else{
        return userData;
    }
}

async function postIngredients(userId, ingredients){
    var cnt=0;
    console.log(ingredients);
    for(var i=0; i<ingredients.length; i++){
        const data = await userDao.insertIngredientsByUser(userId, ingredients[i]);
        console.log(data);
        cnt++;
    }
    return cnt;
}

module.exports = {
    getUser,
    postIngredients
}