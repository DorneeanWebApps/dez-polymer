import { getPartNames } from './nomenclator.js'

export const RESET_INTEROGATIONS = 'RESET_INTEROGATIONS';
export const RESET_ONE_INTEROGATION = 'RESET_ONE_INTEROGATION';
export const SET_INTEROGATIONS = 'SET_INTEROGATIONS';
export const RESET_PAGINATION = 'RESET_PAGINATION';
export const SET_PAGINATION = 'SET_PAGINATION';
export const RESET_SORTBY = 'RESET_SORTBY';
export const SET_SORTBY = 'SET_SORTBY';
export const RESET_MIN = 'RESET_MIN';
export const SET_MIN = 'SET_MIN';
export const RESET_MAX = 'RESET_MAX';
export const SET_MAX = 'SET_MAX';


export const setInterogation = (fieldname, value) => (dispatch, getState) => {

    let data = {
        [fieldname]: value
    }

    if (fieldname = "type" && value === "part" || getState().qobj.interogations.type === "part") {
        dispatch(getPartNames(data, "interogations"));
    }

    return {
        type: SET_INTEROGATIONS,
        fieldname,
        value
    }
}

export const resetOneInterogation = (fieldname) => {

    return {
        type: RESET_ONE_INTEROGATION,
        fieldname
    }
}

export const resetInterogations = () => {
    return {
        type: RESET_INTEROGATIONS
    }
}

export const setPagination = (skip, limit, pagesno) => {
    return {
        type: SET_PAGINATION,
        skip,
        limit,
        pagesno
    }
}

export const resetPagination = () => {
    return {
        type: RESET_PAGINATION
    }
}

export const setSortBY = (fieldname, value) => {
    return {
        type: SET_SORTBY,
        fieldname,
        value
    }
}

export const resetSortBy = () => {
    return {
        type: RESET_SORTBY
    }
}

export const setMin = (fieldname, value) => {
    return {
        type: SET_MIN,
        fieldname,
        value
    }
}

export const resetMin = () => {
    return {
        type: RESET_MIN
    }
}

export const setMax = (fieldname, value) => {
    return {
        type: SET_MAX,
        fieldname,
        value
    }
}

export const resetMax = () => {
    return {
        type: RESET_MAX
    }
}