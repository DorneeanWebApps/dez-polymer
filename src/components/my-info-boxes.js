import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat';


import '../elements/my-info-box';

class MyInfoBoxes extends LitElement {
    _render(props, pickerselected) {
            return html `       
    <style>
        .info-boxes-container{
            display: grid;
            grid-gap: 3vw;
            padding:3vw;
            background-color: var(--section-background-color);
        }

        @media (max-width: 649px){
            .info-boxes-container{
                grid-template-columns: 1fr 300px 1fr;
            }
 
        }

        @media (min-width: 649px) and (max-width: 1024px){
            .info-boxes-container{
                grid-template-columns: 1fr 1fr;
            }

            [onlymobile]{
                display:none;
            }
        }          

        @media (min-width: 1025px){
            .info-boxes-container{
                grid-template-columns: 1fr 1fr 1fr 1fr;
            }
            
            [onlymobile]{
                display: none;
            }
        }
        
    </style>
    
    <div class="info-boxes-container">
    ${repeat(props.infoBoxes, (box, index) => html`
        <div onlymobile></div>
        <my-info-box infoIcon="${box.icon}" infoMainText="${box.mainText}" infoSecondaryText="${box.secondaryText}"></my-info-box>
        <div onlymobile></div>
    `)}
    </div>

    `;
    }


    static get properties() {
        return {
            infoBoxes: Array
        }
    }

    constructor() {
        super();
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {}


}

window.customElements.define('my-info-boxes', MyInfoBoxes);