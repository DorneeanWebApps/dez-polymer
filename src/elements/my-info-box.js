import { LitElement, html } from '@polymer/lit-element';

import { infoIconStyle } from '../styles/my-icons-styles.js';

class MyInfoBox extends LitElement {
    _render(props, pickerselected) {
        return html `       
        ${infoIconStyle}
    <style>
        
        .info-box{
            display: flex;
            flex-direction: column;
            box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
        }  

        .icon-container{
            flex: 1 0 auto;
            color: var(--item-main-color);
            display: grid;
            align-content: center;
            justify-content: center;
        }

        .info-box-text{
            height: 4em;
            flex: 0 0 auto;
            display: grid;
            align-content: end;
            text-align: center;
            padding-bottom: 1em;
        }

        .info-box-text > h3{
            margin: 0;
            padding:0;
            color: var(--app-secondary-color);
            font-family: "Nunito Sans";
            font-size: 1.2em;
            margin-bottom: -10px;
        }

        .info-box-text > h5{
            margin: 0;
            padding:0;
            color: var(--app-hover-text-color);
            font-family: "Nunito Sans";
            font-size:1em;
        }

    </style>
    
    <div class="info-box">
        <div class="icon-container">
            <svg class="info-icon-big">${this.infoIcon}</svg>
        </div>
        <div class="info-box-text">
            <h3>${this.infoMainText}</h3>
            <h5>${this.infoSecondaryText}</h5>
        </div>
    </div>

    `;
    }


    static get properties() {
        return {
            infoIcon: String,
            infoMainText: String,
            infoSecondaryText: String
        }
    }

    constructor() {
        super();
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {}


}

window.customElements.define('my-info-box', MyInfoBox);