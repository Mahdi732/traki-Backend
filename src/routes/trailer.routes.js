import express from 'express';
import TrailerController from '../controllers/TrailerController.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import RolesMiddleware from '../middlewares/roles.middleware.js';

const router = express.Router();
const controller = TrailerController;

router.use(AuthMiddleware.authenticate);

router.post('/', RolesMiddleware.authorize('ADMIN'), controller.create);
router.get('/', RolesMiddleware.authorize('ADMIN'), controller.list);
router.get('/:id', RolesMiddleware.authorize('ADMIN'), controller.getById);
router.put('/:id', RolesMiddleware.authorize('ADMIN'), controller.update);
router.delete('/:id', RolesMiddleware.authorize('ADMIN'), controller.remove);

export default router;
