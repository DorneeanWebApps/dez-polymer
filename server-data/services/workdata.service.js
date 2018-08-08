var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt =require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.workDataConnection, {native_parser: true});
db.bind('workdata');

var service = {};

service.getAll =getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


  function getAll(){
    var deferred = Q.defer();
    db.workdata.find().toArray(function(err, workelements){
        if(err) deferred.reject(err.name + ":" + err.message);
        deferred.resolve(workelements);
    });
    return deferred.promise;
  }

  function getById(_id){
    var deferred =Q.defer();
    db.workdata.findById(_id, function(err, workelement){
      if(err) deferred.reject(err.name + ":" + err.message);
      if(workelement){
        deferred.resolve(workelement);
      }else{
        deferred.resolve();
      }
    });
    return deferred.promise;
  }

  function create(workelementParam){
    var deferred =Q.defer();

    db.workdata.find().toArray(
      function(err, workelements){
        if(err) deferred.reject(err.name + ":" + err.message);
        if(workelements.length>0){
          deferred.reject('workelementul a fost deja generat')
        }else{
          createworkelement();
        }
      });

    function createworkelement(){
      db.workdata.insert(
        workelementParam,
        function(err, doc){
          if(err) deferred.reject(err.name + ":" + err.message);
          deferred.resolve();
        });
    }

    return deferred.promise;
  }

  function update(_id, workelementParam){
    var deferred = Q.defer();

    db.workdata.findById(_id, function(err, workelement){
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (workelement.denumire !== workelementParam.denumire){
        db.workdata.findOne(
          {denumire: workelementParam.denumire},
          function(err, workelement){
            if (err) deferred.reject(err.name + ': ' + err.message);
            if(workelement){
              deferred.reject('workelementul a fost deja generata')
            }else{
              updateworkelement();
            }
          });
      }else{
        updateworkelement();
      }
    });

    function updateworkelement(){
      var set = {
        abo1: workelementParam.abo1,
        abo6: workelementParam.abo6,
        abo12: workelementParam.abo12,
        tva: workelementParam.tva,
        proforme: workelementParam.proforme,
        facturi: workelementParam.facturi,
        chitante: workelementParam.chitante,
      };

      db.workdata.update(
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

    db.workdata.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
  }
