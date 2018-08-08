import { LitElement, html } from '@polymer/lit-element';

import { MyInputPickerStyles } from '../styles/my-input-pickes-styles.js'

class MySectionTitle extends LitElement {
    _render(props, pickerselected) {
        return html `       
        
    <style>
        .info-title{
            display: grid;
            align-content: center;
            justify-content: center;
            padding: 3vh 0 5vh 0;
        }

        .background-text{
            text-align: center;
            width: 100%;
            bottom: 10px;
            color: var(--faded-text);
            font-family: "Nunito Sans";
            font-size: 2em;
            margin-bottom: -25px;
        }

        .title-container{
            width: 100%;
            height:100%;
        }

        .title-container > h2{
            text-align: center;
            font-family:"Pacifico";
            font-size: 1.7em;
            font-weight: 400;
            margin:0;
        }
    </style>
    
    <div class="info-title">
            <div class="title-container">
                <h3 class="background-text">${props.backgroundText}</h3>
                <h2>${props.mainText}</h2>
            </div>
     </div>

    `;
    }


    static get properties() {
        return {
            backgroundText: String,
            mainText: String
        }
    }

    constructor() {
        super();
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {}


}

window.customElements.define('my-section-title', MySectionTitle);