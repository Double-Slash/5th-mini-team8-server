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
    // 조회된 레시피 수
    console.log(recipeList.length);

    if( !recipeList ){ //조회된 결과가 없을 때
        return -1;
    }
    else {
        //let Enough = []; // 유저가 가진 재료로 만들 수 있는 레시피
        let EnoughTable = [];
        let notEnoughTable = [];
        let notEnoughAdditional = []; // 몇개의 재료가 모자른 레시피의 추가 정보를 저장

        for(let i=0; i<recipeList.length; i++){
            if(recipeList[i].total - recipeList[i].my_count == 0){
                //Enough.push(recipeList[i].recipe_name);
                EnoughTable.push(await recipeDao.selectRecipeByRecipeName(recipeList[i].recipe_name));
            }
            else {
                const deficient_count = recipeList[i].total - recipeList[i].my_count;
                const percentage = (recipeList[i].my_count / recipeList[i].total) * 100;
                notEnoughAdditional.push({
                    "recipe_name" : recipeList[i].recipe_name,
                    "deficient_count" : deficient_count, // 부족한 재료 수
                    "percentage" : Math.round(percentage) // 있는 재료의 퍼센트
                });
                notEnoughTable.push(await recipeDao.selectRecipeByRecipeName(recipeList[i].recipe_name));
            }
        }
        const resultList = { "Enough" :  EnoughTable, "notEnough" : notEnoughTable, "notEnoughAdditional" : notEnoughAdditional };
        //console.log(EnoughTable);
        //console.log(notEnoughTable);

        return resultList;
    }
}

module.exports = {
    insertRecipe,
    insertRecipeforFood,
    getRecipeList
}