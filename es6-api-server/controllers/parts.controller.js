import moongose from 'mongoose';
import { Part } from '../models/part';
import { buildQuery } from '../lib/utils.js'

const PartsController = {};


PartsController.getAll = async(req, res) => {

    try {
        await Part.find().exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json(data);
        });
    } catch (err) {
        res.send(err);
    }

}

PartsController.getById = async(req, res) => {

    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        Part.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ item });
        });
    } catch (err) {
        res.send(err);
    }
}



PartsController.addItem = async(req, res) => {

    try {
        const newItem = new Part(req.body.part);
        newItem.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ part: saved });
        });
    } catch (err) {
        res.send(err);
    }
}

PartsController.updateItem = async(req, res) => {

    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await Part.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            } else {
                Object.keys(item).map(key => {
                    item[key] = req.body.part[key] || item[key]
                })

                item.save((err, saved) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ part: saved });
                });
            }
        });
    } catch (err) {
        res.send(err);
    }
}


/*De adaugat la getByInterogation paginatie, MIN, MAX */


PartsController.getByInterogation = async(req, res) => {
    try {
        let qobj = req.body.qobj;
        let query = buildQuery(qobj);
        await Part.find(query)
            .skip(0)
            .limit(7)
            .exec((err, items) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ parts: items });
            });
    } catch (err) {
        res.send(err);
    }
}

PartsController.deleteItem = async(req, res) => {
    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await Part.findOne({ _id: objectId }).exec((err, item) => {
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

export default PartsController;