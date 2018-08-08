import { html } from '@polymer/lit-element';

export const MyDialogStyles = html `
    <style>
    .dialog-container{
            margin:0;
            padding:0;
            height: 100%;
            display: flex;
            flex-direction: column;
            border-radius: 5px;
        }

        .dialog-header{
            flex: 0 0 auto;
            background-color: var(--app-primary-color);
            min-height: 3.5em;
            display:grid;
            align-content: center;
            border-radius: 5px 5px 0 0;
        }

        [with-actions]{
            justify-content: center;
            grid-template-columns: 1fr 50% 1fr;
        }

        .header-actions-text {
            justify-self: center;
        }

        .header-actions{
            display:flex;
            justify-content: center;
            align-content: center;
            height:100%;
            width: 100%;
        }

        .header-actions:hover svg{
            color: white;
            cursor: pointer;
        }

        [header-action-disabled]:hover svg{
            color: var(--app-neutral-color);
            cursor: auto;
        }


        .dialog-header>h2,
        .header-actions{
            margin-left: 10px;
            font-family: "Roboto";
            font-size: 1em;
            color: white;
        }

        .dialog-content{
            padding: 10px;
            flex: 1 0 30%;
            display: grid;
            grid-gap: 10px;
            grid-auto-rows: minmax(2.5em, auto);
            justify-content: center;
            border-top:1px;
            border-top-style: solid;
            border-top-color: var(--app-neutral-color);
            overflow-y: auto;
        }

        [one-column]{
            grid-template-columns: 1fr;
        }

        [two-columns]{
            grid-template-columns: 1fr 1fr;
        }

        .dialog-actions{
            width: 100%;
            height: 3.5em;
            flex: 0 0 auto;
            color: #F06292;
            font-size: 1.1em;
            border-top:1px;
            border-top-style: solid;
            border-top-color: var(--app-neutral-color);
            display: grid;
            align-content: center;
            justify-content: end;
        }

        .cancel-btn {
            font-family:"Roboto";
            width: 50%;
            color: #F06292;
            font-size: 1.1em;
        }

        .cancel-btn:hover {
            width: 50%;
            font-weight: 500;
            color: #E91E63;
        }

        .picker-field{
            width:calc(100% - 2em);
            font-size: 1.2em;
            font-family: "Roboto";
            padding: 10px 1em;
            border-bottom: 1px;
            border-bottom-style: solid;
            border-bottom-color: var(--app-neutral-color);
        }
    </style>
`

export const MyDialogSelectValuesButton = html `
    <style>
        paper-button.select-button {
            align-self: center;
            justify-self:center;
            width: 90%;
            font-size: 1.2em;
            height: 90%;
            border: 1px;
            border-style: solid;
            border-color: #BDBDBD;
            border-radius: 3px;
            color: var(--app-secondary-color);
            background-color: #E0E0E0;
            text-align: center;
            text-align-last:center;
            box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            transition: all 0.3s cubic-bezier(.25,.8,.25,1);
        }

        paper-button.select-button:hover {
            cursor: pointer;
            background-color: var(--app-faded-primary-color);
            color: black;
            box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
        }

        paper-button[selected]{
            background-color: var(--app-hover-primary-color);
            color: #E0E0E0;
        }
    </style>
`