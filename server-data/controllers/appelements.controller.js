var config = require('../config.json')
var express = require('express');
var router = express.Router();
var elementsService = require('../services/appelements.service.js');

router.get('/',getAll);
router.get('/:_id', get);
router.post('/', create);
router.put('/:_id', update);
router.delete('/:_id', _delete);


module.exports = router;

  function get(req, res){
    elementsService.get(req.params._id)
    .then(function(element){
      if(element){
        res.send(element);
      }else{
        res.status(401).send('Nu exista elemente')
      }
    })
    .catch(function(err){
      res.status(400).set(err);
    });
  }

  function getAll(req, res) {
      elementsService.getAll()
          .then(function (elements) {
              res.send(elements);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function create(req, res) {
     elementsService.create(req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function update(req, res) {
      elementsService.update(req.params._id, req.body)
          .then(function (doc) {
              res.send(doc);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function _delete(req, res) {
      elementsService.delete(req.params._id)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }
