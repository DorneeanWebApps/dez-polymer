import { html } from '@polymer/lit-element';


export const ButtonIconPrimary = html `<style>
.button-icon-primary {
    width: 24px;
    height: 24px;
    padding: 8px;
}

.button-icon-primary:hover{
    border-bottom: 3px;
     border-bottom-style: solid;
     border-bottom-color: var(--app-primary-color);
     color: var(--app-primary-color);
     cursor:pointer;
}

[selected],
[selected]:hover{

     border-bottom: 3px;
     border-bottom-style: solid;
     border-bottom-color: var(--app-hover-primary-color);
     color: var(--app-hover-primary-color);
     box-shadow: 2px 2px 2px 2px rgba(0,0,0,.15);
     cursor: auto;
}


</style>`;

export const AppDrawerIcon = html `
    <style>
    .app-drawer-icon {
        width: 1.1em;
        height: 1.1em;
        margin-bottom: -3px;    
    }
    </style>
`

export const titleIconStyle = html `<style>svg{
    width: 25px;
    height: 25px;
    margin-bottom: -4px;
}</style>`

export const DialogTitleIcon = html `<style>
    svg{
        height: 1.5em;
        width: 1.5em;
        color: var(--app-neutral-color);
        align-self: center;
    }
</style>`

export const infoIconStyle = html `<style>
    .info-icon-big{
        max-height: 120px;
        max-width: 120px;
    }
</style>`