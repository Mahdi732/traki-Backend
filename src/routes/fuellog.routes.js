import express from 'express';
import FuelLogController from '../controllers/FuelLogController.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import RolesMiddleware from '../middlewares/roles.middleware.js';

const router = express.Router();
const controller = FuelLogController;

router.use(AuthMiddleware.authenticate);

// Drivers and Admins can create and list their logs; Admin can list all via role check in frontend or query
router.post('/', controller.create);
router.get('/', RolesMiddleware.authorize('ADMIN'), controller.list);
router.get('/:id', controller.getById);
router.delete('/:id', RolesMiddleware.authorize('ADMIN'), controller.remove);

export default router;
