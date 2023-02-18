import { html, css, LitElement } from '../core/lit-core.min.js';
import { name } from './config.js';
export class DownDrop extends LitElement {
  static styles = css`
  :host{
    color:inherit;
    background-color:inherit;
    position: relative;
  }
  div{
    background-color:inherit;
    position: absolute;
    visibility: hidden;
  }
  slot[name="hover"]:hover~div,div:hover{
    visibility: visible;
  }
  `;
  render() {
    return html`
    <slot name="hover"></slot>
    <slot name="focus" @click=${this.toggle}></slot>
    <div><slot></slot></div>`;
  }
  firstUpdated() {
    let div = this.shadowRoot.querySelector("div");
    let divRect = div.getBoundingClientRect();
    if (divRect.right > document.body.clientWidth) {
      var x = divRect.right - document.body.clientWidth;
      div.style.left = -x + "px";
    }
    if (divRect.bottom > document.body.clientHeight) {
      div.style.bottom = "100%";
    }
  }
  close() {
    this.shadowRoot.querySelector("div").style.visibility = "hidden";
  }
  open() {
    this.shadowRoot.querySelector("div").style.visibility = "visible";
  }
  toggle() {
    this.shadowRoot.querySelector("div").style.visibility == "visible" ? this.close() : this.open();
  }
}
customElements.define(name.tag('down-drop'), DownDrop);