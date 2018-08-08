var config = require('../config.json')
var express = require('express');
var router = express.Router();
var companyService = require('../services/dorneeandata.service.js');

router.post('/', create);
router.get('/', getAll)
router.get('current', getCurrent);
router.put('/:_id', update);
router.delete('/:_id', _delete);

module.exports = router;

  function create(req, res) {
      companyService.create(req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function getAll(req, res){
    companyService.getAll()
    .then(function(companies){
      if(companies){
        res.send(companies)
      }else{
        res.status(401).send('Nu au fost gasite nume de meniuri')
      }
    })
  }


  function getCurrent(req, res) {
      companyService.getById(req.company._id)
          .then(function (company) {
              if (company) {
                  res.send(company);
              } else {
                  res.sendStatus(404);
              }
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function update(req, res) {
      companyService.update(req.params._id, req.body)
          .then(function () {
              console.log('succes');
              res.sendStatus(200);
          })
          .catch(function (err) {
              console.log('Eroare');
              res.status(400).send(err);
          });
  }

  function _delete(req, res) {
      companyService.delete(req.params._id)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }
