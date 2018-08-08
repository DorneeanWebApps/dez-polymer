var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt =require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.busDezComponents, {native_parser: true});
db.bind('appelements');

var service = {};

service.getElements = get;
service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

    function get(_id) {
      var deferred = Q.defer();
      db.appelements.findOne({ _id: _id }, function (err, elements) {
          if(err) deferred.reject(err.name + ': ' + err.message);

          if (elements) {
              deferred.resolve(elements);
          } else {
              deferred.resolve();
          }
      });
      return deferred.promise;
    }

    function getAll(){

           var deferred = Q.defer();
           db.appelements.find().toArray(function(err, elements){
               if(err) deferred.reject(err.name + ":" + err.message);
               deferred.resolve(elements);
           });
           return deferred.promise;

    }


    function create(elementsParam){
      var deferred = Q.defer();

          db.appelements.insert(
            elementsParam,
            function(err, doc){
              if(err) deferred.reject(err.name + ":" + err.message);
              deferred.resolve();
            });

        return deferred.promise;
    }

    function update(_id, elemParam){
      var deferred = Q.defer();

      db.appelements.findById(_id, function(err, elements){
        if (err) deferred.reject(err.name + ': ' + err.message);

          updateElements();

      });

      function updateElements(){
        var set = {
             vehicle_categories: elemParam.vehicle_categories,
             parts_categories: elemParam.parts_categories
        };
        db.appelements.update(
          {_id: mongo.helper.toObjectID(_id)},
          {$set:set},
          function(err, doc){
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve(doc);
          });
      }
      return deferred.promise;
    }

    function _delete(_id) {
      var deferred = Q.defer();

      db.appelements.remove(
          { _id: mongo.helper.toObjectID(_id) },
          function (err) {
              if (err) deferred.reject(err.name + ': ' + err.message);

              deferred.resolve();
          });

      return deferred.promise;
    }
