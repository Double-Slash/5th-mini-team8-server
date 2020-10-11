var express = require('express');
var router = express.Router();
var login = require('./loginroutes');
const { response, errResponse } = require('../library/response');
const returnCode = require('../library/returnCode');

/* GET home page. */
router.get('/', function(req, res, next) {
  response(res, returnCode.OK, 'home page' );
});

router.use('/ref', require('./ref'));

router.post('/register',login.register);
router.post('/login',login.login)

// hidden url : 공공데이터 api로 부터 로컬 db로 데이터 저장하는 url 
// 최초 한번만 호출해주면됨.
router.use('/external_api', require('./external_api'));

module.exports = router;
