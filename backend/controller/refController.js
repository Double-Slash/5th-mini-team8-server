const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');

const userService = require('../service/userService');
const refService = require('../service/refService');
const ingredientService = require('../service/ingredientService');
const recipeService = require('../service/recipeService');

async function getref(req, res){
    try{
        const userData = await userService.getUser(req.headers.authorization);
        //const userId = req.body.userId;
        //console.log(userData);
        //const userData = await userService.getUser(userToken);

        // 해당하는 유저가 디비에 없으면
        if(userData == -1){
            console.log("유저없음");
            errResponse(res, returnCode.BAD_REQUEST, '유저없음');
        }
        else if(userData == -2){
            console.log("invalid token");
            errResponse(res, returnCode.BAD_REQUEST, 'invalid token');
        }
        else{
            console.log(userData);
            const userIngre = await refService.getUserIngre(userData[0].user_id);

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

async function searchIngredients(req, res){
    try{
        const userData = await userService.getUser(req.headers.authorization);

        if(userData == -1){
            console.log("유저없음");
            errResponse(res, returnCode.BAD_REQUEST, '유저없음');
        }
        else if(userData == -2){
            console.log("invalid token");
            errResponse(res, returnCode.BAD_REQUEST, 'invalid token');
        }
        else{
            console.log(req.body.ingredient);
            const ingredientData = await ingredientService.searchIngredients(req.body.ingredient);

            if(ingredientData == -1){
                response(res, returnCode.OK, '재료 없음!');
            }
            else {
                response(res, returnCode.OK, '재료 찾음', ingredientData);
            }
        }
    } catch(error){
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

async function postIngredient(req, res){
    try{
        //console.log(req.headers.authorization);
        const userData = await userService.getUser(req.headers.authorization);
        //console.log(userData)

        // 해당하는 유저가 디비에 없으면
        if (userData == -1) {
            console.log("유저없음");
            errResponse(res, returnCode.BAD_REQUEST, '유저없음');
        }
        else if(userData == -2){
            console.log("invalid token");
            errResponse(res, returnCode.BAD_REQUEST, 'invalid token');
        }
        else{
            console.log(req.body.ingredient);

            // 재료를 ingredients 테이블에 넣는다 (없는 재료라면)
            await ingredientService.postIngredientIfNotExist(req.body.ingredient);
            
            // user_has_ingredients 테이블에 유저가 가진 재료 정보를 저장한다.
            const userIngredient = await userService.postIngredients(userData[0].user_id, req.body.ingredient);
            
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

async function deleteIngredient(req, res){
    try{
        const userData = await userService.getUser(req.headers.authorization);
        //console.log(req.body.userId);
        //const userData = await userService.getUser(req.body.userId);

        // 해당하는 유저가 디비에 없으면
        if (userData == -1) {
            console.log("유저없음");
            errResponse(res, returnCode.BAD_REQUEST, '유저없음');
        }
        else if(userData == -2){
            console.log("invalid token");
            errResponse(res, returnCode.BAD_REQUEST, 'invalid token');
        }
        else{
            //console.log(req.body);
            console.log(req.body.ingredient);
            //console.log(typeof req.body.ingredient);
            
            // user_has_ingredients 테이블에 유저가 가진 재료 정보를 저장한다.
            const userIngredient = await userService.deleteIngredients(userData[0].user_id, req.body.ingredient);
            
            if (userIngredient == -1) {
                console.log('없는 재료를 삭제하려고 함');
                errResponse(res, returnCode.BAD_REQUEST, '없는 재료를 삭제하려고 함');
            }
            else if(userIngredient == 1){
                response(res, returnCode.OK, '재료 삭제 성공');
            }
        }
    } catch(error){
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
    
}

async function getRecipeInfo(req, res){
    try{
        // auth 필요.
        console.log(req.body);
        const recipeName = req.body.recipeName;

        const recipeData = await recipeService.getRecipeInfo(recipeName);
        if(recipeData == -1){
            console.log("레시피 없음");
            errResponse(res, returnCode.BAD_REQUEST, '레시피 없음');
        }
        else{
            response(res, returnCode.OK, '레시피 조회 성공', recipeData);
        }
    } catch(error){
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}
        
async function getRecipeList(req, res){
    try{
        const userData = await userService.getUser(req.headers.authorization);

        if(userData == -1){
            console.log("유저없음");
            errResponse(res, returnCode.BAD_REQUEST, '유저없음');
        }
        else if(userData == -2){
            console.log("invalid token");
            errResponse(res, returnCode.BAD_REQUEST, 'invalid token');
        }
        else{
            const recipeList = await recipeService.getRecipeList(userData[0].user_id);
            //console.log(recipeList.canMake.length)
            if(recipeList.notEnough.length < 1){
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
    searchIngredients,
    postIngredient,
    deleteIngredient,
    getRecipeInfo,
    getRecipeList
}