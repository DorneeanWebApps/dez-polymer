import { LitElement, html } from '@polymer/lit-element';
import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin';

import '@polymer/paper-button/paper-button';

import { selectSearchGrid, selectSearchContainer } from '../actions/search-selection.js';

import { setIconStyle, searchIcon } from '../initializers/my-icons.js';
import { titleIconStyle } from '../styles/my-icons-styles.js';

import '../elements/search-selector.js';
import './search-form.js';

class SearchComponent extends connect(store)(LitElement) {
    _render(props) {
        return html `
        <style>

            .search-wrapper{
                height: calc(100% - 15px);
                display: grid;
                grid-gap: 10px;
                padding: 7px;
                border: 1px;
                border-style: solid;
                background-color: var(--neutral-background-color);
                border-color: var(--app-neutral-color);
                border-radius: 4px;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows: 3em 1fr 1fr 1fr 3em;
            }

            .search-wrapper .title-text{
                grid-column: 1/6;
            }

            .search-wrapper .search-selector{
                grid-column: 6/9;
                align-content: center;
                justify-content: center;
            }

            .search-wrapper .search-element{
                grid-column: 1/9;
                grid-row: 2/5;
                background-color: var(--app-drawer-background-color);
                border-radius: 5px;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            }

            .search-wrapper div:last-child{
                grid-column: 5/9;
                display: grid;
                align-content: center;
                justify-content: end;
            }


            .title-text{
                align-self: center;
                display:grid;
                justify-content: start;
                align-content: center;               
            }

            .title-text > h3{
                grid-column: 1;
                grid-row: 1;
                margin:0;
                font-family: "Open Sans Condensed";
                font-size: 1.3em;
                color: var(--app-secondary-color);
            }


            .actions > paper-button{
                justify-self:end;
                height: 100%;
                background-color: var(--app-hover-primary-color);
                color: var(--app-secondary-color);
                z-index:0!important;
            }

            .actions > paper-button:hover{
                background-color: var(--app-primary-color);
                color: var(--app-light-text-color);
            }

            search-selector{
                height: 100%;
                align-self: center;
            }
          
        </style>

        <div class="search-wrapper">
            <div class="title-text">
                <h3> ${setIconStyle(titleIconStyle, searchIcon)} Cauta ${props._srcselect}</h3>
            </div>
            <div class="search-selector">        
                <search-selector></search-selector>
             </div>
            <div class="search-element">
                <search-form></search-form>
            </div>

            <div class="actions">
                <paper-button class="go-button">Vezi rezultate</paper-button>
            </div>
        </div>
        
    `;
    }

    static get properties() {
        return {
            _srcselect: String,
        }
    }

    _firstRendered() {
        store.dispatch(selectSearchContainer(this._selection));
    }

    _stateChanged(state) {
        this._selection = state.selection;
        this._srcselect = state.selection.text;
    }
}

window.customElements.define('search-component', SearchComponent);