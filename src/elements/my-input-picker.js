import { LitElement, html } from '@polymer/lit-element';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-button/paper-button.js';
import { repeat } from 'lit-html/lib/repeat';

import { MyDialogStyles, MyDialogSelectValuesButton } from '../styles/my-dialog-styles';
import { MyInputPickerStyles } from '../styles/my-input-pickes-styles.js'

class MyInputPicker extends LitElement {
    _render(props, pickerselected) {
            return html `
        ${MyDialogStyles}
        ${MyInputPickerStyles}
        ${MyDialogSelectValuesButton}    
        
        <style>
        

        #alignedDialog{
            margin-bottom: -30px;
            margin-left: 0;
            width: 280px;
            height: 400px;
            border-radius: 5px;
        }

    </style>
    
    <div class="input-wrapper">
        <input class="input-element" disabled="${props.isdisabled}" type="text" onclick="${(e)=>this.openDialog(e.target)}" field="${props.field}" readonly placeholder="${props.placeholder}"  
            autocapitalize="on" value="${this.pickerselected}">
    </div>
    <paper-dialog id="alignedDialog" no-overlap with-backdrop horizontal-align="center" vertical-align="bottom">
        <div class="dialog-container">
            <div class="dialog-header">
                <h2>ALEGE DIN LISTA</h2>
            </div>
            <paper-dialog-scrollable class="dialog-content" one-column>
                <paper-radio-group selected="${this.pickerselected}">
                ${repeat(props.pickervalues, value => html`
                    <paper-radio-button onclick='${() => this.selectValue(value)}' name="${value}" class="picker-field">${value}</paper-radio-button>
                `)}
                </paper-radio-group>
            </paper-dialog-scrollable>
            <div class="dialog-actions">
                <paper-button class="cancel-btn" onclick="${(e)=>this.deselectAll(e)}">RENUNTA</paper-button>
            </div>
        </div>
    </paper-dialog>
    `;
    }


    static get properties() {
        return {
            placeholder: String,
            pickervalues: Array,
            field: String,
            dialogvalues: Array,
            pickerselected: String,
            isdisabled: Boolean                          
        }

    }

    _firstRendered(props){
    }

    _didRender(props, changedProps, prevProps) {
      }

    openDialog(element) {
        this._root.querySelector('#alignedDialog').positionTarget = element;
        this._root.querySelector('#alignedDialog').open();
    }

    selectValue(value){
        this.pickerselected = value;
        this.dispatchEvent(new CustomEvent('picker-changed', { detail: {field: this.field, value: this.pickerselected} ,  bubbles: true, composed: true  })); 
        this._root.querySelector('#alignedDialog').close();

    }

    deselectAll(e){
        this.pickerselected = '';
        this._root.querySelector('#alignedDialog').close();
    }






}

window.customElements.define('my-input-picker', MyInputPicker);