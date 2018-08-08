import express from 'express';
import PartsController from '../controllers/parts.controller';
const router = express.Router();

router.get('/parts', (req, res) => {
    PartsController.getAll(req, res);
});

router.get('/parts/:_id', (req, res) => {
    PartsController.getById(req, res);
});

router.post('/parts', (req, res) => {
    PartsController.addItem(req, res);
});

router.put('/parts/:_id', (req, res) => {
    PartsController.updateItem(req, res);
});

router.delete('/parts/:_id', (req, res) => {
    PartsController.deleteItem(req, res);
});

export default router;