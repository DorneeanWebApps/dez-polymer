import { LitElement, html } from '@polymer/lit-element';

import { MyInputPickerStyles } from '../styles/my-input-pickes-styles.js'

class MyInput extends LitElement {
    _render(props, pickerselected) {
        return html `       
        ${MyInputPickerStyles}
        
        <style>
        

        .input-element:hover{
            cursor: auto !important;
        }


    </style>
    
    <div class="input-wrapper">
        <input id="input-field" class="input-element" type="text" onkeyup="${(e)=>this.sendTyped(e)}"
            field="${props.field}" placeholder="${props.viewplaceholder}"  
            autocapitalize="on" onblur="${()=>this.viewplaceholder = this.placeholder}" onfocus="${()=>this.viewplaceholder = ''}" value="${this.typedValue}">
    </div>

    `;
    }


    static get properties() {
        return {
            placeholder: String,
            viewplaceholder: String,
            typedValue: String,
            field: String,
        }
    }

    constructor() {
        super();
    }

    _firstRendered(props) {
        this.viewplaceholder = this.placeholder;
    }

    _didRender(props, changedProps, prevProps) {}


    sendTyped(element) {
        this.typedValue = this._root.querySelector('#input-field').value;
        this.dispatchEvent(new CustomEvent('input-changed', { detail: { field: this.field, value: this.typedValue }, bubbles: true, composed: true }));
    }

}

window.customElements.define('my-input', MyInput);