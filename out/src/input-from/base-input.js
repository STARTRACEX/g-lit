var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name, theme } from '../config';
let BaseInput = class BaseInput extends LitElement {
    constructor() {
        super();
        this.label = '';
        this.name = '';
        this.pla = '';
        this.type = 'text';
        this.value = '';
        this.def = '';
        this.min = 0;
        this.max = 100;
        this.step = 1;
        this.type = "text";
        this.min = 0;
        this.max = 100;
        this.step = 1;
    }
    get _input() {
        return this.shadowRoot.querySelector('input');
    }
    get _ranged() {
        return this.shadowRoot.querySelector('.range i');
    }
    render() {
        if (!this.name)
            this.name = this.label || this.type;
        return html `<slot name="pre"></slot>
      <slot></slot>
      <div class=${this.type}>
        ${this._typeSwitcher()}
      </div>
      <slot name="suf"></slot>`;
    }
    firstUpdated() {
        this.addEventListener('click', this._handelFocus);
        [...this.children].forEach((e) => {
            e.style.display = "";
        });
        if (!this.value)
            this.value = this.def;
        if (this.type === "range")
            this._ranged.style.width = 100 * (this.value / (this.max - this.min)) + '%';
    }
    _handleRange(e) {
        this.value = e.target.value;
        this._ranged.style.width = 100 * e.target.value / (this.max - this.min) + '%';
        this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
    }
    _handleInput(e) {
        this.value = e.target.value;
        this.dispatchEvent(new CustomEvent('input', { detail: this.value }));
    }
    _handelFocus() {
        this._input.focus();
        if (this.type === "file")
            this._input.click();
    }
    reset() {
        if (this.type === "range") {
            this._input.value = (this.def || (this.max - this.min) / 2).toString();
            this.value = this.def || (this.max - this.min) / 2;
            this._ranged.style.width = 100 * (this.value / (this.max - this.min)) + '%';
        }
        else {
            this._input.value = this.def.toString() || "";
            this.value = this.def || "";
        }
    }
    _typeSwitcher() {
        switch (this.type) {
            case "range":
                return html `<input type="range" @input=${this._handleRange} min=${this.min} max=${this.max} step=${this.step} value=${this.value} ><i></i>`;
            default:
                return html `<input class="input" type=${this.type} name=${this.name} placeholder=${this.pla} value=${this.value} @input=${this._handleInput} />`;
        }
    }
    namevalue() {
        return [this.name, this.value];
    }
};
BaseInput.styles = [theme, css `
  :host{
    display: inline-flex;
    align-items: baseline;
    background-color: transparent;
    border-radius: .2em;
    outline:1px solid transparent;
  }
  :host(:focus){
    outline: 1px solid var(--input-outline);
  }
  *{
    border-radius: inherit;
    cursor: inherit;
    font-family: inherit;
  }
  .input[type="color"] {
    padding: 0;
    height: 100% !important;
  }
  .input[type="file"]{
    display: none;
  }
  .input {
    box-sizing: border-box;
    height:1.4em;
    width: 100%;
    font-size: 1em;
    outline: 0;
    border: 0;
    margin: 0;
    border: none;
    color: inherit;
    background: transparent;
    padding: 0 .25em;
    border-radius: .25em;
  }
  .range{
    width: 100%;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 .5px .1em var(--shadow);
    background-color:var(--input-false);
  }
  .range input~i {
    position: absolute;
    left: 0;
    width: 50%;
    pointer-events: none ;
    background-color: var(--input-true);
    height: calc(.5em - 1.1px);
  }
  .range input {
    margin: 0px -0.5em;
    width: calc(100% + 0.5em);
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    background-color: transparent;
  }
  .range input::-webkit-slider-runnable-track {
    height: .5em;
  }
  .range input::-webkit-slider-thumb {
    z-index: 1;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    height: 1em;
    width: 1em;
    margin-top: -0.25em;
    background-color: var(--input-control);
    border-radius: 50%;
    border: solid 0.125em rgba(0, 221, 255, 0.5);
    box-shadow: 0 .1em .1em var(--shadow);
  }`];
__decorate([
    property()
], BaseInput.prototype, "label", void 0);
__decorate([
    property()
], BaseInput.prototype, "name", void 0);
__decorate([
    property()
], BaseInput.prototype, "pla", void 0);
__decorate([
    property()
], BaseInput.prototype, "type", void 0);
__decorate([
    property()
], BaseInput.prototype, "value", void 0);
__decorate([
    property()
], BaseInput.prototype, "def", void 0);
__decorate([
    property({ type: Number })
], BaseInput.prototype, "min", void 0);
__decorate([
    property({ type: Number })
], BaseInput.prototype, "max", void 0);
__decorate([
    property({ type: Number })
], BaseInput.prototype, "step", void 0);
BaseInput = __decorate([
    customElement(name.tag('base-input'))
], BaseInput);
export { BaseInput };
