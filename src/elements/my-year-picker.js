import { LitElement, html } from '@polymer/lit-element';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-button/paper-button.js';
import { repeat } from 'lit-html/lib/repeat';

import { generateDecades, generateYearsArray } from '../functions/time-picker-builders.js';
import { setSelected, deselectAll } from '../functions/general-purpose.js'

import { MyDialogStyles, MyDialogSelectValuesButton } from '../styles/my-dialog-styles';
import { MyInputPickerStyles } from '../styles/my-input-pickes-styles.js';
import { DialogTitleIcon } from '../styles/my-icons-styles.js';

import { chevronRight, chevronLeft } from '../initializers/my-icons.js';

class MyYearPicker extends LitElement {
    _render(props) {
            return html `
    ${MyDialogStyles}
    ${MyInputPickerStyles}
    ${MyDialogSelectValuesButton}
    ${DialogTitleIcon}
    <style>

        #decadesDialog{
            margin-bottom: -30px;
            margin-left: 0;
            width: 280px;
            height: 400px;
            border-radius: 5px;
        }

        #yearsDialog{
            margin-bottom: -30px;
            margin-left: 0;
            width: 280px;
            height: 400px;
            border-radius: 5px;
        }

        

    </style>
    
    <div class="input-wrapper">
        <input class="input-element" disabled="${props.isdisabled}" type="text" onclick="${(e)=>this.openDecadesDialog(e.target)}" field="${props.field}" readonly placeholder="${props.placeholder}"  
            autocapitalize="on" value="${this.resultedValue}">
    </div>
    <paper-dialog id="decadesDialog" no-overlap with-backdrop horizontal-align="center" vertical-align="bottom">
        <div class="dialog-container">
            <div class="dialog-header">
                <h2>ALEGE DECADA</h2>
            </div>
            <div class="dialog-content" one-column>
                ${repeat(props.decades, (value, index) => html`
                    <paper-button class="select-button" onclick='${() => this.selectDecadeValue(index)}' selected?="${value.selected}">${value.decadeText}</paper-radio-button>
                `)}
            </div>          
            <div class="dialog-actions">
                <paper-button class="cancel-btn" onclick="${(e)=>this.deselectAllDecades(e)}">RENUNTA</paper-button>
            </div>  
        </div>
    </paper-dialog>

    <paper-dialog id="yearsDialog" no-overlap with-backdrop horizontal-align="center" vertical-align="bottom">
        <div class="dialog-container">
            <div with-actions class="dialog-header">
                <div class="header-actions" header-action-disabled?="${props.decrementDisabled}" onclick="${()=>this.decrementDecade(props.selectedDecade.index)}">${chevronLeft}</div>
                <h2 class="header-actions-text">${props.selectedDecade.decadeText}</h2>
                <div class="header-actions" header-action-disabled?="${props.incrementDisabled}" onclick="${()=>this.incrementDecade(props.selectedDecade.index)}">${chevronRight}</div>
            </div>
            <div class="dialog-content" two-columns>
                ${repeat(props.years, (year, index) => html`
                    <paper-button class="select-button" onclick='${() => this.selectYearValue(year, index)}' selected?="${year.selected}">${year.value}</paper-radio-button>
                `)}
            </div>
            <div class="dialog-actions">
                <paper-button class="cancel-btn" onclick="${(e)=>this.deselectAllYears(e)}">RENUNTA</paper-button>
            </div>
        </div>
    </paper-dialog>
    `;
    }

    static get properties() {
        return {
            placeholder: String,
            decades: Array,
            years: Array,
            decadesNo: Number,
            field: String,
            selectedDecade: Object,
            resultedValue: String,
            minYear: Number,
            maxYear: Number,
            isdisabled: Boolean,
            incrementDisabled: Boolean,
            decrementDisabled: Boolean,                         
        }

    }

    constructor(){
        super();
        this.decades = [];
        this.years =[];
        this.decadesNo = 5;
        this.selectedDecade = {};
    }

    _firstRendered(props){
    }

    _didRender(props, changedProps, prevProps) {
      }

    openDecadesDialog(element) {
        this.positionTarget = element;
        this.decades = deselectAll(generateDecades(this.decadesNo, this.minYear, this.maxYear));
        this._root.querySelector('#decadesDialog').positionTarget = element;
        this._root.querySelector('#decadesDialog').open();
    }

    setSelectedDecade(decadesarray, index){
        this.resultedValue = this.selectedYear = '';
        this.decades = setSelected(decadesarray, index);
        this.selectedDecade = this.decades[index];
        this.resultedValue = this.selectedDecade.decadeText;
        this.selectedDecade.index = index;
        this.years = generateYearsArray(this.selectedDecade.beginYear, this.selectedDecade.endYear);
    }

    selectDecadeValue(index){
        this.setSelectedDecade(this.decades, index);
        this._root.querySelector('#decadesDialog').close();
        this._root.querySelector('#yearsDialog').positionTarget = this.positionTarget;
        this._root.querySelector('#yearsDialog').open();
    }

    decrementDecade(index){
        let newindex = index > 0 ? index-1 : index;
        this.decrementDisabled = newindex === 0 ? true : false;
        this.setSelectedDecade(this.decades, newindex);
    }

    incrementDecade(index){
        let newindex = index < this.decades.length-1 ? index+1 : index;
        this.incrementDisabled = newindex === this.decades.length-1 ? true : false;
        this.setSelectedDecade(this.decades, newindex);
    }

    selectYearValue(year,index){
        this.resultedValue = this.selectedYear = year.value;
        this.years = setSelected(this.years, index)
        this._root.querySelector('#yearsDialog').close();
        this.dispatchEvent(new CustomEvent('year-changed', { detail: {field: this.field, value: this.selectedYear} ,  bubbles: true, composed: true  })); 
    }

    deselectAllDecades(e){
        this._root.querySelector('#decadesDialog').close();
        this.decades = deselectAll(this.decades);
        this.selectedDecade = {};
        this.resultedValue = '';
        this.deselectMinMaxYears();
    }

    deselectAllYears(e){
        this._root.querySelector('#yearsDialog').close();
        this.decades = deselectAll(this.decades);
        this.years = deselectAll(this.years);
        this.selectedDecade = {};
        this.selectedYear = {};
        this.resultedValue = '';
        this.deselectMinMaxYears();
    }

    deselectMinMaxYears(){
        this.minYear = this.field === "fromYear" ? null : this.minYear;
        this.maxYear = this.field === "toYear" ? null : this.maxYear;
        this.dispatchEvent(new CustomEvent('year-changed', { detail: {field: this.field, value: null} ,  bubbles: true, composed: true  })); 
    }


}
window.customElements.define('my-year-picker', MyYearPicker);