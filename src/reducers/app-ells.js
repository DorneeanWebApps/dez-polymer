/**
 * @license
 * Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {
    REQUEST_APPELLS,
    RECEIVE_APPELLS,
    FAIL_APPELLS,
} from '../actions/app-ells';

const appells = (state = { failure: true }, action) => {
    switch (action.type) {
        case REQUEST_APPELLS:
            return {
                ...state,
                vehcats: null,
                partcats: null,
                failure: false,
                isFetching: true
            };
        case RECEIVE_APPELLS:
            return {
                ...state,
                vehcats: action.vehcats,
                partcats: action.partcats,
                failure: false,
                isFetching: false
            };
        case FAIL_APPELLS:
            return {
                ...state,
                failure: true,
                isFetching: false
            };
        default:
            return state;
    }
};

export default appells;