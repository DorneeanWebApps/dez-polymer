var config = require('../config.json')
var express = require('express');
var router = express.Router();
var nomenclatorService = require('../services/nomenclator.service.js');

router.get('/', getAll);
router.post('/getPartNames', getPartNames)
router.post('/getPartByQuery', getPartByQuery);
router.post('/getVehicleByQuery', getVehicleByQuery);
router.post('/queryIfExists', queryIfExists);
router.get('/lastpartno', getLastPartNo);
router.get('/:_id', get);
router.post('/create', create);
router.put('/:_id', update);
router.delete('/:_id', _delete);


module.exports = router;

function get(req, res) {
    nomenclatorService.get(req.params._id)
        .then(function(part) {
            if (part) {
                res.send(part);
            } else {
                res.status(401).send('Nu exista produse')
            }
        })
        .catch(function(err) {
            res.status(400).set(err);
        });
}

function getAll(req, res) {
    nomenclatorService.getAll()
        .then(function(parts) {
            res.send(parts);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getPartByQuery(req, res) {
    nomenclatorService.getPartByQuery(req.body)
        .then(function(items) {
            res.send(items);
        })
        .catch(function(err) {
            res.status(400).send(err);
        })
}

function getPartNames(req, res) {
    nomenclatorService.getPartNames(req.body)
        .then(function(items) {
            res.send(items);
        })
        .catch(function(err) {
            res.status(400).send(err);
        })
}

function getVehicleByQuery(req, res) {
    nomenclatorService.getVehicleByQuery(req.body)
        .then(function(items) {
            res.send(items);
        })
        .catch(function(err) {
            res.status(400).send(err);
        })
}

function queryIfExists(req, res) {
    nomenclatorService.queryIfExists(req.body)
        .then(function(response) {
            res.send(response);
        })
        .catch(function(err) {
            res.status(400).send(err);
        })
}

function getLastPartNo(req, res) {
    nomenclatorService.getLastPartNo()
        .then(function(partno) {
            res.send(partno);
        })
        .catch(function(err) {
            res.status(400).sendStatus(err);
        })
}

function create(req, res) {
    nomenclatorService.create(req.body)
        .then(function(data) {
            res.send(data);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    nomenclatorService.update(req.params._id, req.body)
        .then(function(data) {
            res.send(data);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    nomenclatorService.delete(req.params._id)
        .then(function() {
            res.sendStatus(200);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}