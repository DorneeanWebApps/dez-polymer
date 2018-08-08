var config = require('../config.json')
var express = require('express');
var router = express.Router();
var partsService = require('../services/parts.service.js');

router.get('/',getAll);
router.post('/getByQuery', getByQuery);
router.get('/lastpartno', getLastPartNo);
router.get('/:_id', get);
router.post('/create', create);
router.put('/:_id', update);
router.delete('/:_id', _delete);


module.exports = router;

  function get(req, res){
    partsService.get(req.params._id)
    .then(function(part){
      if(part){
        res.send(part);
      }else{
        res.status(401).send('Nu exista produse')
      }
    })
    .catch(function(err){
      res.status(400).set(err);
    });
  }

  function getAll(req, res) {
      partsService.getAll()
          .then(function (parts) {
              res.send(parts);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function getByQuery(req, res){
       partsService.getByQuery(req.body)
       .then(function (parts){
            res.send(parts);
       })
       .catch(function (err){
            res.status(400).send(err);
       })
 }

 function getLastPartNo(req, res){
      partsService.getLastPartNo()
      .then(function(partno){
           res.send(partno);
      })
      .catch(function(err){
           res.status(400).sendStatus(err);
      })
}

  function create(req, res) {
     partsService.create(req.body)
          .then(function (data) {
              res.send(data);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function update(req, res) {
      partsService.update(req.params._id, req.body)
          .then(function (data) {
              res.send(data);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function _delete(req, res) {
      partsService.delete(req.params._id)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }
