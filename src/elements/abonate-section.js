import { LitElement, html } from '@polymer/lit-element';

import '@polymer/paper-button/paper-button'

class AbonateSection extends LitElement {
    _render(props, pickerselected) {
        return html `       
    <style>
        .section-wrapper{
            height: 450px;
            background-color: var(--app-secondary-color);
            display: grid;
            align-content: center;
            justify-content: center;
        }

        .abonate-container{
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

        .abonate-container > h2, h3{
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
        <div class="abonate-container">
            <h2>DORESTI SA BENEFICIEZI DE BENEFICIILE ACORDATE PARTENERILOR</h2>
            <h3>apasa link-ul de mai jos pentru a te inscrie</h3>
            <div class="go-to-form-wrapper">
                <div class="go-to-form-container">
                    <a href="/contact">COMPLETEAZA FORMULARUL DE INSCRIERE</a>
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

window.customElements.define('abonate-section', AbonateSection);