import { LitElement, html } from '@polymer/lit-element';

import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { setInterogation, resetInterogations, resetOneInterogation, setMin, resetMin, setMax, resetMax } from '../actions/search-interogations.js';

import '../elements/my-input.js'
import '../elements/my-input-picker.js';
import '../elements/my-year-picker.js';
import '../elements/my-autocomplete.js'
import { getSelected, getArrayFromObjs } from '../functions/search-elements-buiders.js';

class SearchForm extends connect(store)(LitElement) {
    _render(props, vehcat) {
        return html `               
      <style>

        [vehview]{
            height: calc(100% - 15px);
            display: grid;
            grid-gap: 10px;
            padding: 7px;
            grid-template-columns: 1fr minmax(140px, 1fr) minmax(140px, 1fr) 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr;    

        }

        [vehview] div:nth-child(1){
            grid-column: 2/4;
            grid-row: 1;
            align-content: center;
            justify-content: center; 
        }

        [vehview] div:nth-child(2){
            grid-column: 2/4;
            grid-row: 2;
            align-content: center;
            justify-content: center; 
        }

        [vehview] div:nth-child(3){
            grid-column: 2/4;
            grid-row: 3;
            align-content: center;
            justify-content: center; 
        }

        [vehview] div:nth-child(4){
            grid-column: 2;
            grid-row: 4;
            align-content: center;
            justify-content: center; 
        }

        [vehview] div:nth-child(5){
            grid-column: 3;
            grid-row: 4;
            align-content: center;
            justify-content: center; 
        }

        [part2cols]{
            height: calc(100% - 15px);
            display: grid;
            grid-gap: 10px;
            padding: 7px;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr;                   
        }

        [part2cols] div:nth-child(odd):not(:last-child){
            grid-column: 1/3;
            align-content: center;
            justify-content: center; 
        }

        [part2cols] div:nth-child(even){
            grid-column: 3/5;
            align-content: center;
            justify-content: center; 
        }

        [part2cols] div:last-child{
            grid-column: 2/4;
            align-content: center;
            justify-content: center; 
        }

        [codeview]{
            height: calc(100% - 15px);
            display: grid;
            grid-gap: 10px;
            padding: 7px;
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
        }

        [codeview] div:nth-child(1){
            grid-column: 2/5;
            grid-row: 3;
        }


        [hidden]{
            display:none;
        }

        .form-field{
            height: 100%;
            align-content: center;
            justify-content: center;
        }


        my-input-picker{
            height:100%;
        }


      </style>

      <div vehview hidden?="${this.viewmode !== 'veh-view'}" class="form-wrapper">
         <div class="form-field">
             <my-input-picker on-picker-changed="${(e)=>this.valueChanged(e.detail)}" placeholder="Categorie autovehicul" pickervalues="${props.vehcatsarray}" field="vehcat"></my-input-picker>
         </div>
         <div class="form-field">              
             <my-input-picker on-picker-changed="${(e)=>this.valueChanged(e.detail)}" isdisabled="${!props.hasmanufacturers}" placeholder="Marca autovehicul" pickervalues="${props.vehmadesarray}" field="vehmade"></my-input-picker>
         </div>
         <div class="form-field">
             <my-input-picker on-picker-changed="${(e)=>this.valueChanged(e.detail)}" isdisabled="${!props.hasmodels}"placeholder="Model autovehicul" pickervalues="${props.vehmodelsarray}" field="vehmodel"></my-input-picker>
         </div>
         <div>
             <my-year-picker on-year-changed="${(e)=>{this.yearChanged(e.detail)}}" placeholder="din anul" maxYear="${props.toYear}" field="fromYear"></my-year-picker>
         </div>
         <div>
             <my-year-picker on-year-changed="${(e)=>{this.yearChanged(e.detail)}}" placeholder="pana in" minYear="${props.fromYear}" field="toYear"></my-year-picker>
         </div>
       </div>

       <div part2cols  hidden?="${this.viewmode !== 'part-2cols'}" class="form-wrapper">
         <div>
             <my-input-picker on-picker-changed="${(e)=>this.valueChanged(e.detail)}" placeholder="Categorie autovehicul" pickervalues="${props.vehcatsarray}" field="vehcat"></my-input-picker>
         </div>
         <div>
            <my-input-picker on-picker-changed="${(e)=>this.valueChanged(e.detail)}" placeholder="Categorie piesa" pickervalues="${props.partcatsarray}" field="partcat"></my-input-picker>
         </div>
         <div>
            <my-input-picker on-picker-changed="${(e)=>this.valueChanged(e.detail)}" isdisabled="${!props.hasmanufacturers}" placeholder="Marca autovehicul" pickervalues="${props.vehmadesarray}" field="vehmade"></my-input-picker>
         </div>
         <div>
             <my-input-picker on-picker-changed="${(e)=>this.valueChanged(e.detail)}" isdisabled="${!props.haspartsubcats}" placeholder="Subcategorie piese" pickervalues="${props.partsubcatsarray}" field="partsubcat"></my-input-picker>
         </div>
         <div> 
             <my-input-picker on-picker-changed="${(e)=>this.valueChanged(e.detail)}" isdisabled="${!props.hasmodels}" placeholder="Marca autovehicul" pickervalues="${props.vehmadesarray}" field="vehmade"></my-input-picker>
        </div>
         <div></div>
         <div>
            <my-year-picker on-year-changed="${(e)=>{this.yearChanged(e.detail)}}" placeholder="din anul" maxYear="${props.toYear}" field="fromYear"></my-year-picker>
         </div>
         <div>
            <my-year-picker on-year-changed="${(e)=>{this.yearChanged(e.detail)}}" placeholder="pana in" minYear="${props.fromYear}" field="toYear"></my-year-picker>
         </div>
         <div>
            <my-autocomplete on-autocomplete-typed="${(e)=>{this.autocompleteTyped(e.detail)}}" on-autocomplete-selected="${(e)=>this.partnameSelected(e.detail)}" dropHeight="${props.dropHeight}" placeholder="Denumire piesa" valuesArray="${props.partsNamesArray}" field="partname"></my-autocomplete>
         </div>
       </div>

       <div codeview hidden?="${this.viewmode !== 'code-view'}">
        <div>
            <my-input on-input-changed="${(e)=>this.getPartCode(e.detail)}"  placeholder="Cauta dupa cod" field="code"></my-input>
        </div>
       </div>
    `;
    }

