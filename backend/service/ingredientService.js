const ingredientDao = require('../dao/ingredientDao');

async function postIngredientIfNotExist(ingredients){
    // ingredients 리스트에서 없는 것만 DB에 넣어줌
    for(var i=0; i<ingredients.length; i++){
        // 재료가 있는지 찾아본다.
        const ingredientData = await ingredientDao.selectIngredient(ingredients[i]);

        if(ingredientData.length == 0){ // 없으면
            const ingredient = await ingredientDao.insertIngredient(ingredients[i]); // 디비에 넣는다
            console.log(ingredient);
        }
    }
}

module.exports = {
    postIngredientIfNotExist
}