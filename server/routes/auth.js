const router = require('express').Router();
const authController = require('../controllers/authController');

router
    .route('/register')
    .post(authController.register)
router
    .route('/login')
    .post(authController.login)
router
    .route('/user')
    .get(authController.user)

module.exports = router;