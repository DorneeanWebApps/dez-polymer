import { LitElement, html } from '@polymer/lit-element';

import '@polymer/paper-button/paper-button'

class NavigateToButton extends LitElement {
    _render(props, pickerselected) {
        return html `       
    <style>
        .button-section{
            display: grid;
            height: 10em;
            align-content: center;
            justify-content: center;
            background-color: var(--item-backgound-color);
        }

        .button-wrapper{
            padding: 5px;
            background-color: var(--app-hover-primary-color);  
            border-radius: 5px;
            width: 300px;
            height: 4em;    
        }

        .button-container{
            height: 100%;
            width: 100%;
            border: 1px;
            border-color: white;
            border-style: solid;
            border-radius: 5px;
            text-align: center;
            align-content: center;
            display: grid;
        }

        .button-container > a {
            color: white;
            font-family: "Nunito Sans";
            font-size: 1.3em;
            text-decoration: none;
        }

        .button-container:hover{
            border-color: white;
        }

        .button-container:hover  > a{
            color: white;
            font-weight: 500;
        }

        .button-wrapper:hover{
            background-color: var(--app-primary-color);
        }


    </style>
    
    <div class="button-section">
        <div class="button-wrapper">
            <div class="button-container">
                <a class="button-element" href="${props.buttonHref}">${props.buttonText}</a>        
            </div>
        </div>
    </div>

    `;
    }


    static get properties() {
        return {
            buttonHref: String,
            buttonText: String
        }
    }

    constructor() {
        super();
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {}


}

window.customElements.define('navigate-to-button', NavigateToButton);