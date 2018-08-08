import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat';

import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { selectSearchContainer } from '../actions/search-selection.js';

import { searchSelectors } from '../initializers/search-vars.js';
import { ButtonIconPrimary } from '../styles/my-icons-styles.js';


class SearchSelector extends connect(store)(LitElement) {
        _render(props, selObjs) {
                return html `
                ${ButtonIconPrimary}
      <style>
          .selector-wrapper{
              height:100%;
              display: grid;
              grid-gap: 10px;
              grid-template-columns: 1fr 1fr 1fr 1fr;
              align-content: center;
              justify-content: center;
          }

          .selector-wrapper svg:nth-child(1){
            grid-column: 2;
          }

          .selector-wrapper svg:nth-child(2){
            grid-column: 3;
          }

          .selector-wrapper svg:nth-child(3){
            grid-column: 4;
          }

        
          
      </style>

      <div class="selector-wrapper">
         ${repeat(props.selObjs, obj => html`
         <svg class="button-icon-primary" onclick="${() => store.dispatch(selectSearchContainer(obj.selection))}" selected?="${obj.selected}">${obj.icon}</svg> 
         `)}
      </div>
    `;
    }

    static get properties() {
        return {
            _selection: String,
            selObjs: Array
        }
    }


    constructor() {
        super();
        
    }

    _firstRendered() {
        
    }



    _stateChanged(state) {
        this._selection = state.selection.value;
        this.selObjs = searchSelectors.map(obj => {
            obj.value === this._selection ? obj.selected = true:obj.selected = false;
            obj.selection = {value: obj.value,text: obj.text};
            return obj;
        });
        
    }


}

window.customElements.define('search-selector', SearchSelector);