var express = require('express');
var router = express.Router();

const refController = require('../controller/refController');

router.get('/', refController.getref);
router.post('/searchIn', refController.searchIngredients);
router.post('/addIn', refController.postIngredient);
router.post('/deleteIn', refController.deleteIngredient);
router.get('/recipelist', refController.getRecipeList);

router.get('/recipeList/recipe', refController.getRecipeInfo);

module.exports = router;