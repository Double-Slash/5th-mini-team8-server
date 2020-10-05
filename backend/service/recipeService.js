const e = require('express');
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

async function getRecipeInfo(recipeName){
    const recipeData = await recipeDao.selectRecipeByRecipeName(recipeName);
    console.log(recipeData[0].recipe_name);
    if( recipeData[0].recipe_name == null ){
        return -1;
    }
    else{
        return recipeData;
    }
    
}

module.exports = {
    insertRecipe,
    insertRecipeforFood,
    getRecipeInfo
}