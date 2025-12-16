import express from 'express';
import TripController from '../controllers/TripController.js';
import AuthMiddleware from '../middlewares/auth.middleware.js';
import RolesMiddleware from '../middlewares/roles.middleware.js';

const router = express.Router();
const controller = TripController;

router.use(AuthMiddleware.authenticate);

// Admin can create, list all, delete
router.post('/', RolesMiddleware.authorize('ADMIN'), controller.create);
router.get('/', RolesMiddleware.authorize('ADMIN'), controller.list);

// Drivers can get their assigned trips
router.get('/my', controller.myTrips);

router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', RolesMiddleware.authorize('ADMIN'), controller.remove);

// Download PDF stub
router.get('/:id/download', controller.download);

export default router;
