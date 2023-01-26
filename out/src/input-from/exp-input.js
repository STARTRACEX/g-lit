var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name, theme } from '../config';
let ExpInput = class ExpInput extends LitElement {
    constructor() {
        super(...arguments);
        this.label = "";
        this.name = "";
        this.id = "";
        this.pla = "";
        this.type = "text";
        this.value = "";
        this.def = "";
        this.base = "outline";
        this.offset = "";
    }
    get _input() {
        var _a, _b;
        return (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input')) !== null && _b !== void 0 ? _b : null;
    }
    render() {
        if (!this.name)
            this.name = this.label || this.type;
        return html `<div class=${this.base}>
    ${this.type !== "textaera" ? html `<input class="input" required title="" value=${this.value || this.def} @input=${this.input} type=${this.type} placeholder=${this.pla} name=${this.name}>` : html `<textarea class="input" required title="" value=${this.value || this.def} @input=${this.input} placeholder=${this.pla} name=${this.name}></textarea>`}
    <fieldset>
      <legend><span>${this.label}</span></legend>
    </fieldset><style>:valid~fieldset legend,:focus~fieldset legend{margin-left: ${this.offset || 0} !important;}</style>
  </div>`;
    }
    firstUpdated() {
        this.value = this.def || "";
    }
    input(i) {
        this.value = i.target.value;
    }
    reset() {
        this.value = this.def || "";
        this._input.value = this.def || null;
    }
    namevalue() {
        return [this.name, this.value];
    }
};
ExpInput.styles = [theme, css `
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
__decorate([
    property()
], ExpInput.prototype, "label", void 0);
__decorate([
    property()
], ExpInput.prototype, "name", void 0);
__decorate([
    property()
], ExpInput.prototype, "id", void 0);
__decorate([
    property()
], ExpInput.prototype, "pla", void 0);
__decorate([
    property()
], ExpInput.prototype, "type", void 0);
__decorate([
    property()
], ExpInput.prototype, "value", void 0);
__decorate([
    property()
], ExpInput.prototype, "def", void 0);
__decorate([
    property()
], ExpInput.prototype, "base", void 0);
__decorate([
    property()
], ExpInput.prototype, "offset", void 0);
ExpInput = __decorate([
    customElement(name.tag('exp-input'))
], ExpInput);
export { ExpInput };
