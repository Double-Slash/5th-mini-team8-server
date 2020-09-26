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

    // api요청해서 자료 받아오기
    const body = await p(url);
    //console.log(body);

    const bodyData = JSON.parse(body);

    for (var i = 0; i < bodyData.COOKRCP01.row.length; i++) {

        const obj = bodyData.COOKRCP01.row[i]

        let myobj = new Object();
        let original_ingredients = [];
        let real_ingredients = [];
        let splited_ingredients = [];
        let plain_ingredients = []; // 이게 진짜 객체에 담겨서 나갈 배열
        let metering = [];
        let recipe = '';

        //console.log(obj.COOKRCP01.row[1].RCP_NM);
        myobj.id = obj.RCP_NM; // 객체에 넣기

        myobj.imgUrl_big = obj.ATT_FILE_NO_MK; //큰이미지
        myobj.imgUrl_small = obj.ATT_FILE_NO_MAIN; //작은 이미지

        myobj.calorie = obj.INFO_ENG; //칼로리
        myobj.protein = obj.INFO_PRO; // 단백질
        myobj.fat = obj.INFO_FAT; // 지방
        myobj.natrium = obj.INFO_NA; // 나트륨

        //console.log(obj.RCP_PARTS_DTLS);

        // '\n' 를 기준으로 자름
        original_ingredients = obj.RCP_PARTS_DTLS.split('\n');
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
                if(ele.indexOf('.') != -1){
                    const tmp = ele.split('.');
                    tmp.forEach( e => {
                        splited_ingredients.push(e.trim());
                    });
                } else {
                    splited_ingredients.push(ele.trim());
                }
                
            })
        });
        //myobj.ingredients = splited_ingredients;
        console.log(splited_ingredients);

        splited_ingredients.forEach(ele => {
            const arr = ele.split(' ');
            //console.log(arr);
            let my_arr = [];
            let flag = 0;
            for(var i=0; i<arr.length-1; i++){
                if( (arr[i].indexOf('(') != -1 && arr[i].indexOf(')') == -1) &&
                (arr[i+1].indexOf(')') != -1 && arr[i+1].indexOf('(') == -1) ){
                    my_arr.push(arr[i].concat(arr[i+1]));
                    flag = 1;
                } else{
                    my_arr.push(arr[i]);
                }
            }
            //console.log(my_arr);
            if(flag == 0) my_arr.push(arr[i]);

            plain_ingredients.push(my_arr.slice(0, -1));
            metering.push(my_arr[my_arr.length - 1]);
        })
        //console.log(plain_ingredients);

        myobj.plain_ingredients = plain_ingredients;
        myobj.metering = metering;

        // Ingredients 테이블에 재료를 다 넣기.
        const addin = await ingredientService.insertIngredient(plain_ingredients);
        //console.log(splited_ingredients);

        recipe += obj.MANUAL01
        recipe += '\n'
        recipe += obj.MANUAL02
        recipe += '\n'
        recipe += obj.MANUAL03
        recipe += '\n'
        recipe += obj.MANUAL04
        recipe += '\n'
        recipe += obj.MANUAL05
        recipe += '\n'
        recipe += obj.MANUAL06
        recipe += '\n'
        recipe += obj.MANUAL07
        recipe += '\n'
        recipe += obj.MANUAL08
        recipe += '\n'
        recipe += obj.MANUAL09
        recipe += '\n'
        recipe += obj.MANUAL10
        recipe += '\n'
        recipe += obj.MANUAL11
        recipe += '\n'
        recipe += obj.MANUAL12
        recipe += '\n'
        recipe += obj.MANUAL13
        recipe += '\n'
        recipe += obj.MANUAL14
        recipe += '\n'
        recipe += obj.MANUAL15
        recipe += '\n'
        recipe += obj.MANUAL16
        recipe += '\n'
        recipe += obj.MANUAL17
        recipe += '\n'
        recipe += obj.MANUAL18
        recipe += '\n'
        recipe += obj.MANUAL19
        recipe += '\n'
        recipe += obj.MANUAL20
        recipe += '\n'

        myobj.recipe = recipe;

        //console.log(myobj);

        // Recipe 테이블에 넣기.
        const insertedRecipe = await recipeService.insertRecipe(myobj);
        //console.log(insertedRecipe); 

        const insertedCnt = await recipeService.insertRecipeforFood(myobj);
        //console.log(insertedCnt);

    }
}

//getApi();

module.exports = {
    getApi
}