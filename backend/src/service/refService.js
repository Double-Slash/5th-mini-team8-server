const refDao = require('../dao/refDao');

async function getUserIngre(userId){
    // 유저 이름으로 검색
    const ingreData = await refDao.selectIngredientsByUser(userId);
    console.log(ingreData);

    // 해당하는 유저가 재료를 가지고 있지 않다면
    if(ingreData.length == 0){
        return -1;
    }
    else{
        return ingreData
    }
}

module.exports = {
    getUserIngre
}