import express from 'express';
import AppElementsController from '../controllers/appelements.controller.js';
const router = express.Router();

router.get('/appelements', (req, res) => {
    AppElementsController.getFirst(req, res);
});

router.post('/appelements', (req, res) => {
    AppElementsController.addItem(req, res);
});

router.put('/appelements/:_id', (req, res) => {
    AppElementsController.updateItem(req, res);
});

router.delete('/appelements/:_id', (req, res) => {
    AppElementsController.deleteItem(req, res);
});

export default router;