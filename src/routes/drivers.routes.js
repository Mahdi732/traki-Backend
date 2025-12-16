import express from 'express';
import DriversController from '../controllers/DriversController.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import RolesMiddleware from '../middlewares/roles.middleware.js';

const router = express.Router();
const controller = DriversController;

router.use(AuthMiddleware.authenticate);
router.use(RolesMiddleware.authorize('ADMIN'));

router.get('/', controller.list);
router.get('/:id', controller.getById);

export default router;
