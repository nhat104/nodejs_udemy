const { Router } = require('express');

const authController = require('../controllers/auth');

const router = Router();

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout', authController.logout);

module.exports = router;
