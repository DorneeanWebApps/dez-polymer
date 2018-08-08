import {
    REQUEST_VEHICLES,
    RECEIVE_VEHICLES,
    FAIL_VEHICLES,
    LAST_INTEROGATION,
} from '../actions/vehicles';

const initialState = { failure: true };

const vehicles = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_VEHICLES:
            return {
                ...state,
                vehicles: [],
                failure: false,
                isFetching: true
            };
        case RECEIVE_VEHICLES:
            return {
                ...state,
                data: action.vehicles,
                failure: false,
                isFetching: false
            };
        case FAIL_VEHICLES:
            return {
                ...state,
                failure: true,
                isFetching: false
            };
        case LAST_INTEROGATION:
            return {
                ...state,
                lastqobj: action.qobj
            }
        default:
            return state;
    }
};

export default vehicles;