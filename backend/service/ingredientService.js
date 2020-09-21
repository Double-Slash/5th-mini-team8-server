const ingredientDao = require('../dao/ingredientDao');

async function postIngredientIfNotExist(ingredients){
    // ingredients 리스트에서 없는 것만 DB에 넣어줌
    for(var i=0; i<ingredients.length; i++){
        const ingredientData = await ingredientDao.selectIngredient(ingredients[i]);
        if(ingredientData.length == 0){
            const ingredient = await ingredientDao.insertIngredient(ingredients[i]);
            console.log(ingredient);
        }
    }
}

module.exports = {
    postIngredientIfNotExist
}