var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/ref', require('./ref'));

// hidden url : 공공데이터 api로 부터 로컬 db로 데이터 저장하는 url 
// 최초 한번만 호출해주면됨.
router.use('/external_api', require('./external_api'));

module.exports = router;
