const request = require("request");
const ingredientService = require('../service/ingredientService');
const recipeService = require('../service/recipeService');

function p(url){
    return new Promise((resolve, reject) => {
        request(url, function(err, res, body){
            resolve(body);
        })
    })
}

// api로부터 얻은 레시피 데이터 하나를
// Ingredients, Recipe, Ingredients_for_Food 테이블에 넣는 함수
async function getApi(url){

    var myobj = new Object();
    var original_ingredients = [];
    var real_ingredients = [];
    var splited_ingredients = []; 
    var plain_ingredients = []; // 이게 진짜 객체에 담겨서 나갈 배열
    var metering = [];
    var recipe = '';

    // api요청해서 자료 받아오기
    const body = await p(url);
    //console.log(body);

    const obj = JSON.parse(body);

    //console.log(obj.COOKRCP01.row[1].RCP_NM);
    myobj.id = obj.COOKRCP01.row[0].RCP_NM; // 객체에 넣기

    myobj.imgUrl_big = obj.COOKRCP01.row[0].ATT_FILE_NO_MK; //큰이미지
    myobj.imgUrl_small = obj.COOKRCP01.row[0].ATT_FILE_NO_MAIN; //작은 이미지

    myobj.calorie = obj.COOKRCP01.row[0].INFO_ENG;

    // '\n' 를 기준으로 자름
    original_ingredients = obj.COOKRCP01.row[0].RCP_PARTS_DTLS.split('\n');
    // 채소준비등 실제 재료가 아닌 소제목? 들은 빼고 ㄹㅇ 재료만 배열에 담음.
    original_ingredients.forEach(element => {
        if (original_ingredients.indexOf(element) % 2 != 0) {
            real_ingredients.push(element);
        }
    });
    // 재료들로 다 잘라서 배열로 만듬.
    real_ingredients.forEach(element => {
        const m_arr = element.split(',');
        m_arr.forEach(ele => {
            splited_ingredients.push(ele.trim());
        })
    });
    //myobj.ingredients = splited_ingredients;

    splited_ingredients.forEach(ele => {
        plain_ingredients.push(ele.split(' ').slice(0,-1) );
        metering.push(ele.split(' ')[ele.split(' ').length-1]);
    })
    //console.log(plain_ingredients);

    myobj.plain_ingredients = plain_ingredients;
    myobj.metering = metering;

    // Ingredients 테이블에 재료를 다 넣기.
    const addin = await ingredientService.insertIngredient(plain_ingredients);
    //console.log(splited_ingredients);

    recipe += obj.COOKRCP01.row[0].MANUAL01
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL02
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL03
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL04
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL05
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL06
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL07
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL08
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL09
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL10
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL11
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL12
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL13
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL14
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL15
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL16
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL17
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL18
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL19
    recipe += '\n'
    recipe += obj.COOKRCP01.row[0].MANUAL20
    recipe += '\n'

    myobj.recipe = recipe;

    //console.log(myobj);

    // Recipe 테이블에 넣기.
    const insertedRecipe = recipeService.insertRecipe(myobj);
    //console.log(insertedRecipe); 

    const insertedCnt = await recipeService.insertRecipeforFood(myobj);
    //console.log(insertedCnt);
}

//getApi();

module.exports = {
    getApi
}