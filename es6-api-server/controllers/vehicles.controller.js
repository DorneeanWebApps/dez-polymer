import moongose from 'mongoose';
import { Vehicle, PartsVehicle, VehiclesVehicle } from '../models/vehicle';
import { buildQuery, getFieldFromObject } from '../lib/utils.js'

const VehiclesController = {};


VehiclesController.getAll = async(req, res) => {

    try {
        await Vehicle.find().exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(data);
        });
    } catch (err) {
        res.send(err);
    }

}

VehiclesController.getById = async(req, res) => {

    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        Vehicle.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ item });
        });
    } catch (err) {
        res.send(err);
    }
}



VehiclesController.addItem = async(req, res) => {

    try {
        const newItem = new Vehicle(req.body.vehicle);
        newItem.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ vehicle: saved });
        });
    } catch (err) {
        res.send(err);
    }
}

VehiclesController.updateItem = async(req, res) => {

    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await Vehicle.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            } else {
                Object.keys(item).map(key => {
                    item[key] = req.body.vehicle[key] || item[key]
                })

                item.save((err, saved) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ vehicle: saved });
                });
            }
        });
    } catch (err) {
        res.send(err);
    }
}


/*De adaugat la getByInterogation paginatie, MIN, MAX */


VehiclesController.getByInterogation = async(req, res) => {
    try {
        let qobj = req.body.qobj;
        let query = buildQuery(qobj);
        await Vehicle.find(query)
            .skip(req.body.qobj.pagination.skip)
            .limit(req.body.qobj.pagination.limit)
            .exec((err, items) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ vehicles: items });
            });
    } catch (err) {
        res.send(err);
    }
}

VehiclesController.deleteItem = async(req, res) => {
    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await Vehicle.findOne({ _id: objectId }).exec((err, item) => {
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

export default VehiclesController;