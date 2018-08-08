import { apiUrl } from '../config.js';
import { isEqual } from 'lodash-es';
export const REQUEST_VEHICLES = 'REQUEST_VEHICLES';
export const RECEIVE_VEHICLES = 'RECEIVE_VEHICLES';
export const FAIL_VEHICLES = 'FAIL_VEHICLES';
export const LAST_INTEROGATION = 'LAST_INTEROGATION';

export const getVehicles = () => (dispatch, getState) => {

    if (sholdGetVehicles(getState())) {
        dispatch(requestVehicles());
        let qobj = getState().qobj;
        dispatch(lastInterogation(qobj));
        fetch(`${apiUrl}/vehicles/getbyinterogation`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ qobj: qobj })
            })
            .then(res => res.json())
            .then(data => {
                return dispatch(receiveVehicles(data.vehicles));
            })
            .catch(() => dispatch(failVehicles()));
    }
}

const requestVehicles = () => {
    return {
        type: REQUEST_VEHICLES,
    };
};

const receiveVehicles = (vehicles) => {
    return {
        type: RECEIVE_VEHICLES,
        vehicles
    };
}

const failVehicles = () => {
    return {
        type: FAIL_VEHICLES,
    };
};

const lastInterogation = (qobj) => {
    return {
        type: LAST_INTEROGATION,
        qobj
    }
}


const sholdGetVehicles = (state) => {
    console.log(isEqual(state.vehicles.lastqobj, state.qobj));
    return isEqual(state.vehicles.lastqobj, state.qobj) ? false : true;
}




const isNewInterogation = (state, interogation) => {
    return !state.qobj[Object.keys(interogation)[0]] || state.qobj[Object.keys(interogation)[0]] !== interogation[Object.keys(interogation)[0]] ? true : false;
}