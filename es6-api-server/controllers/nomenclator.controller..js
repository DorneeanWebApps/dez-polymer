import moongose from 'mongoose';
import { Nomenclator, PartsNomenclator, VehiclesNomenclator } from '../models/nomenclator';
import { buildQuery, getFieldFromObject } from '../lib/utils.js'

const NomenclatorController = {};


NomenclatorController.getAll = async(req, res) => {

    try {
        await Nomenclator.find().exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(data);
        });
    } catch (err) {
        res.send(err);
    }

}

NomenclatorController.getById = async(req, res) => {

    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        Nomenclator.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ item });
        });
    } catch (err) {
        res.send(err);
    }
}

NomenclatorController.getAllParts = async(req, res) => {

    try {
        await PartsNomenclator.find({ type: "part" }).exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(data);
        });
    } catch (err) {
        res.send(err);
    }
}

NomenclatorController.getPartById = async(req, res) => {

    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await PartsNomenclator.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ item });
        });
    } catch (err) {
        res.send(err);
    }
}

NomenclatorController.getAllVehicles = async(req, res) => {

    try {
        await VehiclesNomenclator.find({ type: "vehicle" }).exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(data);
        });
    } catch (err) {
        res.send(err);
    }
}

NomenclatorController.getVehicleById = async(req, res) => {

    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await VehiclesNomenclator.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ item });
        });
    } catch (err) {
        res.send(err);
    }
}

NomenclatorController.addItem = async(req, res) => {

    try {
        const newItem = new Nomenclator(req.body.nomenclator);
        newItem.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ nomenclator: saved });
        });
    } catch (err) {
        res.send(err);
    }
}

NomenclatorController.updateItem = async(req, res) => {

    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await Nomenclator.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            } else {
                Object.keys(item).map(key => {
                    item[key] = req.body.nomenclator[key] || item[key]
                })

                item.save((err, saved) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ nomenclator: saved });
                });
            }
        });
    } catch (err) {
        res.send(err);
    }
}

NomenclatorController.getPartsNames = async(req, res) => {
    try {
        let qobj = req.body.qobj;
        let exceptKeysArray = ['vehcat', 'vehmade', 'vehmodel']
        let query = buildQuery(qobj, exceptKeysArray);
        await Nomenclator.find(query)
            .skip(0)
            .limit(7)
            .exec((err, items) => {
                if (err) {
                    res.status(500).send(err);
                }
                let namesarray = items.map(item => getFieldFromObject(item, "partname"))
                res.json({ names: namesarray });
            });
    } catch (err) {
        res.send(err);
    }
}

NomenclatorController.deleteItem = async(req, res) => {
    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await Nomenclator.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            }

            item.remove(() => {
                res.status(200).end();
            });
        });
    } catch (err) {
        res.send(err);
    }
}

export default NomenclatorController;