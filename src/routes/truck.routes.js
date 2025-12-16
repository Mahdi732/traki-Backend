import express from 'express';
import TruckController from '../controllers/TruckController.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import RolesMiddleware from '../middlewares/roles.middleware.js';

const router = express.Router();
const controller = TruckController;

router.use(AuthMiddleware.authenticate);
router.use(RolesMiddleware.authorize('ADMIN'));

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
