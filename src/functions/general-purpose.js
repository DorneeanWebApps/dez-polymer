export const setSelected = (array, index) => array.map((item, idx) => {
    item.selected = index === idx ? true : false;
    return item;
});

export const deselectAll = (array) => array.map(item => {
    item.selected = false;
    return item;
});