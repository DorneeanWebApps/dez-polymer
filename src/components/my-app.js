/**
@license
Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

import { LitElement, html } from '@polymer/lit-element';
import { repeat } from 'lit-html/lib/repeat';

import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings';
import { connect } from 'pwa-helpers/connect-mixin';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query';
import { installOfflineWatcher } from 'pwa-helpers/network';
import { installRouter } from 'pwa-helpers/router';
import { updateMetadata } from 'pwa-helpers/metadata';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import {
    navigate,
    updateOffline,
    updateDrawerState,
    updateLayout
} from '../actions/app.js';

import {
    loadAppElls
} from '../actions/app-ells.js';



// These are the elements needed by this element.
import '@polymer/app-layout/app-drawer/app-drawer';
import '@polymer/app-layout/app-header/app-header';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall';
import '@polymer/app-layout/app-scroll-effects/effects/fade-background';
import '@polymer/app-layout/app-scroll-effects/effects/parallax-background';
import '@polymer/app-layout/app-toolbar/app-toolbar';


import { menuIcon } from '../initializers/my-icons.js';
import { AppDrawerIcon } from '../styles/my-icons-styles.js';
import '@polymer/iron-image';

import './snack-bar.js';

import { desktopMenu, mobileMenu } from '../initializers/app-vars.js';


class MyApp extends connect(store)(LitElement) {
        _render({ appTitle, _page, _drawerOpened, _snackbarOpened, _offline }) {
                // Anything that's related to rendering should be done in here.
                return html `
        ${AppDrawerIcon}
    <style>
      :host {
        --app-drawer-width: 80%;
        display: block;

        --app-primary-color: #F57C00;
        --app-hover-primary-color: #FF9800;
        --app-faded-primary-color: #FFB74D;
        --app-secondary-color: #293237;
        --app-dark-text-color: var(--app-secondary-color);
        --app-hover-text-color: #616161;
        --app-neutral-color: #BDBDBD;
        --app-light-text-color: white;
        --app-section-even-color: #f7f7f7;
        --app-section-odd-color: white;
        --app-disabled-color:#EEEEEE

        --app-header-background-color: white;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --app-drawer-background-color: #F5F5F5;
        --neutral-background-color: #E0E0E0;
        --app-drawer-text-color: var(--app-dark-text-color);
        --app-drawer-selected-color: #78909C;
      }

      app-drawer{
        z-index:201;
      }

      .main-app-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 230px;
        text-align: center;
        background-color: darkgrey;
        color: var(--app-header-text-color);
        border-bottom: 1px solid #eee;
        z-index: 200;
        --app-header-background-front-layer: {
          background-image: url('/images/banner-bg.jpg');
        };
        --app-header-background-rear-layer: {
          background-color: var(--app-secondary-color);;
        };
      }

      .toolbar-top {
        background-color: var(--app-secondary-color);
      }

      [main-title] {
        font-family: 'Pacifico';
        text-transform: lowercase;
        font-size: 30px;
        padding-right: 44px;
      }

      .href-image{
        height: 90%;
        margin-left: auto; 
        margin-right: 1vh;
      }

      .logo-image{
        max-height:100%;
        width: auto;
        margin-left: auto;
        margin-right:auto;
      }

      .toolbar-list {
        display: none;
      }

      .toolbar-list > a {
        font-family: 'Open Sans Condensed', sans-serif;
        font-size: 1.4em;
        display: inline-block;
        color: var(--app-neutral-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
      }

      .toolbar-list > a:hover{
        color: var(--app-light-text-color);
      }

      .toolbar-list > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-light-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
        position: absolute;
        color: white;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 10px 3px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        font-family:"Roboto";
        font-size: 1.2em;
        font-weight: 400;
        color: var(--app-drawer-selected-color);
        line-height: 50px;
        padding: 0 15px;
        margin: 2px 0;
        border-bottom: 1px;
        border-bottom-style: solid;
        border-bottom-color: var(--app-neutral-color);
        border-radius: 4px;
        outline: none;
      }

      .drawer-list > a[selected] {
        outline: none;
        color: black;
        background-color: var(--neutral-background-color);
      }

      .drawer-image {
        width: 100%;
        height: 20vh;
        background-color: var(--app-drawer-background-color);
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .main-content {
        padding-top: 200px;
        min-height: calc(100vh - 200px);
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        display: block;
        padding: 24px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout. */
      @media (max-width: 1024px) and (min-width: 648px){

        .main-app-header {
          height:150px;
        }

        .href-image{
          width: 40vw;
        }
                
        .toolbar-list > a{
          padding: 4px 5px;
          font-size: 1.1em;
        }
      }


      @media (min-width: 648px) {

        .main-app-header {
          height: auto;
        }

        .toolbar-top{
          height: 95px;
          padding: 10px;
        }


        .toolbar-list {
          margin-left: auto;
          margin-right: 2vw;
          margin-top: auto;
          margin-bottom: 1vh;
          display: block;
        }

        .menu-btn {
          display: none;
        }

        .href-image{
          width: auto;
          height: 90%;
          margin-left: 3vw;
        }

        .logo-image{
          width:auto;
          height:90%;
          margin: auto;
        }

        .main-content {
          padding-top:95px;
        }

        /* The drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }
      }
    </style>

    <!-- Header -->
    <app-header class="main-app-header" fixed condenses effects="parallax-background fade-background">
      <app-toolbar sticky class="toolbar-top">
        <button class="menu-btn" title="Menu" on-click="${_ => store.dispatch(updateDrawerState(true))}">${menuIcon}</button>
        <a class= "href-image" onclick="${_page === 'acasa'}" href="/acasa"><img class= "logo-image" src="/images/logo.png"></a>

        <nav class="toolbar-list">
        ${repeat(desktopMenu, obj => html`
          <a selected?="${_page === obj.page}" href="${obj.href}">${obj.text}</a>
        `)}
      </nav>
      </app-toolbar>

      <!-- This gets hidden on a small screen-->
      
     
    </app-header>

    <!-- Drawer content -->
    <app-drawer opened="${_drawerOpened}"
        on-opened-changed="${e => store.dispatch(updateDrawerState(e.target.opened))}">
        <iron-image class="drawer-image" sizing="cover" src="/images/spare-parts.jpg"></iron-image>

      <nav class="drawer-list">
        ${repeat(mobileMenu, obj => html`
          <a selected?="${_page === obj.page}" href="${obj.href}"><svg class="app-drawer-icon">${obj.icon}</svg>&nbsp;&nbsp;${obj.text}</a>
        `)}

      </nav>
    </app-drawer>
    
    <!-- Main content -->
    <main role="main" class="main-content">
      
      <my-home class="page" active?="${_page === 'acasa'}"></my-home>
      <my-search class="page" active?="${_page === 'cautare'}"></my-search>
      <my-vehicles class="page" active?="${_page === 'vehicule'}"></my-vehicles>
      <my-parts class="page" active?="${_page === 'piese'}"></my-parts>
      <my-catalog class="page" active?="${_page === 'catalog'}"></my-catalog>
      <my-contact class="page" active?="${_page === 'contact'}"></my-contact>
      <my-view404 class="page" active?="${_page === 'view404'}"></my-view404>
    </main>

    <footer>
      <p>Made with &hearts; by the Polymer team.</p>
    </footer>

    <snack-bar active?="${_snackbarOpened}">
        You are now ${_offline ? 'offline' : 'online'}.</snack-bar>
    `;
    }

    static get properties() {
        return {
            appTitle: String,
            _page: String,
            _drawerOpened: Boolean,
            _snackbarOpened: Boolean,
            _offline: Boolean
        }
    }

    constructor() {
        super();
        // To force all event listeners for gestures to be passive.
        // See https://www.polymer-project.org/3.0/docs/devguide/settings#setting-passive-touch-gestures
        setPassiveTouchGestures(true);

    }

    _firstRendered() {
        installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
        installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
        installMediaQueryWatcher(`(min-width: 648px)`,
            (matches) => store.dispatch(updateLayout(matches)));
        store.dispatch(loadAppElls());
    }

    _didRender(properties, changeList) {
        if ('_page' in changeList) {
            const pageTitle = properties.appTitle + ' - ' + changeList._page;
            updateMetadata({
                title: pageTitle,
                description: pageTitle
                    // This object also takes an image property, that points to an img src.acasa
            });
        }
    }

    _stateChanged(state) {
        this._page = state.app.page;
        this._offline = state.app.offline;
        this._snackbarOpened = state.app.snackbarOpened;
        this._drawerOpened = state.app.drawerOpened;
    }



}

window.customElements.define('my-app', MyApp);