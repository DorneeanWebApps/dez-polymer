import {
    REQUEST_PARTSNAMES,
    RECEIVE_PARTSNAMES,
    FAIL_PARTSNAMES,
    SET_DROPDOWN_HEIGHT,
} from '../actions/nomenclator';

const initialState = { failure: true, containerheight: 0 };

const nomenclator = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_PARTSNAMES:
            return {
                ...state,
                partsnames: [],
                failure: false,
                isFetching: true
            };
        case RECEIVE_PARTSNAMES:
            return {
                ...state,
                partsnames: action.partsnames,
                failure: false,
                isFetching: false
            };
        case FAIL_PARTSNAMES:
            return {
                ...state,
                failure: true,
                isFetching: false
            };
        case SET_DROPDOWN_HEIGHT:
            return {
                ...state,
                containerheight: action.containerheight
            }
        default:
            return state;
    }
};

export default nomenclator;