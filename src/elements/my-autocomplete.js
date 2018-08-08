import { LitElement, html } from '@polymer/lit-element';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-dropdown/iron-dropdown.js'
import { repeat } from 'lit-html/lib/repeat';

import { MyDialogStyles, MyDialogSelectValuesButton } from '../styles/my-dialog-styles';
import { MyInputPickerStyles } from '../styles/my-input-pickes-styles.js'

class MyAutocomplete extends LitElement {
    _render(props, pickerselected) {
            return html `       
        ${MyDialogStyles}
        ${MyInputPickerStyles}
        
        <style>
        
        #dropdown{
            box-sizing: border-box;
            margin-bottom: 10px;
            border-radius: 5px;
            background-color: var(--app-secondary-color);
            padding:5px;
        }

        #content{
            border: 1px;
            border-style: solid;
            border-radius: 5px;
            border-color: var(--app-neutral-color);
            background-color: var(--neutral-background-color);
            color: var(--app-secondary-color);
            padding: 8px;
            overflow-y: auto;
            max-height: 150px;
        }

        #content::-webkit-scrollbar {
            display: none;
        }

        .input-element:hover{
            cursor: auto !important;
        }

        .autocomplete-item{
            height: 1.5em;
            width:100%;
            border-bottom: 1px;
            border-bottom-style: solid;
            border-bottom-color: var(--app-neutral-color);
            font-size: 1.2em;
        }

        .autocomplete-item:hover{
            background-color: var(--app-neutral-color);
            cursor: pointer;
        }

    </style>
    
    <div class="input-wrapper">
        <input id="input-field" name="autocomplete" class="input-element" type="text" onkeyup="${(e)=>this.sendTyped(e)}"
            onclick="${(e)=>this.openDropDown(e)}" field="${props.field}" placeholder="${props.viewplaceholder}"  
            autocapitalize="on" onblur="${()=>this.viewplaceholder = this.placeholder}" onfocus="${()=>this.viewplaceholder = ''}" value="${this.selectedValue}">
    </div>
    <iron-dropdown no-overlap id="dropdown" horizontal-align="center" vertical-align="bottom">
        <div slot="dropdown-content" id="content">
            ${repeat(this.valuesArray, value => html`
                <div class="autocomplete-item" onclick='${() => this.selectValue(value)}'>${value}</div>
                `)}
        </div>
    </iron-dropdown>

    `;
    }


    static get properties() {
        return {
            placeholder: String,
            viewplaceholder: String,
            valuesArray: Array,
            selectedValue: String,
            searchname: String, 
            field: String,
            dropHeight: String,
            firstOpened: Boolean,
        }

    }

    constructor(){
        super();
        this.valuesArray=[];
        this.selectedValue = '';
        this.firstOpened = false;
    }

    _firstRendered(props) {
        this.viewplaceholder = this.placeholder;
    }

    _didRender(props, changedProps, prevProps) {
        if(changedProps.dropHeight&&this.firstOpened){
            this._root.querySelector('#dropdown').open();
        }
    }

    openDropDown(element){
        this._root.querySelector('#dropdown').positionTarget = element.target;
        this._root.querySelector('#dropdown').style.width = `${this._root.querySelector('#input-field').offsetWidth}px`;
        this._root.querySelector('#dropdown').open();
        this.firstOpened = true;
    }

    sendTyped(element) {
        this._root.querySelector('#dropdown').close();
        this.selectedValue = this._root.querySelector('#input-field').value;
        this.dispatchEvent(new CustomEvent('autocomplete-typed', { detail: {field: this.field, value: this.selectedValue} ,  bubbles: true, composed: true  })); 
    }

    selectValue(value) {
        this.selectedValue = value;
        this._root.querySelector('#dropdown').close();
        this.dispatchEvent(new CustomEvent('autocomplete-selected', { detail: {field: this.field, value: this.selectedValue} ,  bubbles: true, composed: true  })); 
    }

    deselectAll(e) {

    }






}

window.customElements.define('my-autocomplete', MyAutocomplete);