    static get properties() {
        return {
            _selection: String,
            _partcats: Array,
            _partsucats: Array,
            _vehcats: Array,
            _vehmades: Array,
            _vehmodels: Array,

            viewmode: String,
            vehcatsarray: Array,
            vehmadesarray: Array,
            vehmodelsarray: Array,
            partcatsarray: Array,
            partsubcatsarray: Array,
            vehcat: String,
            vehmade: String,
            vehmodel: String,
            partcar: String,
            partsubcat: String,

            fromYear: Number,
            toYear: Number,

            hasmanufacturers: Boolean,
            hasmodels: Boolean,
            haspartsubcats: Boolean,

            partsNamesArray: Array,
            dropHeight: String
        }
    }

    constructor() {
        super();
        this.vehcatsarray = [];
        this.vehmadesarray = [];
        this.vehmodelsarray = [];
        this.partsubcatsarray = [];
        this.hasmanufacturers = false;
        this.hasmodels = false;
        this.haspartsubcats = false;
    }

    _firstRendered() {}

    _didRender(props, changedProps, prevProps) {

    }


    _stateChanged(state) {
        this._partcats = state.appells.partcats;
        this._vehcats = state.appells.vehcats;
        this._viewport = state.app.viewport;
        this.viewmode = state.selection.gridtype;

        this.vehcatsarray = getArrayFromObjs(this._vehcats, "category");
        this.partcatsarray = getArrayFromObjs(this._partcats, "category");
        this.partsNamesState = state.nomenclator.partsnames;
        this.dropHeight = state.nomenclator.containerheight;
        if (this.partsNamesState) {
            this.partsNamesArray = this.partsNamesState.filter(els => els !== null);
        }
    }

    valueChanged(response) {
        if (response.value) {
            store.dispatch(setInterogation(response.field, response.value));
        }
        if (response.field === "vehcat") {
            if (response.value) {
                this._vehmades = getSelected(this._vehcats, "category", response.value).subcategories;
                this.vehmadesarray = getArrayFromObjs(this._vehmades, "marca");
                this.hasmanufacturers = true;
            } else {
                this._vehmades = this.vehmadesarray = [];
                this.hasmanufacturers = true;
                this.resetFromController(["vehcat"]);
            }
            this.vehmodelsarray = [];
            this.resetFromController(["vehmade", "vehmodel"]);
        } else if (response.field === "vehmade") {
            if (response.value) {
                this.vehmodelsarray = getSelected(this._vehmades, "marca", response.value).models;
                this.hasmodels = true;
            } else {
                this.vehmodelsarray = [];
                this.hasmodels = false;
                this.resetFromController(["vehmade"]);
            }
            this.resetFromController(["vehmodel"]);
        } else if (response.field === "partcat") {
            if (response.value) {
                this.partsubcatsarray = getSelected(this._partcats, "category", response.value).subcategories;
                this.haspartsubcats = true;
            } else {
                this.partsubcatsarray = [];
                this.haspartsubcats = false;
            }
            this.resetFromController(["partsubcat"]);
        }
    }

    yearChanged(response) {
        if (response.field === "fromYear" && response.value) {
            this.fromYear = response.value;
            store.dispatch(setMin('fabricatie', response.value));
        } else if (response.field === "toYear" && response.value) {
            this.toYear = response.value;
            store.dispatch(setMax('fabricatie', response.value));
        } else if (response.field === "fromYear" && !response.value) {
            this.fromYear = '';
            store.dispatch(resetMin('fabricatie'));
        } else if (response.field === "toYear" && !response.value) {
            this.toYear = '';
            store.dispatch(resetMax('fabricatie'));
        }
    }

    autocompleteTyped(value) {
        store.dispatch(setInterogation(value.field, value.value));
    }

    partnameSelected(value) {

    }

    getPartCode(value) {

    }

    resetFromController(array) {
        array.map(fieldname => { store.dispatch(resetOneInterogation(fieldname)) })
    }




}

window.customElements.define('search-form', SearchForm);