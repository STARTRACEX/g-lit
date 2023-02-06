import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name, theme } from '../config';
@customElement(name.tag('exp-input'))
export class ExpInput extends LitElement {
  static styles = [theme, css`
    :host{
      display: inline-block;
    }
    .input:focus {
      --input-outline: var(--input-outline-focus) !important;
    }

    div:hover {
      --input-background: var(--input-background-hover) !important;
    }

    .outline fieldset {
      border-color: var(--input-outline);
    }

    .underline::after {
      content: "";
      position: absolute;
      bottom: -.1em;
      width: calc(100% - .5em);
      margin: 0 .25em;
      height: .1em;
      border-radius: inherit;
      background-color: var(--input-outline);
    }

    .underline fieldset {
      border-color: transparent !important;
    }

    .filed {
      background-color: var(--input-background);
      outline: .1em solid var(--input-outline);
    }

    .filed fieldset {
      border-color: transparent !important;
      background-color: transparent !important;
    }

    :focus~fieldset,
    :valid~fieldset {
      border-color: var(--input-outline-focus);
    }

    * {
      border-radius: inherit;
      color: inherit;
      transition: all .3s;
    }

    div:has(span:empty) {
      min-height: 1em !important;
    }

    div {
      position: relative;
      width: 100%;
      min-height: 2em;
      display: inline-flex;
    }

    .input {
      margin-top: .71em;
      border: 0;
      width: 100%;
      box-sizing: border-box;
      padding: .3em;
      font-size: inherit;
      outline: 0;
      resize: vertical;
      min-height: 1.4em;
      height: 1.4em;
      background-color: transparent;
      z-index: 2;
    }

    fieldset {
      background-color: var(--input-background);
      pointer-events: none;
      padding: 0;
      margin: 0;
      position: absolute;
      height: 100%;
      bottom: 0;
      width: inherit;
      margin: -.1em;
      border: .1em solid;
    }

    legend span {
      display: inline-block;
      padding: 0 .3em;
      background-color: var(--input-background);
      font-size: inherit;
    }

    legend {
      margin-left: 5px;
      margin: 0;
      padding: 0;
      transition: all .3s;
      width: 0;
      height: 1em;
      transform: translateY(.8em);
    }

    div:has(span:empty) legend {
      display: none;
    }

    div:has(span:empty) .input {
      margin: 0;
    }

    :focus+fieldset legend,
    :valid+fieldset legend {
      transform: translateY(0) !important;
    }

    .filed legend {
      transform: translateY(.5em) !important;
    }
    .filed span{
      background-color:transparent;
    }

    :focus+fieldset span,
    :valid+fieldset span {
      font-size: 70%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }
  `];
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
    ${this.type !== "textaera" ? html`<input class="input" required title="" value=${this.value || this.def} @input=${this._handleInput} type=${this.type} placeholder=${this.pla} name=${this.name}>` : html`<textarea class="input" required title="" value=${this.value || this.def} @input=${this._handleInput} placeholder=${this.pla} name=${this.name}></textarea>`}
    <fieldset>
      <legend><span>${this.label}</span></legend>
    </fieldset><style>:valid~fieldset legend,:focus~fieldset legend{margin-left: ${this.offset || 0} !important;}</style>
  </div>`;
  }
  firstUpdated() {
    this.value = this.def || "";
  }
  _handleInput(i) {
    this.value = i.target.value;
    this.dispatchEvent(new CustomEvent('input', { detail: this.value }));    
  }
  reset() {
    this.value = this.def || "";
    this._input.value = this.def || null;
  }
  namevalue() {
    return [this.name, this.value];
  }
}
