var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt =require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.appUsersConnection, {native_parser: true});
db.bind('appusers');

var service = {};

service.authenticate = authenticate;
service.checkuniquename = checkuniquename;
service.checkuniquemail = checkuniquemail;
service.getAll = getAll;
service.getById = getById;
service.getByOrganizer = getByOrganizer;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
  var deferred = Q.defer();
  db.appusers.findOne({ username: username }, function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (user && bcrypt.compareSync(password, user.hash)) {
          deferred.resolve({
              _id: user._id,
              username: user.username,
              firstname: user.firstname,
              lastname: user.lastname,
              telefon: user.telefon,
              role: user.role,
              vendorid: user.vendorid,
              organizerid: user.organizerid,
              email: user.email,
              token: jwt.sign({ sub: user._id }, config.secret)
          });
      } else {
          deferred.resolve();
      }
  });
  return deferred.promise;
}

function checkuniquename(username){
  var deferred = Q.defer();
  db.appusers.findOne({ username: username }, function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (user) {
          deferred.resolve({
              username: user.username
          });
      } else {
          deferred.resolve();
      }
  });
  return deferred.promise;
}

function checkuniquemail(email){
  var deferred = Q.defer();
  db.appusers.findOne({ email: email }, function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (user) {
          deferred.resolve({
              email: user.email
          });
      } else {
          deferred.resolve();
      }
  });
  return deferred.promise;
}

  function getAll(){
    var deferred = Q.defer();

    db.appusers.find().toArray(function(err, users){
      if(err) deferred.reject(err.name + ":" + err.message);
      users = _.map(users, function(user){
        return _.omit(user, 'hash');
      });
      deferred.resolve(users);
    });
    return deferred.promise;
  }

  function getById(_id){
    var deferred =Q.defer();

    db.appusers.findById(_id, function(err, user){
      if(err) deferred.reject(err.name + ":" + err.message);
      if(user){
        deferred.resolve(_.omit(user,'hash'));
      }else{
        deferred.resolve();
      }
    });
    return deferred.promise;
  }

  function getByOrganizer(_id){
    var deferred =Q.defer();
    db.appusers.find({organizerid : _id}).toArray(function(err, users){
      if(err) deferred.reject(err.name + ":" + err.message);
      users = _.map(users, function(user){
        return _.omit(user, 'hash');
      });
      deferred.resolve(users);
    });
    return deferred.promise;
  }

  function create(userParam){
    var deferred =Q.defer();

    db.appusers.findOne(
      {username: userParam.username},
      function(err, user){
        if(err) deferred.reject(err.name + ":" + err.message);
        if(user){
          deferred.reject('Numele utilizator "' + userParam.username + '" este deja folosit')
        }else{
          createUser();
        }
      });

    function createUser(){
      var user = _.omit(userParam, 'password');
      user.hash = bcrypt.hashSync(userParam.password, 10);
      db.appusers.insert(
        user,
        function(err, doc){
          if(err) deferred.reject(err.name + ":" + err.message);
          deferred.resolve(doc.ops[0]);
        });
    }

    return deferred.promise;
  }

  function update(_id, userParam){
    var deferred = Q.defer();

    db.appusers.findById(_id, function(err, user){
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (user.username !== userParam.username){
        db.appusers.findOne(
          {username: userParam.username},
          function(err, user){
            if (err) deferred.reject(err.name + ': ' + err.message);
            if(user){
              deferred.reject('Numele utilizator "' + userParam.username + '" este deja folosit')
            }else{
              updateUser();
            }
          });
      }else{
        updateUser();
      }
    });

    function updateUser(){
      var set = {
        firstname: userParam.firstname,
        lastname: userParam.lastname,
        username: userParam.username,
        email: userParam.email,
        role: userParam.role,
        telefon: userParam.telefon,
        vendorid: userParam.vendorid,
        organizerid: userParam.organizerid
      };
      if(userParam.password){
        set.hash = bcrypt.hashSync(userParam.password, 10);
      }
      db.appusers.update(
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

    db.appusers.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
  }
