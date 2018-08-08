var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt =require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.busDezComponents, {native_parser: true});
db.bind('leftmenus');

var service = {};

service.getLeftMenu = getLeftMenu;
service.getAllLeftMenus = getAllLeftMenus;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

    function getLeftMenu(menuname) {
      var deferred = Q.defer();
      db.leftmenus.findOne({ menu: menuname }, function (err, leftmenu) {
          if(err) deferred.reject(err.name + ': ' + err.message);

          if (leftmenu) {
              deferred.resolve(leftmenu);
          } else {
              deferred.resolve();
          }
      });
      return deferred.promise;
    }

    function getAllLeftMenus(){
      var deferred = Q.defer();
      db.leftmenus.find().toArray(function(err, leftmenus){
          if(err) deferred.reject(err.name + ":" + err.message);
          leftmenus = _.map(leftmenus, 'menu');
          deferred.resolve(leftmenus);
      });
      return deferred.promise;
    }

    function create(menuParam){
      var deferred = Q.defer();
      db.leftmenus.findOne(
        {menu: menuParam.menu},
        function(err, menu){
          if(err) deferred.reject(err.name + ":" + err.message);
          if(menu){
            deferred.reject('Meniul "' + menuParam.menu + '" este deja folosit')
          }else{
            createMenu();
          }
        });


        function createMenu(){

          db.leftmenus.insert(
            menuParam,
            function(err, doc){
              if(err) deferred.reject(err.name + ":" + err.message);
              deferred.resolve();
            });
        }

        return deferred.promise;
    }

    function update(_id, menuParam){
      var deferred = Q.defer();

      db.leftmenus.findById(_id, function(err, menu){
        if (err) deferred.reject(err.name + ': ' + err.message);
        if (menu.menu !== menuParam.menu){
          db.leftmenus.findOne(
            {menu: menuParam.menu},
            function(err, menu){
              if (err) deferred.reject(err.name + ': ' + err.message);
              if(menu){
                deferred.reject('Numele meniului "' + menuParam.menu + '" este deja folosit')
              }else{
                updateMenu();
              }
            });
        }else{
          updateMenu();
        }
      });

      function updateMenu(){
        var set = {
          menu: menuParam.menu,
          categories: menuParam.categories
        };
        db.leftmenus.update(
          {_id: mongo.helper.toObjectID(_id)},
          {$set:set},
          function(err, doc){
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
          });
      }
      return deferred.promise;
    }

    function _delete(_id) {
      var deferred = Q.defer();

      db.leftmenus.remove(
          { _id: mongo.helper.toObjectID(_id) },
          function (err) {
              if (err) deferred.reject(err.name + ': ' + err.message);

              deferred.resolve();
          });

      return deferred.promise;
    }
