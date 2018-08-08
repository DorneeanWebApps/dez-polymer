var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt =require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.superUserConnection, {native_parser: true});
db.bind('admins');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password) {
  var deferred = Q.defer();
  db.admins.findOne({ username: username }, function (err, user) {
      if (err) deferred.reject(err.name + ': ' + err.message);

      if (user && bcrypt.compareSync(password, user.hash)) {
          deferred.resolve({
              _id: user._id,
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              role: user.role,
              token: jwt.sign({ sub: user._id }, config.secret)
          });
      } else {
          deferred.resolve();
      }
  });
  return deferred.promise;
}

  function getAll(){
    var deferred = Q.defer();

    db.admins.find().toArray(function(err, users){
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

    db.admins.findById(_id, function(err, user){
      if(err) deferred.reject(err.name + ":" + err.message);
      if(user){
        deferred.resolve(_.omit(user,'hash'));
      }else{
        deferred.resolve();
      }
    });
    return deferred.promise;
  }

  function create(userParam){
    var deferred =Q.defer();

    db.admins.findOne(
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
      db.admins.insert(
        user,
        function(err, doc){
          if(err) deferred.reject(err.name + ":" + err.message);
          deferred.resolve();
        });
    }

    return deferred.promise;
  }

  function update(_id, userParam){
    var deferred = Q.defer();

    db.admins.findById(_id, function(err, user){
      if (err) deferred.reject(err.name + ': ' + err.message);
      if (user.username !== userParam.username){
        db.admins.findOne(
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
        firstName: userParam.firstName,
        lastName: userParam.lastName,
        username: userParam.username,
        role: userParam.role,
      };
      if(userParam.password){
        set.hash = bcrypt.hashSync(userParam.password, 10);
      }
      db.admins.update(
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

    db.admins.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
  }
