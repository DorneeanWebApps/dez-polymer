var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var moment = require('moment');
var db = mongo.db(config.busDezDataConnection, { native_parser: true });
db.bind('parts');

var service = {};

service.get = get;
service.getAll = getAll;
service.getByQuery = getByQuery;
service.getLastPartNo = getLastPartNo;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function get(_id) {
    var deferred = Q.defer();
    db.parts.findOne({ _id: mongo.helper.toObjectID(_id) }, function(err, part) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (part) {
            deferred.resolve(part);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function getAll() {

    var deferred = Q.defer();
    db.parts.find().toArray(function(err, parts) {
        if (err) deferred.reject(err.name + ":" + err.message);
        deferred.resolve(parts);
    });
    return deferred.promise;

}

function getByQuery(thequery) {
    var deferred = Q.defer();
    var data = {};
    var query = {};
    for (sendquery in thequery.query) {
        var thissendquery = thequery.query[sendquery];
        if (thissendquery.value) {
            if (thissendquery.fieldname == "vehno") {
                query[thissendquery.fieldname] = parseInt(thissendquery.value);
            } else {
                query[thissendquery.fieldname] = { '$regex': '.*' + thissendquery.value + '.*', '$options': 'i' };
            }
        } else {
            query[thissendquery.fieldname] = null;
            delete query[thissendquery.fieldname];
        }
    }

    if (query.partname) delete query.partname;


    db.parts.count(function(err, count) {
        data.partsno = count;
    })
    db.parts.find(query)
        .sort(thequery.sort)
        .skip(thequery.pagination.skip)
        .limit(thequery.pagination.limit)
        .toArray(function(err, parts) {
            if (err) deferred.reject(err.name + ":" + err.message);

            data.parts = parts;
            deferred.resolve(data);
        });
    return deferred.promise;

}

function getLastPartNo() {
    var deferred = Q.defer();
    db.parts.findOne({}, {}, { sort: { 'created_at': -1 } }, function(err, part) {
        if (err) deferred.reject(err.name + ":" + err.message);
        if (part !== null) {
            deferred.resolve({ partno: part.partno });
        } else {
            deferred.resolve({ partno: null });
        }
    });
    return deferred.promise;
}


function create(partsParam) {
    var deferred = Q.defer();

    partsParam.created_at = moment().format();
    partsParam.updated_at = partsParam.created_at;
    db.parts.insert(
        partsParam,
        function(err, part) {
            if (err) deferred.reject(err.name + ":" + err.message);

            deferred.resolve(part.ops[0]);
        });

    return deferred.promise;
}

function update(_id, elemParam) {
    var deferred = Q.defer();

    db.parts.findById(_id, function(err, parts) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        updateParts();

    });

    function updateParts() {
        var set = {
            categorie: elemParam.categorie,
            subcategorie: elemParam.subcategorie,
            denumire: elemParam.denumire,
            cod: elemParam.cod,
            descriere: elemParam.descriere,
            vehcat: elemParam.vehcat,
            marca: elemParam.marca,
            model: elemParam.model,
            tip: elemParam.tip,
            fabricatie: elemParam.fabricatie,
            veh_id: elemParam.veh_id,
            partno: elemParam.partno,
            pret: elemParam.pret,
            pictures: elemParam.pictures,
            valid: elemParam.valid,
            created_at: elemParam.created_at,
            updated_at: moment().format()
        };
        db.parts.update({ _id: mongo.helper.toObjectID(_id) }, { $set: set },
            function(err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve(doc);
            });
    }
    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.parts.remove({ _id: mongo.helper.toObjectID(_id) },
        function(err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}