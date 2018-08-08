import { LitElement, html } from '@polymer/lit-element';
import '@polymer/iron-image/iron-image.js'

class VehicleCardSmall extends LitElement {
    _render(props, pickerselected) {
        return html `       
    <style>
    .vehicle-card{
        max-height: inherit;
        display: flex;
        flex-direction: column;
        padding: 0 2vw;
        overflow-x: auto;
    }

    .vehicle-name{
        flex: 0 0 2em;
        display: grid;
        align-content:center;
    }

    .vehicle-name > h2{
        color:#9E9E9E;
        font-family: 'Nunito Sans', sans-serif;
        font-weight: 400;
        font-size: 1.2em;
        margin: 0;
    }

    .vehicle-data{
        flex: 0 0 3em;
        display:grid;
        align-content: center;
    }

    .vehicle-data > p{
        margin: 0 0;
        font-size: .8em;
        font-weight: 300;
        color:#9E9E9E;
        font-family: 'Nunito Sans', sans-serif;
    }

.vehicle-picture-wrapper{
    flex: 0 0 180px; 
    margin-top: 10px;
    width: 100%;
    height: 180px;
    padding: 5px;
    background-color: lightgrey;
}

.vehicle-picture-container{
     width: 100%;
     height: 100%;
     display: flex;
    align-items: center;
    justify-content: center;
}

.vehicle-picture{
     max-width: 100%;
     max-height: 100%;
     top: 0;
     left: 0;
     bottom: 0;
     right: 0;
     justify-self: center;
     margin: auto;
}

.vehicle-description{
    flex: 1 0 auto;
    overflow-x: auto;
}

    @media (min-width: 1025px) and (max-width: 1300px){
        .vehicle-name > h2{
            font-size: 1em;
        }
    }

    </style>

        <div class="vehicle-card">         
            <div class="vehicle-name">
                        <h2>${props.vehicle.marca}&nbsp;${props.vehicle.model}&nbsp;${props.vehicle.tip}</h2>
                    </div>
                    <div class="vehicle-data">
                        <p>fabricat in ${props.vehicle.fabricatie} rulaj ${props.vehicle.km} km</p>
                    </div>
                    <div class="vehicle-picture-wrapper">
                        <div class="vehicle-picture-container">
                            <img class="vehicle-picture" src="${props.vehicle.mainpicturefullpath}"/>
                        </div>
                    </div>
                    <div class="vehicle-description vehicle-data">
                        <p>
                            ${props.vehicle.descriere}
                        </p>
                </div>
        </div>
    `;
    }


    static get properties() {
        return {
            vehicle: Object
        }
    }

    constructor() {
        super();
        this.vehicle = {};
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {}


}

window.customElements.define('vehicle-card-small', VehicleCardSmall);