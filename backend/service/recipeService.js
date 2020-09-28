const refController = require('../controller/refController');
const recipeDao = require('../dao/recipeDao');

async function insertRecipe(recipeData){
    const recipe = recipeData.recipe.split('\n');
    var recipeText = '';
    for(var i=0; i<recipe.length; i++){
        if(recipe[i] == ''){
            break;
        }
        recipeText += recipe[i]
        recipeText += '\n'
    }
    //console.log(recipeText);
    return await recipeDao.insertRecipe(recipeData, recipeText);
}

async function insertRecipeforFood(recipeData){
    const name = recipeData.id;
    const plain_ingredients = recipeData.plain_ingredients;
    const metering = recipeData.metering;
    var ingredients = [];

    // 재료들 이름 짤린거 합치기.
    for(var i=0; i<plain_ingredients.length; i++){
        var ingre = '';
        plain_ingredients[i].forEach(element => {
            ingre += element;
            ingre += ' ';
        });
        if(ingre.trim() == ''){
            continue;
        }
        ingredients.push(ingre.trim());
    }
    //console.log(ingredients);

    var cnt = 0;
    for(i=0; i<ingredients.length; i++){
        //console.log(name);
        //console.log(ingredients[i]);
        //console.log(metering[i]);
        await recipeDao.insertRecipeforFood(name, ingredients[i], metering[i]);
        cnt++;
    }
    return cnt;
}

async function getRecipeList(userId){
    const recipeList =  await recipeDao.selectRecipeListByUser(userId);
    if(recipeList.length == 0){
        return -1;
    }
    else {
        //console.log(typeof(recipeList[0].total))
        let canMake = []; // 유저가 가진 재료로 만들 수 있는 레시피
        let cantMake = []; // 몇개의 재료가 모자른 레시피
        for(let i=0; i<recipeList.length; i++){
            if(recipeList[i].total - recipeList[i].my_count == 0){
                canMake.push(recipeList[i].recipe_name);
            }
            else {
                const deficient_count = recipeList[i].total - recipeList[i].my_count;
                cantMake.push({
                    "recipe_name" : recipeList[i].recipe_name,
                    "deficient_count" : deficient_count // 부족한 재료 수
                });
            }
        }
        
        return recipeList;
    }
}

module.exports = {
    insertRecipe,
    insertRecipeforFood,
    getRecipeList
}