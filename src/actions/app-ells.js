import { apiUrl } from '../config.js';

export const REQUEST_APPELLS = 'REQUEST_APPELLS';
export const RECEIVE_APPELLS = 'RECEIVE_APPELLS';
export const FAIL_APPELLS = 'FAIL_APPELLS';

export const loadAppElls = () => (dispatch, getState) => {


    // if (shouldLoadAppElls(getState())) {


    dispatch(requestAppElls());
    fetch(`${apiUrl}/appelements`)
        .then(res => res.json())
        .then(data => {
            return dispatch(receiveAppElls(data[0]))
        })
        .catch(() => dispatch(failAppElls()));

    // }
};

const shouldLoadAppElls = (state) => {
    return state.appells.failure && !state.appells.isFetching;
}

const requestAppElls = () => {
    return {
        type: REQUEST_APPELLS,
    };
};

const receiveAppElls = (item) => {
    return {
        type: RECEIVE_APPELLS,
        vehcats: item.vehicle_categories,
        partcats: item.parts_categories
    };
};

const failAppElls = () => {
    return {
        type: FAIL_APPELLS,
    };
};