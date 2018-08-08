var config = require('../config.json')
var express = require('express');
var router = express.Router();
var appUserService = require('../services/appuser.service.js');

router.post('/authenticate', authenticate);
router.post('/checkuniquename', checkuniquename);
router.post('/checkuniquemail', checkuniquemail);
router.post('/register', register);
router.get('/',getAll);
router.get('/:_id', getCurrent);
router.get('/getByOrganizer/:_id', getByOrganizer);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

  function authenticate(req, res){
    appUserService.authenticate(req.body.username, req.body.password)
    .then(function(appuser){
      if(appuser){
        res.send(appuser);
      }else{
        res.status(401).send('Numele utilizatorului sau parola sunt incorecte')
      }
    })
    .catch(function(err){
      res.status(400).set(err);
    });
  }

  function checkuniquename(req, res){
    appUserService.checkuniquename(req.body.username)
    .then(function(appuser){
      if(appuser){
        res.send({exists:true});
      }else{
        res.send({exists:false});
      }
    })
    .catch(function(err){
      res.status(400).set(err);
    });
  }

  function checkuniquemail(req, res){
    appUserService.checkuniquemail(req.body.email)
    .then(function(appuser){
      if(appuser){
        res.send({exists:true});
      }else{
        res.send({exists:false});
      }
    })
    .catch(function(err){
      res.status(400).set(err);
    });
  }

  function register(req, res) {
      appUserService.create(req.body)
          .then(function (user) {
              res.json(user);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function getAll(req, res) {
      appUserService.getAll()
          .then(function (users) {
              res.send(users);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function getCurrent(req, res) {

      appUserService.getById(req.params._id)
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

  function getByOrganizer(req, res) {

      appUserService.getByOrganizer(req.params._id)
          .then(function (users) {
              if (users) {
                  res.send(users);
              } else {
                  res.sendStatus(404);
              }
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }


  function update(req, res) {
      appUserService.update(req.params._id, req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function _delete(req, res) {
      appUserService.delete(req.params._id)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }
