import { setInterogation } from './search-interogations.js';

export const SELECT = 'SELECT';
export const GRID_TYPE = 'GRID_TYPE'

export const selectSearchContainer = (searchType) => (dispatch) => {
    dispatch(setInterogationType(searchType.value));
    dispatch(selectSearchGrid(searchType.value));
    dispatch(defineSelected(searchType));

}

export const setInterogationType = (searchType) => (dispatch) => {
    if (searchType === "vehicles") {
        dispatch(setInterogation("type", "vehicle"))
    } else if (searchType === "parts") {
        dispatch(setInterogation("type", "part"))
    } else if (searchType === "code") {
        dispatch(setInterogation("type", "code"))
    }
}

export const selectSearchGrid = (searchType) => (dispatch, getState) => {


    if (getState().app.page === "acasa") {
        searchType === "vehicles" ? dispatch(selectGridType("veh-view")) :
            searchType === "parts" && getState().app.isWide ? dispatch(selectGridType("part-2cols")) :
            searchType === "parts" && !getState().app.isWide ? dispatch(selectGridType("part-1col")) :
            searchType === "code" ? dispatch(selectGridType("code-view")) : dispatch(selectGridType(''));
    } else {
        dispatch(selectGridType("general-view"))
    }

}

const selectGridType = (gridType) => {
    return {
        type: GRID_TYPE,
        grid: gridType
    }
}

const defineSelected = (searchType) => {
    return {
        type: SELECT,
        selected: searchType
    }
}