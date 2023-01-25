var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from '../config';
let DivierLine = class DivierLine extends LitElement {
    constructor() {
        super(...arguments);
        this.Before = "auto";
        this.After = "auto";
        this.v = false;
        this.b = "2.2";
    }
    render() {
        var hrstyle = `.before{height:${this.b};max-width:${this.Before}}.after{height:${this.b};max-width:${this.After}}.v .before{width:${this.b};max-height:${this.Before}}.v .after{width:${this.b};max-height:${this.After}}`;
        return html `<div class=${this.v ? "v" : ""}>
    <style>${hrstyle}</style>
      <hr class="before"/>
      <slot></slot>
      <hr class="after"/>
    </div>`;
    }
};
DivierLine.styles = css `
    div {
      display: flex;
      align-items: center;
    }
    hr {
      margin: 0;
      border-radius: .1em;
      border: 0;
      flex: 1;
      backdrop-filter: invert(0.2);
      -webkit-backdrop-filter: invert(0.2);
      background-color: rgb(119 136 153);
    }
    .v {
      height: 100%;
      display: flex;
      flex-direction: column;
    }`;
__decorate([
    property()
], DivierLine.prototype, "Before", void 0);
__decorate([
    property()
], DivierLine.prototype, "After", void 0);
__decorate([
    property({ type: Boolean })
], DivierLine.prototype, "v", void 0);
__decorate([
    property()
], DivierLine.prototype, "b", void 0);
DivierLine = __decorate([
    customElement(name.tag('divier-line'))
], DivierLine);
export { DivierLine };
