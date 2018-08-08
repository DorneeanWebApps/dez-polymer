import express from 'express';
import NomenclatorController from '../controllers/nomenclator.controller.';
const router = express.Router();

router.get('/nomenclator', (req, res) => {
    NomenclatorController.getAll(req, res);
});

router.get('/nomenclator/allparts', (req, res) => {
    NomenclatorController.getAllParts(req, res);
});

router.get('/nomenclator/allvehicles', (req, res) => {
    NomenclatorController.getAllVehicles(req, res);
});

router.get('/nomenclator/:_id', (req, res) => {
    NomenclatorController.getById(req, res);
});

router.get('/nomenclator/getpart/:_id', (req, res) => {
    NomenclatorController.getPartById(req, res);
});

router.get('/nomenclator/getvehicle/:_id', (req, res) => {
    NomenclatorController.getVehicleById(req, res);
});

router.post('/nomenclator/getpartsnames', (req, res) => {
    NomenclatorController.getPartsNames(req, res);
})

router.post('/nomenclator', (req, res) => {
    NomenclatorController.addItem(req, res);
});

router.put('/nomenclator/:_id', (req, res) => {
    NomenclatorController.updateItem(req, res);
});

router.delete('/nomenclator/:_id', (req, res) => {
    NomenclatorController.deleteItem(req, res);
});

export default router;