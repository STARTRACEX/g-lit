import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from '../config';
@customElement(name.tag('exp-input'))
export class ExpInput extends LitElement {
  static styles = css`
  :host{
    --outline: rgb(210, 47, 47);
    --outline-focus: rgb(169, 202, 35);
    --background-hover: rgb(230, 230, 230);
    --background-focus: rgb(235, 235, 235);
    --legend-focus: rgb(39, 123, 234);
    --lengend: rgb(28, 209, 73);
  }
  *{
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  div {
    margin-top: .25em;
    position: relative;
    border-radius: 4px;
    font-size:max(14px, 100%)
  }

  legend {
    padding: 0;
    width: 0;
    max-width: fit-content;
    transform: translateY(.95em);
    transition: all .3s ease-in, background-color .2s ease-out;
    border-radius: inherit;
    color: var(--lengend);
    background-color: none;
  }

  fieldset {
    height: 100%;
    width: 100%;
    position: absolute;
    box-sizing: border-box;
    bottom: 2px;
    right: 0;
    margin: 0;
    padding-top: 0;
    padding-left: .25em;
    padding-bottom: 0;
    border: 1px var(--outline) solid;
    border-radius: inherit;
    pointer-events: none;
    z-index: -1;
    overflow: hidden;
    transition: all .3s ease-out;
    background-color: inherit;
    }

  .input {
    height: 2.1em;
    min-height: 2.1em;
    margin-top: 6px;
    margin-bottom: 2px;
    font-size: inherit;
    width: 100%;
    box-sizing: border-box;
    border: 0;
    outline: none;
    background-color: initial;
    padding: .5em .5em .3em;
    border-radius: inherit;
    color: inherit;
  }

  span {
    display: flex;
    height: 16px;
    align-items: center;
    z-index:3;
    padding:0 .35em
  }
  span:empty{
    padding:0;
  }
  .input:valid~fieldset legend,
  .input:focus~fieldset legend {
    color: var(--legend-focus);
    background-color: var(--background-focus);
    font-size: 60%;
    transform: translateY(-1.5px);
    width: 100%;
    max-width: min-content;
  }

  .input:valid~fieldset,
  .input:focus~fieldset {
    border-color: var(--outline-focus); 
    background-color: var(--background-focus) !important;
  }

  textarea {
    min-height: 2.1em;
    overflow-x: hidden;
    resize: vertical;
  }
  
  .underline fieldset {
    border-color: transparent !important;
  }

  .input:hover~fieldset {
    background-color: var(--background-hover);
  }

  .underline fieldset::after,
  .underline fieldset::before {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 0;
    right: 0;
    margin: auto;
    height: 1.2px;
    max-width: calc(100% - .8em);
  }

  .underline fieldset::after {
    width: 0%;
    background-color: var(--outline-focus);
    transition: all .3s ease-out;
  }

  .underline fieldset::before {
    width: 100%;
    background-color: var(--outline);
  }

  .underline .input:focus~fieldset::after,
  .underline .input:valid~fieldset::after {
    width: 100%;
  }
  .filed{
    width: calc(100% - 1.9px);
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 4px;
  }
  .filed fieldset {
    outline: 1px solid var(--outline);
    border:0;
    background-color: transparent !important;
  }
  .filed .input{
    height: 1.65em;
    min-height: 1.65em;
    margin-bottom:0;
  }
  .filed .input:focus~fieldset,
  .filed .input:valid~fieldset {
    outline: 1px solid var(--outline-focus);
    border:0;
    background-color: transparent !important;
  }
  .filed legend{
      transform: translateY(.5em);
    background-color:transparent !important;
  }
  `;
  @property() label = "";
  @property() name = "";
  @property() id = "";
  @property() pla = "";
  @property() type = "text";
  @property() value = "";
  @property() def = "";
  @property() base = "outline";
  @property() offset = "";
  get _input() {
    return this.renderRoot?.querySelector('input') ?? null;
  }
  render() {
    if (!this.name) this.name = this.label || this.type;
    return html`<div class=${this.base}>
    ${this.type !== "textaera" ? html`<input class="input" required value=${this.value || this.def} @input=${this.input} type=${this.type} placeholder=${this.pla} name=${this.name}>` : html`<textarea class="input" required value=${this.value || this.def} @input=${this.input} placeholder=${this.pla} name=${this.name}></textarea>`}
    <fieldset>
      <legend><span>${this.label}</span></legend>
    </fieldset><style>.input:valid~fieldset legend,.input:focus~fieldset legend{margin-left: ${this.offset || 0} !important;}</style>
  </div>`;
  }

  firstUpdated() {
    this.value = this.def || "";
  }
  input(i) {
    this.value = i.target.value;
  }
  _clear() {
    this._input.value = this.def || null;
  }
  namevalue() {
    return [this.name, this.value];
  }
}
