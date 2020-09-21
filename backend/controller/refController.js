const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');

const userService = require('../service/userService');
const refService = require('../service/refService');
const ingredientService = require('../service/ingredientService')

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
            const cnt = await userService.postIngredients(req.body.userId, req.body.ingredient);
            
            if (cnt != req.body.ingredient.length) {
                console.log('db error');
                errResponse(res, returnCode.DB_ERROR, 'DB error');
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

module.exports = {
    getref,
    postIngredient
}