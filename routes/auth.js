const { Router } = require('express');

const authController = require('../controllers/auth');

const router = Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.logout);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

module.exports = router;
