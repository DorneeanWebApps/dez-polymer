var config = require('../config.json')
var express = require('express');
var router = express.Router();
var vehiclesService = require('../services/vehicles.service.js');

router.get('/',getAll);
router.post('/getByQuery', getByQuery);
router.get('/lastvehno', getLastVehNo);
router.get('/:_id', get);
router.post('/create', create);
router.put('/:_id', update);
router.delete('/:_id', _delete);


module.exports = router;

  function get(req, res){
    vehiclesService.get(req.params._id)
    .then(function(vehicle){
      if(vehicle){
        res.send(vehicle);
      }else{
        res.status(401).send('Nu exista produse')
      }
    })
    .catch(function(err){
      res.status(400).set(err);
    });
  }

  function getAll(req, res) {
      vehiclesService.getAll()
          .then(function (vehicles) {
              res.send(vehicles);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function getByQuery(req, res){
       vehiclesService.getByQuery(req.body)
       .then(function (vehicles){
            res.send(vehicles);
       })
       .catch(function (err){
            res.status(400).send(err);
       })
 }

 function getLastVehNo(req, res){
      vehiclesService.getLastVehNo()
      .then(function(vehno){
           res.send(vehno);
      })
      .catch(function(err){
           res.status(400).sendStatus(err);
      })
}

  function create(req, res) {
     vehiclesService.create(req.body)
          .then(function (data) {
              res.send(data);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function update(req, res) {
      vehiclesService.update(req.params._id, req.body)
          .then(function (data) {
              res.send(data);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function _delete(req, res) {
      vehiclesService.delete(req.params._id)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }
