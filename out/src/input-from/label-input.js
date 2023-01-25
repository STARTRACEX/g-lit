var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from '../config';
let LabelInput = class LabelInput extends LitElement {
    constructor() {
        super(...arguments);
        this.type = "text";
        this.label = "";
        this.def = "";
        this.pla = "";
        this.name = "";
        this.id = "";
        this.value = "";
    }
    get _input() {
        var _a, _b;
        return (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input')) !== null && _b !== void 0 ? _b : null;
    }
    render() {
        if (!this.name)
            this.name = this.label || this.type;
        return html `<label for=${this.id || this.label}>
      <span>${this.label}</span>
      <fieldset>
        <input value=${this.value || this.def} @input=${this.input} id=${this.id || this.label} type=${this.type} placeholder=${this.pla} name=${this.name} class=${this.type} />
        ${this.type !== "password" ? "" : html `<i><svg @click=${this.passwordtype} viewBox="0 0 48 48" fill="none"><path d="M9.85786 18C6.23858 21 4 24 4 24C4 24 12.9543 36 24 36C25.3699 36 26.7076 35.8154 28 35.4921M20.0318 12.5C21.3144 12.1816 22.6414 12 24 12C35.0457 12 44 24 44 24C44 24 41.7614 27 38.1421 30" stroke="#ebebeb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M20.3142 20.6211C19.4981 21.5109 19 22.6972 19 23.9998C19 26.7612 21.2386 28.9998 24 28.9998C25.3627 28.9998 26.5981 28.4546 27.5 27.5705" stroke="#ebebeb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 42L6 6" stroke="#ebebeb" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></i>`}
      </fieldset>
    </label>`;
    }
    firstUpdated() {
        this.value = this.def || "";
    }
    input(i) {
        this.value = i.target.value;
    }
    clear() {
        this._input.value = this.def || null;
    }
    namevalue() {
        return [this.name, this.value];
    }
    passwordtype() {
        if (this._input.type === "password") {
            this._input.type = "text";
        }
        else {
            this._input.type = "password";
        }
    }
};
LabelInput.styles = css `
  :host{
    background-color: inherit;
    margin:.25em;
  }
  label {
    margin: auto;
    box-sizing: border-box;
    height: fit-content;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 2.4px;
  }
  span {
    margin-right: .15em;
  }
  input {
    width:100%;
    background-color: transparent;
    font-size: 102.5%;
    line-height: 1.2em;
    padding: 4.8px;
    padding-left: 7.5px;
    border: 0;
    border-radius: 4px;
    outline: 0;
  }
  fieldset:has(input:focus) {
    outline: 1.2px solid rgb(7 200 234 / 56%);
  }
  @media screen and (max-width:540px) {
    label {
      justify-content: flex-start;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  i {
    display: inline-flex;
    align-items: center;
    width:1em;
  }
  svg{
    margin-right: 3px;
    height:1em;
    width:1em;
  }
  fieldset {
    background-color: rgb(68 68 68 / 21%);
    display: flex;
    padding: 0;
    border-radius: 4px;
    outline: none;
    border: 0;
    /* width: 100%; */
    margin: 0;
  }
  .password{
    margin-right:-1em
  }`;
__decorate([
    property()
], LabelInput.prototype, "type", void 0);
__decorate([
    property()
], LabelInput.prototype, "label", void 0);
__decorate([
    property()
], LabelInput.prototype, "def", void 0);
__decorate([
    property()
], LabelInput.prototype, "pla", void 0);
__decorate([
    property()
], LabelInput.prototype, "name", void 0);
__decorate([
    property()
], LabelInput.prototype, "id", void 0);
__decorate([
    property()
], LabelInput.prototype, "value", void 0);
LabelInput = __decorate([
    customElement(name.tag('label-input'))
], LabelInput);
export { LabelInput };
