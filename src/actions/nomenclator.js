import { apiUrl } from '../config.js';

export const REQUEST_PARTSNAMES = 'REQUEST_PARTSNAMES';
export const RECEIVE_PARTSNAMES = 'RECEIVE_PARTSNAMES';
export const FAIL_PARTSNAMES = 'FAIL_PARTSNAMES';
export const SET_DROPDOWN_HEIGHT = 'SET_DROPDOWN_HEIGHT'

export const getPartNames = (data, qobjfield) => (dispatch, getState) => {

    if (sholdGetPartsNames(getState(), data, qobjfield)) {
        dispatch(requestPartsNames());
        let qobj = getState().qobj;
        qobj.interogations[Object.keys(data)[0]] = data[Object.keys(data)[0]];
        fetch(`${apiUrl}/nomenclator/getpartsnames`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ qobj: qobj })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                return dispatch(handlePartsNames(data.names))
            })
            .catch(() => dispatch(failPartsNames()));
    }
}


const requestPartsNames = () => {
    return {
        type: REQUEST_PARTSNAMES,
    };
};

const handlePartsNames = (partsnames) => (dispatch) => {
    let dynamicHeight = `${(partsnames.length+1) * 1.5 }em`;
    dispatch(changeContainerHeight(dynamicHeight));
    dispatch(receivePartsNames(partsnames));
};

const receivePartsNames = (partsnames) => {
    return {
        type: RECEIVE_PARTSNAMES,
        partsnames
    };
}

const failPartsNames = () => {
    return {
        type: FAIL_PARTSNAMES,
    };
};

const changeContainerHeight = (containerheight) => {
    return {
        type: SET_DROPDOWN_HEIGHT,
        containerheight
    }
}

const sholdGetPartsNames = (state, data, gobjfield) => {
    if (gobjfield === "interogations") {
        return isNewInterogation(state, data);
    }
}

const isNewInterogation = (state, interogation) => {
    return !state.qobj[Object.keys(interogation)[0]] || state.qobj[Object.keys(interogation)[0]] !== interogation[Object.keys(interogation)[0]] ? true : false;
}