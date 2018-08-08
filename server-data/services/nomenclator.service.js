var config = require('../config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var moment = require('moment');
var db = mongo.db(config.busDezDataConnection, { native_parser: true });
db.bind('nomenclator');

var service = {};

service.get = get;
service.getAll = getAll;
service.getPartNames = getPartNames;
service.getPartByQuery = getPartByQuery;
service.getVehicleByQuery = getVehicleByQuery;
service.queryIfExists = queryIfExists;
service.getLastPartNo = getLastPartNo;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;



function get(_id) {
    var deferred = Q.defer();
    db.nomenclator.findOne({ _id: mongo.helper.toObjectID(_id) }, function(err, item) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (part) {
            deferred.resolve(item);
        } else {
            deferred.resolve();
        }
    });
    return deferred.promise;
}

function getAll() {

    var deferred = Q.defer();
    db.nomenclator.find().toArray(function(err, items) {
        if (err) deferred.reject(err.name + ":" + err.message);
        deferred.resolve(items);
    });
    return deferred.promise;

}

function getPartByQuery(thequery) {
    var deferred = Q.defer();
    var data = {};
    var query = {};

    for (sendquery in thequery.query) {
        var thissendquery = thequery.query[sendquery];
        if (thissendquery.value) {
            query[thissendquery.fieldname] = { '$regex': '.*' + thissendquery.value + '.*', '$options': 'i' };


        } else {
            query[thissendquery.fieldname] = null;
            delete query[thissendquery.fieldname];
        }
    }

    if (query.denumire) delete query.denumire;

    db.nomenclator.count(function(err, count) {
        data.itemsno = count;
    })
    db.nomenclator.find(query)
        .toArray(function(err, items) {
            if (err) deferred.reject(err.name + ":" + err.message);
            var parts = [];
            if (items.length > 0) {
                items.map((item) => {
                    parts.push(item.partname);
                })
                data.parts = Array.from(new Set(parts));
                data.exists = true;
                deferred.resolve(data);
            } else {
                data.exists = false;
                deferred.resolve(data);
            }
        });
    return deferred.promise;

}
/*
interogarile sunt de forma {nume_camp1: valoare1, ..}
atasam regex la fiecare valoare
filtram obiectele cu valoare diferita de null
generam obiectul pentru find(query) de forma {nume_camp1: valoare1, ...}
*/

const arrayOfObjFromObj = obj => Object.keys(obj).map(key => ({
    [key]: obj[key]
}))

const exceptObjects = (objsArray, exceptKeysArray, index = 0) => {

    if (index < exceptKeysArray.length) {
        objsArray = objsArray.filter(obj => Object.keys(obj)[0] !== exceptKeysArray[index]);
        index++;
        return exceptObjects(objsArray, exceptKeysArray, index)
    } else {
        return objsArray;
    }

}

const regexArrayOfObj = array => array.map(obj =>
    obj[Object.keys(obj)[0]] ? {
        [Object.keys(obj)[0]]: { '$regex': `.*${obj[Object.keys(obj)[0]]}.*`, '$options': 'i' }
    } : {
        [Object.keys(obj)[0]]: null
    });

const filterNotNulls = array => array.filter(element => element[Object.keys(element)[0]] !== null);

const createObjFromArrayOfObj = array => array.reduce((obj, element) => obj = {...obj, [Object.keys(element)[0]]: element[Object.keys(element)[0]] }, {});

const getFieldFromObject = (object, field) => object[field];


/*
qobj de forma 
{
    interogations: [...{fieldname, value}],
    pagination: { skip, limit },
    sort: {fielsdname: +1/-1},
    min: {fieldname: value},
    max: {fieldname: value}
}
*/

function getPartNames(qobj) {
    let deferred = Q.defer();
    let rawInterogations = arrayOfObjFromObj(qobj.interogations);
    let wantedFiels = exceptObjects(rawInterogations, ['vehcat', 'vehmade', 'vehmodel']);
    let regexInterogations = regexArrayOfObj(wantedFiels);
    let notNullInterogations = filterNotNulls(regexInterogations);
    let query = createObjFromArrayOfObj(notNullInterogations);
    db.nomenclator.find(query)
        .skip(0)
        .limit(7)
        .toArray(function(err, items) {
            if (err) deferred.reject(err.name + ":" + err.message);
            namesarray = items.map(item => getFieldFromObject(item, "partname"))
            deferred.resolve(namesarray);
        });
    return deferred.promise;
}



function getVehicleByQuery(thequery) {
    var deferred = Q.defer();
    var data = {};
    var query = {};
    for (sendquery in thequery.query) {
        var thissendquery = thequery.query[sendquery];
        if (thissendquery.value) {
            query[thissendquery.fieldname] = { '$regex': '.*' + thissendquery.value + '.*', '$options': 'i' };
        } else {
            query[thissendquery.fieldname] = null;
            delete query[thissendquery.fieldname];
        }
    }

    db.nomenclator.count(function(err, count) {
        data.itemsno = count;
    })
    db.nomenclator.find(query)
        .toArray(function(err, items) {
            if (err) deferred.reject(err.name + ":" + err.message);
            console.log(items);
            data.vehicles = items;
            deferred.resolve(data);
        });
    return deferred.promise;

}

function queryIfExists(thequery) {
    console.log(thequery);
    var deferred = Q.defer();
    var data = {};
    var query = {};
    for (sendquery in thequery.query) {
        var thissendquery = thequery.query[sendquery];
        if (thissendquery.value) {
            query[thissendquery.fieldname] = { '$regex': '.*' + thissendquery.value + '.*', '$options': 'i' };
        } else {
            query[thissendquery.fieldname] = null;
            delete query[thissendquery.fieldname];
        }
    }
    console.log(query);

    db.nomenclator.find(query)
        .toArray(function(err, items) {
            if (err) deferred.reject(err.name + ":" + err.message);
            console.log(items);
            if (items.length > 0) {
                data.exists = true;
            } else {
                data.exists = false;
            }

            deferred.resolve(data);
        });
    return deferred.promise;
}

function getLastPartNo() {
    var deferred = Q.defer();
    db.nomenclator.findOne({}, {}, { sort: { 'created_at': -1 } }, function(err, part) {
        if (err) deferred.reject(err.name + ":" + err.message);
        if (part !== null) {
            deferred.resolve({ partno: part.partno });
        } else {
            deferred.resolve({ partno: null });
        }
    });
    return deferred.promise;
}


function create(itemParam) {
    var deferred = Q.defer();

    db.nomenclator.insert(
        itemParam,
        function(err, item) {
            if (err) deferred.reject(err.name + ":" + err.message);

            deferred.resolve(item.ops[0]);
        });

    return deferred.promise;
}

function update(_id, elemParam) {
    var deferred = Q.defer();

    db.nomenclator.findById(_id, function(err, items) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        updateParts();

    });

    function updateParts() {
        var set = {
            type: elemParam.type,
            vehcat: elemParam.vehcat,
            vehmade: elemParam.vehmade,
            vehmodel: elemParam.vehmodel,
            vehtype: elemParam.vehtype,
            partcat: elemParam.partcat,
            partsubcat: elemParam.partsubcat,
            partname: elemParam.partname
        };
        db.nomenclator.update({ _id: mongo.helper.toObjectID(_id) }, { $set: set },
            function(err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve(doc);
            });
    }
    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.nomenclator.remove({ _id: mongo.helper.toObjectID(_id) },
        function(err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}