var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config";
let BaseButton = class BaseButton extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.checked = false;
        this.fat = false;
        this.def = "";
        this.name = "checkbox";
        this.value = "on";
    }
    get _input() {
        var _a, _b;
        return (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector('input')) !== null && _b !== void 0 ? _b : null;
    }
    render() {
        return html `<span class=${this.fat ? "fat" : "rect"}>
    <input @change=${this.changecheck} ?disabled=${this.disabled} ?checked=${this.checked} name=${this.name} value=${this.value} type="checkbox">
    <aside>
      <div class="false"><slot name="false"></slot></div>
      <div class="always"><slot></slot><slot name="always"></slot></div>
      <div class="true"><slot name="true"></slot></div>
    </aside></span>`;
    }
    firstUpdated() {
        if (this.checked !== true)
            try {
                this.checked = JSON.parse(this.def);
            }
            catch {
                this.checked = false;
            }
    }
    reset() {
        try {
            this.checked = JSON.parse(this.def);
        }
        catch {
            this.checked = false;
        }
        this._input.checked = this.checked;
    }
    changecheck(e) {
        this.checked = e.target.checked;
    }
    namevalue() {
        if (this._input.checked)
            return [this.name, this.value];
        return [undefined, undefined];
    }
};
BaseButton.styles = css `:host,span {
      display: inline-flex;
      font-size: inherit;
      position: relative;
      align-items: center;
      border-radius: inherit;
    }

    input {
      margin: 0;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      font-size: inherit;
      width: 3em;
      height: 1.5em;
      background: #ccc;
      border-radius: inherit;
      transition: all .3s;
    }

    aside {
      pointer-events: none;
      transition: .3s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      font-size: inherit;
      overflow: hidden;
      border-radius: inherit;
    }

    aside div {
      height: 100%;
    }

    input[disabled]~aside{
      filter:brightness(.87) ;
    }

    .rect .always {
      display: none;
    }

    .always {
      position: absolute;
    }

    .rect aside {
      height: 100%;
      width: 100%;
      left: 0;
    }

    .rect .true,
    .rect .false {
      width: 50%;
      text-align: center;
      transition: all .3s;
    }

    .rect input:checked~aside .true,
    .rect .false {
      background-color: #4aafdf;
    }

    .rect input:checked~aside .false,
    .rect .true {
      background-color: #ccc;
    }

    .fat aside {
      width: 1.26em;
      height: 1.26em;
      border-radius: 50%;
      background: #fafafa;
      transition: .3s;
      left: .12em;
      top: .12em;
      bottom: .12em;
    }

    .fat {
      border-radius: 0.75em;
    }

    .fat input:checked {
      background: #4AAFDF;
    }

    .fat input:checked~aside {
      left: calc(100% - .12em - 1.26em);
      right: 0.12em;
    }

    .fat input:checked~aside .true,
    .fat .false {
      display: block;
    }

    .fat input:checked~aside .false,
    .fat .true {
      display: none;
    }`;
__decorate([
    property({ type: Boolean })
], BaseButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], BaseButton.prototype, "checked", void 0);
__decorate([
    property({ type: Boolean })
], BaseButton.prototype, "fat", void 0);
__decorate([
    property()
], BaseButton.prototype, "def", void 0);
__decorate([
    property()
], BaseButton.prototype, "name", void 0);
__decorate([
    property()
], BaseButton.prototype, "value", void 0);
BaseButton = __decorate([
    customElement(name.tag("switch-item"))
], BaseButton);
export { BaseButton };
