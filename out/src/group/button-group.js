var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { name } from "../config";
let ButtonGroup = class ButtonGroup extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * @param h - Disable horizontal internal fillets 禁用水平内部圆角
         * @param v - Disable vertical interior fillets 禁用垂直内部圆角
         */
        this.h = false;
        this.v = false;
    }
    render() {
        return html `
    <slot name="pre"></slot>
    <div class=${classMap({ v: this.v, h: this.h })}>
    <slot></slot>
    </div>
    <slot name="suf"></slot>
    `;
    }
};
ButtonGroup.styles = css `
  :host{
    display: inline-flex;
    align-items: center;
  }
  .h ::slotted(*:nth-of-type(1)){
    border-top-right-radius:0 !important;
    border-bottom-right-radius:0 !important;
  }
  .h ::slotted(*:last-of-type){
    border-top-left-radius:0 !important;
    border-bottom-left-radius:0 !important;
  }
  .v ::slotted(*:nth-of-type(1)){
    border-bottom-right-radius:0 !important;
    border-bottom-right-radius:0 !important;
  }
  .v ::slotted(*:last-of-type){
    border-top-left-radius:0 !important;
    border-top-right-radius:0 !important;
  }
  div ::slotted(*){
   margin:0 -.04em; /* 50% border-width */
  }
  ::slotted(*:hover){
    z-index:2
  }
  div{
    margin:0 .04em;
    display: inherit;
    flex-direction:inherit;
  }
  `;
__decorate([
    property({ type: Boolean })
], ButtonGroup.prototype, "h", void 0);
__decorate([
    property({ type: Boolean })
], ButtonGroup.prototype, "v", void 0);
ButtonGroup = __decorate([
    customElement(name.tag("button-group"))
], ButtonGroup);
export { ButtonGroup };
