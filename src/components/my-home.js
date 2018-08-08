import { html } from '@polymer/lit-element';
import { PageViewElement } from './page-view-element.js';
import '@polymer/iron-image';
import { store } from '../store.js';
import { connect } from 'pwa-helpers/connect-mixin';

import { getVehicles } from '../actions/vehicles.js';

import { myBoxes } from '../initializers/my-boxes.js'

import { SharedStyles } from '../styles/shared-styles.js';

import './search-component.js';
import './my-info-boxes.js';
import './my-vehicles-section.js'

import '../elements/my-section-title.js';
import '../elements/navigate-to-button.js';
import '../elements/ask-us-section.js';
import '../elements/just-a-parallax';
import '../elements/link-for-sections.js';
import '../elements/abonate-section.js';



class MyHome extends connect(store)(PageViewElement) {
    _render(props) {
        return html `
      ${SharedStyles}
      <style>
        :host {
        --section-background-color: #EEEEEE;
        --item-backgound-color: #E0E0E0;
        --easy-lines-color: #BDBDBD;
        --faded-text: #BDBDBD;
        --item-main-color: var(--app-primary-color);
        
        }  


        #desktop-landing[hidden]{
            display: none;
        }

        #desktop-landing{
            margin-top: 2vh;
            min-height: calc(100vh - 200px);
            display: grid;
            grid-gap: 2vw;
            background-image: url('images/landing-page.jpg');
            background-position: center;
            background-attachment: fixed;
            background-repeat: no-repeat;
            background-size: cover;
            padding: 5vh 5vh;
        }

        #desktop-landing div:nth-child(1){
            grid-row: 2/3;
            grid-column: 2/3;            
        }

        .search-wrapper {
            border-radius: 5px;
            padding: 5px;
            background-color: var(--neutral-background-color);
        }

        my-section-title [hidden],
        my-vehicles-section[hidden],
        link-for-section[hidden]{
            display: none;
        }


    @media (max-width: 648px){

      }

    @media (min-width: 649px){

    }

    @media (min-width: 649px) and (max-width: 1024px){
        #desktop-landing{
            grid-template-columns: 1fr 550px 1fr;
            grid-template-rows: 1fr 450px;
        }

    }

    @media (min-width: 1025px){
        #desktop-landing{
            grid-template-columns: 1fr 550px;
            grid-template-rows:  1fr 450px;
        }


    }


      </style>

    <div id="desktop-landing" hidden?="${this.isMobile}">
          <div class="search-wrapper">
              <search-component></search-component>
          </div>
    </div>

    <my-section-title backgroundText="AVANATAJE" mainText="De ce sa ne alegi pe noi"></my-section-title>

    <my-info-boxes infoBoxes="${myBoxes}"></my-info-boxes>

    <my-section-title backgroundText="VARIETATE" mainText="O gama variata de articole verificate"></my-section-title>

    <just-a-parallax paraSrc="images/boxes.jpg" imgSrc="images/ok.png"></just-a-parallax>

    <my-section-title backgroundText="TOATE PIESELE" mainText="Navigheaza catre catalogul de piese"></my-section-title>

    <navigate-to-button buttonText="MERGI LA CATALOG" buttonHref="/contact"></navigate-to-button>

    <ask-us-section></ask-us-section>

    <my-section-title hidden?="${this.isMobile}" backgroundText="NOUTATI AUTOVEHICULE" mainText="Ultimele autovehicule adaugate in lista de dezmembrare"></my-section-title>
   
    <my-vehicles-section hidden?="${this.isMobile}" vehicles="${this.vehicles}"></my-vehicles-section>

    <link-for-section hidden?="${this.isMobile}" linkText="CATALOG VEHICULE" linkHref="/vehicule"></link-for-section>

    <my-section-title backgroundText="DEVINO PARTENER" mainText="Aboneaza-te pentru programul de reduceri si noutati"></my-section-title>

    <abonate-section></abonate-section>
    
    `;
    }


    static get properties() {
        return {
            isMobile: Boolean,
            vehicles: Array
        }
    }

    constructor() {
        super();
        this.isMobile = true;
        this.vehicles = [];
    }

    _firstRendered() {
        store.dispatch(getVehicles());
    }


    _stateChanged(state) {
        this.isMobile = state.app.isWide ? false : true;
        this.vehicles = state.vehicles.data;
    }

}

window.customElements.define('my-home', MyHome);