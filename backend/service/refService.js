const refDao = require('../dao/refDao');

async function getUserIngre(userId){
    const ingreData = await refDao.selectIngredientsByUser(userId);
    console.log(ingreData);
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