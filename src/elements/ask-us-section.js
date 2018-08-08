import { LitElement, html } from '@polymer/lit-element';

import '@polymer/paper-button/paper-button'

class AskUsSection extends LitElement {
    _render(props, pickerselected) {
        return html `       
    <style>
        .section-wrapper{
            height: 450px;
            background-image: url('images/motor.jpg');
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
            display: grid;
            align-content: center;
            justify-content: center;
        }

        .ask-us-container{
            height: 250px;
            width: 60vw;
            min-width: 330px;
            background-color: var(--app-primary-color);
            text-align: center;
            padding: auto;
            display: flex;
            flex-direction: column;
            border-radius: 5px;
        }

        .ask-us-container > h2, h3{
            font-family: "Nunito Sans", sans-serif;
            color: white;
            margin: 10px;
            flex: 0 0 auto;
        }

        .go-to-form-wrapper{
            flex: 1 0 auto;
            display: grid;
            align-content: center;
            justify-content: center;          
        }

        .go-to-form-container{
            border: 1px;
            border-style: solid;
            border-color: white;
            border-radius: 5px;
            height: 4em;
            width: 40vw;
            min-width: 300px;
            display: grid;
            align-content: center;
            justify-content: center;
            padding: 5px 3vw;
        }

        .go-to-form-container > a{
            width: 100%;
            text-align: center;
            color: white;
            font-family: "Nunito Sans", sans-serif;
            font-size: 1.3em;
            text-decoration: none;
        }

    </style>

    <div class="section-wrapper">
        <div class="ask-us-container">
            <h2>NU GASESTI ARTICOLUL PE CARE IL CAUTI?</h2>
            <h3>Nu ezita sa ne contactezi la telefon 07298886655 sau</h3>
            <div class="go-to-form-wrapper">
                <div class="go-to-form-container">
                    <a href="/cerere-piesa">COMPLETEAZA FORMULARUL DE ASISTENTA</a>
                </div>
            </div>
        </div>
    </div>
    `;
    }


    static get properties() {
        return {

        }
    }

    constructor() {
        super();
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {}


}

window.customElements.define('ask-us-section', AskUsSection);