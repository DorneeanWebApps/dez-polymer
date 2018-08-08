var config = require('../config.json')
var express = require('express');
var router = express.Router();
var superuserService = require('../services/superuser.service.js');

router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/',getAll);
router.get('current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

  function authenticate(req, res){
    superuserService.authenticate(req.body.username, req.body.password)
    .then(function(superuser){
      if(superuser){
        res.send(superuser);
      }else{
        res.status(401).send('Numele utilizatorului sau parola sunt incorecte')
      }
    })
    .catch(function(err){
      res.status(400).set(err);
    });
  }


  function register(req, res) {
      superuserService.create(req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function getAll(req, res) {
      superuserService.getAll()
          .then(function (users) {
              res.send(users);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function getCurrent(req, res) {
      superuserService.getById(req.user.sub)
          .then(function (user) {
              if (user) {
                  res.send(user);
              } else {
                  res.sendStatus(404);
              }
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function update(req, res) {
      superuserService.update(req.params._id, req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function _delete(req, res) {
      superuserService.delete(req.params._id)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }
