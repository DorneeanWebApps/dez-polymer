import express from 'express';
import VehiclesController from '../controllers/vehicles.controller';
const router = express.Router();

router.get('/vehicles', (req, res) => {
    VehiclesController.getAll(req, res);
});

router.get('/vehicles/:_id', (req, res) => {
    VehiclesController.getById(req, res);
});

router.post('/vehicles/getbyinterogation', (req, res) => {
    VehiclesController.getByInterogation(req, res);
})

router.post('/vehicles', (req, res) => {
    VehiclesController.addItem(req, res);
});

router.put('/vehicles/:_id', (req, res) => {
    VehiclesController.updateItem(req, res);
});

router.delete('/vehicles/:_id', (req, res) => {
    VehiclesController.deleteItem(req, res);
});

export default router;