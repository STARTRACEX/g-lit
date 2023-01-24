import { LitElement, html, css, classMap } from "../core/lit-all.min.js";
export class ButtonGroup extends LitElement {
  static properties = {
    v: { type: Boolean },
    h: { type: Boolean }
  };
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
customElements.define("button-group",ButtonGroup)