var express= require('express');
var router= express.Router();
var multer= require('multer');

var upload = multer({ dest: './public/uploads/' });

var controller= require('../controller/view.controller');

router.get('/:id', controller.view);
router.post('/:id/cover', 
	upload.single('cover'), 
	controller.updateCover);
router.post('/:id/avatar', 
	upload.single('avatar'), 
	controller.updateAvatar);
router.post('/:id/x1', controller.updateX1);
router.post('/:id/x2', controller.updateX2);
router.post('/:id/init', controller.updateInit);
router.post('/:id/profile', controller.updateProfile);


module.exports = router;