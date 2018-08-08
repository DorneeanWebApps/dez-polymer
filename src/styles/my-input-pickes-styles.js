import { html } from '@polymer/lit-element';

export const MyInputPickerStyles = html `
    <style>

.input-wrapper{
    height:100%;
    display: grid;           
}

.input-element{
    align-self: center;
    justify-self:center;
    width: 95%;
    height: 80%;
    border: 1px;
    border-style: solid;
    border-color: #BDBDBD;
    border-radius: 3px;
    color: var(--app-secondary-color);
    background-color: #E0E0E0;
    font-size: 1em;
    text-align: center;
    text-align-last:center;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

.input-element::placeholder{
    font-size:  1em;
    font-family: "Nunito", sans-serif;
    color: var(--app-secondary-color);
}

.input-element:hover{
    cursor: pointer;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
}

.input-element:focus{
    outline: none;
}

.input-element[disabled]{
    cursor: auto;
    color: var(app-neutral-color);
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.input-element::placeholder[disabled]{
    color: var(app-neutral-color);
}

`