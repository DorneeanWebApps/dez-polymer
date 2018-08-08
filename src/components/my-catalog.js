import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import { connect } from 'pwa-helpers/connect-mixin';

import { store } from '../store.js';


import '@polymer/iron-image';

// These are the shared styles needed by this element.
import { SharedStyles } from '../styles/shared-styles.js';

class MyCatalog extends connect(store)(PageViewElement) {
    _render(props) {
        return html `
      ${SharedStyles}



    `;
    }

    static get properties() {
        return {

        }
    }

    // This is called every time something is updated in the store.
    _stateChanged(state) {
        console.log(state);
    }


}



window.customElements.define('my-catalog', MyCatalog);