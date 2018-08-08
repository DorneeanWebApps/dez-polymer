import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat';
import { organizeVehicle } from '../functions/init-vehicle.js'

import '../elements/vehicle-card-small.js'

class MyVehiclesSection extends LitElement {
    _render(props) {
            return html `       
    <style>
    .vehicles-section{
        background-color: var(--app-secondary-color);
        padding: 2em 0;
        display: grid;
    }

    .vehicle-card{
        border-right: 1px;
        border-right-style: solid;
        border-color: white;
    }

    .vehicles-section div:last-child{
        border-right:0;
    }

    @media (min-width: 649px) and (max-width: 1024px){
        .vehicles-section{
            grid-template-columns: 1fr 1fr 1fr;
        }

        .vehicles-section > div:nth-child(3) ~ div {
        display: none;
        }
    }

    @media (min-width: 1025px){
        .vehicles-section{
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        }
    }



    </style>
    <div class="vehicles-section">
    ${repeat(props.vehicles, (vehicle) => html`
        <div class="vehicle-card">
            <vehicle-card-small vehicle="${vehicle}"></vehicle-card-small>
        </div>
    `)}
    </div>

    `;
    }


    static get properties() {
        return {
            vehicles: Array,
        }
    }

    constructor() {
        super();
        this.vehicles=[];
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {
        if (this.vehicles.length > 0) {
            this.vehicles.map(vehicle => organizeVehicle(vehicle));
        };
    }


}

window.customElements.define('my-vehicles-section', MyVehiclesSection);