var express= require('express');
var router= express.Router();

var controller= require('../controller/view.controller');

router.get('/:id', controller.view);

module.exports = router;