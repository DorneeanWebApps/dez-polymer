import { LitElement, html } from '@polymer/lit-element';
import { chevronRight } from '../initializers/my-icons.js';

class LinkForSection extends LitElement {
    _render(props) {
        return html `       
    <style>

    .link-section{
        background-color: var(--app-primary-color);
        height:3em;
        display: grid;
        align-content: center;
        justify-content: end;
        padding: 0 2vw;
    }

    .link-section > a{
        display: grid;
        grid-template-columns: auto auto auto auto;
        text-decoration: none;
        color: white;
        align-content: center;
    }

    .link-section > a > h3{
        font-family: "Nunito Sans";
        font-size: 1.6em;
        margin: 4px;
        padding: 0 2vw;
    }

    .link-icon{
        align-self: center;
        height: 2em;
        width: 2em;
    }

    </style>

    <div class="link-section">
        <a href="${props.linkHref}"><h3>${props.linkText}</h3> <svg class="link-icon">${chevronRight}</svg><svg class="link-icon">${chevronRight}</svg><svg class="link-icon">${chevronRight}</svg></a>
    </div>

    `;
    }


    static get properties() {
        return {
            linkText: String,
            linkHref: String
        }
    }

    constructor() {
        super();
    }

    _firstRendered(props) {}

    _didRender(props, changedProps, prevProps) {}


}

window.customElements.define('link-for-section', LinkForSection);