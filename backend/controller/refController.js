const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');

const refUervice = require('../service/refService.js');

async function getref(req, res){
    try{
        //const userData = await userService.getUser(req.headers.authorization);
        const userId = req.body.userId;
        //console.log(userId);
        const userIngre = await refUervice.getUserIngre(userId);
        if(userIngre == -1){
            console.log('재료없음 or 유저없음');
            errResponse(res, returnCode.BAD_REQUEST, '재료없음 or 유저없음');
        }
        else{
            response(res, returnCode.OK, '재료 성공', userIngre);
        }

    } catch(error){
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

module.exports = {
    getref
}