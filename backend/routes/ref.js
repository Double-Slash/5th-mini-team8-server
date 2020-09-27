var express = require('express');
var router = express.Router();

const refController = require('../controller/refController');

router.get('/', refController.getref);
router.post('/addIn', refController.postIngredient);
router.get('/recipelist', refController.getRecipeList);

module.exports = router;