var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt =require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var moment = require('moment');
var db = mongo.db(config.busDezDataConnection, {native_parser: true});
db.bind('vehicles');

var service = {};

service.get = get;
service.getAll = getAll;
service.getByQuery = getByQuery;
service.getLastVehNo = getLastVehNo;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

    function get(_id) {
      var deferred = Q.defer();
      db.vehicles.findOne({ _id: mongo.helper.toObjectID(_id) }, function (err, vehicle) {
          if(err) deferred.reject(err.name + ': ' + err.message);

          if (vehicle) {
              deferred.resolve(vehicle);
          } else {
              deferred.resolve();
          }
      });
      return deferred.promise;
    }

    function getAll(){

           var deferred = Q.defer();
           db.vehicles.find().toArray(function(err, vehicles){
               if(err) deferred.reject(err.name + ":" + err.message);
               deferred.resolve(vehicles);
           });
           return deferred.promise;

    }

    function getByQuery(thequery){
         var deferred = Q.defer();
         var data={};
         var query = {};
         console.log(thequery);
         for (sendquery in thequery.query){
              var thissendquery = thequery.query[sendquery];
              if(thissendquery.value){
                   if(thissendquery.fieldname == "vehno"){
                        query[thissendquery.fieldname] = parseInt(thissendquery.value) ;
                   }else{
                        query[thissendquery.fieldname] = {'$regex' : '.*' + thissendquery.value + '.*', '$options':'i'};
                   }
              }else{
                   query[thissendquery.fieldname] = null;
                   delete query[thissendquery.fieldname];
              }
         }


         db.vehicles.count(function(err, count){
              data.prodsno = count;
         })
         db.vehicles.find(query)
         .sort(thequery.sort)
         .max(thequery.max)
         .min(thequery.min)
         .skip(thequery.pagination.skip)
         .limit(thequery.pagination.limit)
         .toArray(function(err, vehicles){
            if(err) deferred.reject(err.name + ":" + err.message);

            data.vehicles = vehicles;
            deferred.resolve(data);
         });
         return deferred.promise;

    }

    function getLastVehNo(){
         var deferred = Q.defer();
         db.vehicles.findOne({}, {}, {sort:{'created_at': -1}},function(err, vehicle){
            if(err) deferred.reject(err.name + ":" + err.message);
            if(vehicle!==null){
                 deferred.resolve({vehno: vehicle.vehno});
            }else{
                 deferred.resolve({vehno: null});
            }
         });
         return deferred.promise;
    }


    function create(vehiclesParam){
      var deferred = Q.defer();

          vehiclesParam.created_at = moment().format();
          vehiclesParam.updated_at = vehiclesParam.created_at;
          db.vehicles.insert(
            vehiclesParam,
            function(err, vehicle){
              if(err) deferred.reject(err.name + ":" + err.message);

              deferred.resolve(vehicle.ops[0]);
            });

        return deferred.promise;
    }

    function update(_id, elemParam){
      var deferred = Q.defer();

      db.vehicles.findById(_id, function(err, vehicles){
        if (err) deferred.reject(err.name + ': ' + err.message);

          updateVehicles();

      });

      function updateVehicles(){
        var set = {
          categorie: elemParam.categorie,
          marca: elemParam.marca,
          model: elemParam.model,
          tip: elemParam.tip,
          vehno: elemParam.vehno,
          fabricatie: elemParam.fabricatie,
          km: elemParam.km,
          descriere: elemParam.descriere,
          pictures: elemParam.pictures,
          partscats: elemParam.partscats,
          valid: elemParam.valid,
          created_at: elemParam.created_at,
          updated_at: moment().format()
        };
        db.vehicles.update(
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

      db.vehicles.remove(
          { _id: mongo.helper.toObjectID(_id) },
          function (err) {
              if (err) deferred.reject(err.name + ': ' + err.message);

              deferred.resolve();
          });

      return deferred.promise;
    }
