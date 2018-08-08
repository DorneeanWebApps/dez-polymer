import {
    RESET_INTEROGATIONS,
    RESET_ONE_INTEROGATION,
    SET_INTEROGATIONS,
    RESET_PAGINATION,
    SET_PAGINATION,
    RESET_SORTBY,
    SET_SORTBY,
    RESET_MIN,
    SET_MIN,
    RESET_MAX,
    SET_MAX,


} from '../actions/search-interogations.js';

const initialState = {
    interogations: { vehcat: '', vehmade: '', vehmodel: '', partcat: '', partsubcat: '', partcode: '' },
    pagination: { skip: 0, limit: 5, pagesno: null },
    sortBy: { fieldname: 'created_at', value: -1 }
}

const qobj = (state = initialState, action) => {
    switch (action.type) {
        case RESET_INTEROGATIONS:
            return {
                ...state,
                interogations: {
                    vehcat: '',
                    vehmade: '',
                    vehmodel: '',
                    partcat: '',
                    partsubcat: '',
                    partcode: ''
                }
            };
        case RESET_ONE_INTEROGATION:
        case SET_INTEROGATIONS:
            return {
                ...state,
                interogations: changeInterogation(state.interogations, action)
            };
        case RESET_PAGINATION:
            return {
                ...state,
                pagination: {
                    skip: 0,
                    limit: 5,
                    pagesno: null
                }
            };
        case SET_PAGINATION:
            return {
                ...state,
                pagination: {
                    skip: action.skip,
                    limit: action.limit,
                    pagesno: action.pagesno
                }
            };
        case RESET_SORTBY:
            return {
                ...state,
                sortBy: {
                    fieldname: 'created_at',
                    value: -1
                }
            };
        case SET_SORTBY:
            return {
                ...state,
                sortBy: {
                    fieldname: action.fieldname,
                    value: action.value
                }
            };
        case RESET_MIN:
            return {
                ...state,
                min: {}
            };
        case SET_MIN:
            return {
                ...state,
                min: {
                    [action.fieldname]: action.value,
                }
            };
        case RESET_MAX:
            return {
                ...state,
                max: {}
            };
        case SET_MAX:
            return {
                ...state,
                max: {
                    [action.fieldname]: action.value,
                }
            };
        default:
            return state;
    }
};

const changeInterogation = (state, action) => {
    switch (action.type) {
        case RESET_ONE_INTEROGATION:
            return {
                ...state,
                [action.fieldname]: ''
            };
        case SET_INTEROGATIONS:
            return {
                ...state,
                [action.fieldname]: action.value
            };
        default:
            return state;
    }
}

export default qobj;