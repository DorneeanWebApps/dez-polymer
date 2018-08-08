var config = require('../config.json')
var express = require('express');
var router = express.Router();
var leftMenuService = require('../services/leftmenu.service.js');

router.get('/getleftmenu/:menuname', getLeftMenu);
router.get('/getallleftmenus', getAllLeftMenus);
router.post('/createnewmenu', createNewMenu);
router.put('/:_id', update);
router.delete('/:_id', _delete);


module.exports = router;

  function getLeftMenu(req, res){
    leftMenuService.getLeftMenu(req.params.menuname)
    .then(function(leftmenu){
      if(leftmenu){
        res.send(leftmenu);
      }else{
        res.status(401).send('Numele meniului este incorect')
      }
    })
    .catch(function(err){
      res.status(400).set(err);
    });
  }

  function getAllLeftMenus(req, res){
    leftMenuService.getAllLeftMenus()
    .then(function(menunames){
      if(menunames){
        res.send(menunames)
      }else{
        res.status(401).send('Nu au fost gasite nume de meniuri')
      }
    })
  }

  function createNewMenu(req, res) {
      leftMenuService.create(req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function update(req, res) {
      leftMenuService.update(req.params._id, req.body)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }

  function _delete(req, res) {
      leftMenuService.delete(req.params._id)
          .then(function () {
              res.sendStatus(200);
          })
          .catch(function (err) {
              res.status(400).send(err);
          });
  }
