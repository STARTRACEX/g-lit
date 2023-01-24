import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
@customElement("button-group")
export class ButtonGroup extends LitElement {
  /**
   * @param h - Disable horizontal internal fillets 禁用水平内部圆角
   * @param v - Disable vertical interior fillets 禁用垂直内部圆角
   */
  @property({ type: Boolean }) h = false;
  @property({ type: Boolean }) v = false;
  static styles = css`
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
  render() {
    return html`
    <slot name="pre"></slot>
    <div class=${classMap({ v: this.v, h: this.h })}>
    <slot></slot>
    </div>
    <slot name="suf"></slot>
    `;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "button-group": ButtonGroup;
  }
}