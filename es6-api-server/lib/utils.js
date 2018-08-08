const arrayOfObjsFromObj = obj => Object.keys(obj).map(key => ({
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

const regexObj = obj =>
    obj[Object.keys(obj)[0]] ? {
        [Object.keys(obj)[0]]: { '$regex': `.*${obj[Object.keys(obj)[0]]}.*`, '$options': 'i' }
    } : {
        [Object.keys(obj)[0]]: null
    }

const filterNotNulls = element => element[Object.keys(element)[0]] !== null;

const createObjFromArrayOfObjs = (obj, element) => {
    obj[Object.keys(element)[0]] = element[Object.keys(element)[0]]
    return obj;
}

export const getFieldFromObject = (object, field) => object[field]

export const buildQuery = (qobj, exceptKeysArray = []) => {
    let interogations = arrayOfObjsFromObj(qobj.interogations);
    return exceptObjects(interogations, exceptKeysArray)
        .map(regexObj)
        .filter(filterNotNulls)
        .reduce(createObjFromArrayOfObjs, {})
}