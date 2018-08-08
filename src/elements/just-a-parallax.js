import { LitElement, html } from '@polymer/lit-element';

import '@polymer/paper-button/paper-button'

class JustAParallax extends LitElement {
    _render(props, pickerselected) {
        return html `       
    <style>
        .section-wrapper{
            height: 450px;
            background-attachment: fixed;
            background-size: cover;
            background-position: center;
            position: relative;
        }

        .ok-stamp-container{
            position: absolute;
        }

        .ok-stamp{
            max-width:100%;
            max-height: auto;
        }

        @media (max-width: 648px){
            .ok-stamp-container{
                right: 5vw;
                bottom: 5vw;
                width: 50vw;
            }
        }

        @media (min-width: 649px){
            .ok-stamp-container{
                right: 2vw;
                bottom: 2vw;
                width: 40vw;
            }
        }

    </style>

    <div class="section-wrapper" style="background-image: url('${props.paraSrc}')">
        <div class="ok-stamp-container">
            <img class="ok-stamp" src="${props.imgSrc}">
        </div>
    </div>
    `;
    }


    static get properties() {
        return {
            paraSrc: String,
            imgSrc: String
        }
    }

    constructor() {
        super();
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {}


}

window.customElements.define('just-a-parallax', JustAParallax);