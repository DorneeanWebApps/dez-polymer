var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt =require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.dorneeanDataConnection, {native_parser: true});
db.bind('dorneeandata');

var service = {};

service.getAll =getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;


  function getAll(){
    var deferred = Q.defer();
    db.dorneeandata.find().toArray(function(err, companies){
        if(err) deferred.reject(err.name + ":" + err.message);
        deferred.resolve(companies);
    });
    return deferred.promise;
  }

  function getById(_id){
    var deferred =Q.defer();

    db.dorneeandata.findById(_id, function(err, company){
      if(err) deferred.reject(err.name + ":" + err.message);
      if(company){
        deferred.resolve(company);
      }else{
        deferred.resolve();
      }
    });
    return deferred.promise;
  }

  function create(companyParam){
    var deferred =Q.defer();

    db.dorneeandata.find().toArray(
      function(err, companies){
        if(err) deferred.reject(err.name + ":" + err.message);
        if(companies.length>0){
          console.log(companies);
          deferred.reject('Compania a fost deja generata')
        }else{
          createCompany();
        }
      });

    function createCompany(){
      db.dorneeandata.insert(
        companyParam,
        function(err, doc){
          if(err) deferred.reject(err.name + ":" + err.message);
          deferred.resolve();
        });
    }

    return deferred.promise;
  }

  function update(_id, companyParam){
    var deferred = Q.defer();

    db.dorneeandata.findById(_id, function(err, company){
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (company.denumire !== companyParam.denumire){
        db.dorneeandata.findOne(
          {denumire: companyParam.denumire},
          function(err, company){
            if (err) deferred.reject(err.name + ': ' + err.message);
            if(company){
              deferred.reject('Compania a fost deja generata')
            }else{
              updateCompany();
            }
          });
      }else{
        updateCompany();
      }
    });

    function updateCompany(){
      var set = {

        denumire: companyParam.denumire,
        localitate: companyParam.localitate,
        judet: companyParam.judet,
        adresa: companyParam.adresa,
        reprezentant: companyParam.reprezentant,
        email: companyParam.email,
        telefon: companyParam.telefon,
        fax: companyParam.fax,
        cui: companyParam.cui,
        regcom: companyParam.regcom,
        cont: companyParam.cont,
        banca: companyParam.banca,
      };

      db.dorneeandata.update(
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

    db.dorneeandata.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
  }
