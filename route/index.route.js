var express= require('express');
var router= express.Router();

var controller= require('../controller/view.controller');

router.get('/', controller.view);

module.exports = router;