var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let LabelInput = class LabelInput extends LitElement {
    constructor() {
        var _a, _b, _c;
        super(...arguments);
        this.type = "text";
        this.label = "";
        this.def = "";
        this.pla = "";
        this.name = (_a = this.type) !== null && _a !== void 0 ? _a : "";
        this.id = (_b = this.label) !== null && _b !== void 0 ? _b : "";
        this.value = (_c = this.def) !== null && _c !== void 0 ? _c : "";
    }
    get _input() {
        var _a, _b;
        return (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input')) !== null && _b !== void 0 ? _b : null;
    }
    render() {
        return html `
    ${this.label && html `<label for=${this.id}>${this.label}</label>`}
      
      <input
      value=${this.value || this.def}
      @input=${this.handleinput}
      id=${this.id} 
      type=${this.type} 
      placeholder=${this.pla}
      name=${this.name} />
    `;
    }
    handleinput(i) {
        this.value = i.target.value;
    }
    clear() {
        this._input.value = this.def;
    }
    namevalue() {
        return [this.name, this.value];
    }
};
LabelInput.styles = css `
  :host {
    width: 100%;
    display: flex;
    justify-content: space-between;
    }
  @media screen and (max-width:500px) {
    :host {
      justify-content: flex-start;
      flex-direction: column;
    }
  }
  `;
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
    customElement('label-input')
], LabelInput);
export { LabelInput };
