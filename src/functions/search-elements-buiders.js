export const getSelected = (array, property, selected) => array.filter(item => item[property] === selected)[0];

export const getArrayFromObjs = (objects, field) => objects.map(obj => obj[field]);