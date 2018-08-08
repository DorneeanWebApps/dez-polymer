import { SELECT, GRID_TYPE } from '../actions/search-selection.js';


const selection = (state = { value: "vehicles", text: "vehicule" }, action) => {
    switch (action.type) {
        case SELECT:
            return {
                ...state,
                value: action.selected.value,
                text: action.selected.text
            };
        case GRID_TYPE:
            return {
                ...state,
                gridtype: action.grid
            };

        default:
            return state;
    }
};

export default selection;