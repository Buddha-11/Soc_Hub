const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/signup', authController.signup_get);
router.get('/geneticx', authController.geneticx_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/login_admin', authController.login_admin_get);
router.get('/signup_admin', authController.signup_admin_get);
router.get('/signup_admin', authController.signup_admin_post);
router.post('/login_admin', authController.login_admin_post);
router.get('/logout', authController.logout_get);

module.exports = router;