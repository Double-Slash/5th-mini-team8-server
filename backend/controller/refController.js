const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');

const userService = require('../service/userService');
const refService = require('../service/refService');
const ingredientService = require('../service/ingredientService');
const recipeService = require('../service/recipeService');

async function getref(req, res){
    try{
        //const userData = await userService.getUser(req.headers.authorization);
        const userId = req.body.userId;
        //console.log(userId);
        const userData = await userService.getUser(userId);

        // 해당하는 유저가 디비에 없으면
        if(userData == -1){
            console.log("유저없음");
            errResponse(res, returnCode.BAD_REQUEST, '유저없음');
        }
        else{
            console.log(userData);
            const userIngre = await refService.getUserIngre(userId);

            // 해당하는 유저가 재료를 하나도 가지고 있지않다면.
            if(userIngre == -1){
                console.log('재료없음');
                response(res, returnCode.OK, '재료없음', [] );
            }
            else{
                response(res, returnCode.OK, '재료 보기 성공', userIngre);
            }
        }
    } catch(error){
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function postIngredient(req, res){
    try{
        console.log(req.body.userId);
        const userData = await userService.getUser(req.body.userId);

        // 해당하는 유저가 디비에 없으면
        if (userData == -1) {
            console.log("유저없음");
            errResponse(res, returnCode.BAD_REQUEST, '유저없음');
        }
        else{
            console.log(req.body.ingredient);

            // 재료를 ingredients 테이블에 넣는다 (없는 재료라면)
            await ingredientService.postIngredientIfNotExist(req.body.ingredient);
            
            // user_has_ingredients 테이블에 유저가 가진 재료 정보를 저장한다.
            const userIngredient = await userService.postIngredients(req.body.userId, req.body.ingredient);
            
            if (userIngredient.length == 0) {
                console.log('이미 있는 재료들을 추가했습니다');
                errResponse(res, returnCode.BAD_REQUEST, '이미 있는 재료를 추가');
            }
            else {
                response(res, returnCode.OK, '재료 넣기 성공');
            }
        }
    } catch(error){
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
    
}

async function getRecipeList(req, res){
    try{
        console.log(req.body.userId);
        const userId = req.body.userId;
        const userData = await userService.getUser(userId);

        if(userData == -1){
            console.log("유저없음");
            errResponse(res, returnCode.BAD_REQUEST, '유저없음');
        }
        else{
            const recipeList = await recipeService.getRecipeList(userId);
            if(recipeList == -1){
                console.log('지금 가진 재료로 만들 수 있는 레시피 찾을 수 없음');
                errResponse(res, returnCode.BAD_REQUEST, '재료를 더 추가하세요');
            }
            else{
                console.log('레시피 조회 성공');
                response(res, returnCode.OK, '레시피 조회 성공', recipeList);
            }
        }
    } catch(error){
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

module.exports = {
    getref,
    postIngredient,
    getRecipeList
}