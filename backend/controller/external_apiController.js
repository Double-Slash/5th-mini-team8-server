const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');

const ex_api_lib = require('../library/external_api');

async function api_to_db(req, res){
    try{
        await ex_api_lib.getApi("http://openapi.foodsafetykorea.go.kr/api/769c3e791aa24789b0ef/COOKRCP01/json/1/2");
        response(res, returnCode.OK, 'api로부터 디비 추가 성공');
    } catch(error){
        console.log(error.message);
        errResponse(res, returnCode.INTERNAL_SERVER_ERROR, '서버 오류');
    }
}

module.exports = {
    api_to_db
}