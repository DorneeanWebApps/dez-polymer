import moongose from 'mongoose';
import { AppElement } from '../models/appelement';

const AppElementsController = {};


AppElementsController.getFirst = async(req, res) => {

    try {
        await AppElement.find().exec((err, data) => {
            if (err) {
                res.status(500).send(err);
            }

            res.json(data);
        });
    } catch (err) {
        res.send(err);
    }


}

AppElementsController.addItem = async(req, res) => {
    try {
        const newItem = new AppElement(req.body.AppElement);
        newItem.save((err, saved) => {
            if (err) {
                res.status(500).send(err);
            }
            res.json({ AppElement: saved });
        });
    } catch (err) {
        res.send(err);
    }
}

AppElementsController.updateItem = async(req, res) => {
    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        await AppElement.findOne({ _id: objectId }).exec((err, item) => {
            if (err) {
                res.status(500).send(err);
            } else {
                Object.keys(item).map(key => {
                    item[key] = req.body.AppElement[key] || item[key]
                })

                item.save((err, saved) => {
                    if (err) {
                        res.status(500).send(err)
                    }
                    res.json({ AppElement: saved });
                });
            }
        });
    } catch (err) {
        res.send(err);
    }
}

AppElementsController.deleteItem = async(req, res) => {
    try {
        let objectId = moongose.Types.ObjectId(req.params._id);
        Post.findOne({ _id: objectId }).exec((err, item) => {
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

export default AppElementsController;