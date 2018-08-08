var config = require('../config.json')
var express = require('express');
var router = express.Router();
var workService = require('../services/workdata.service.js');

router.post('/', create);
router.get('/', getAll)
router.get('/:_id', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

  function create(req, res) {
      workService.create(req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function getAll(req, res){
    workService.getAll()
    .then(function(workelements){
      if(workelements){
        res.send(workelements)
      }else{
        res.status(401).send('Nu au fost generat workelement')
      }
    })
  }


  function getCurrent(req, res) {
      workService.getById(req.param)
          .then(function (workelement) {
              if (workelement) {
                  res.send(workelement);
              } else {
                  res.sendStatus(404);
              }
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function update(req, res) {
      workService.update(req.params._id, req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function _delete(req, res) {
      workService.delete(req.params._id)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }
