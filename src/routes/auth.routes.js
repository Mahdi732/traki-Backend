import express from 'express';
import AuthController from '../controllers/AuthController.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();
const controller = AuthController;

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/logout', AuthMiddleware.authenticate, controller.logout);

export default router;
