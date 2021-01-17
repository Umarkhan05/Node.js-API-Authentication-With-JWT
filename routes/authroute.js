const router = require('express').Router();

const verifyTokenController = require('../controller/verifyToken');

const user_controller = require('../controller/user.controller');

const verifyToken = verifyTokenController.auth;



router.post('/signup', user_controller.user_signup);
router.post('/login', user_controller.user_login);



//Testing verify token on routes to make it private
router.get('/secret',verifyToken, user_controller.secretfiles);




module.exports = router;