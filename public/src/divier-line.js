import { html, css, LitElement } from '../core/lit-core.min.js';
export class DivierLine extends LitElement {
  static styles = css`
    div {
      display: flex;
      align-items: center;
      border-radius:inherit;
    }
    hr {
      border-radius:inherit;
      margin: 0;
      border: 0;
      flex: 1;
      backdrop-filter: invert(0.2);
      -webkit-backdrop-filter: invert(0.2)
    }
    .v {
      height: 100%;
      display: flex;
      flex-direction: column;
    }`;
  static properties = {
    pre: {},
    suf: {},
    v: { type: Boolean },
    b: {}
  };
  constructor() {
    super();
    this.b = "2.2px";
    this.pre = "auto";
    this.suf = "auto";
  }
  render() {
    var hrstyle = `.before{height:${this.b};max-width:${this.pre}}.after{height:${this.b};max-width:${this.suf}}.v .before{width:${this.b};max-height:${this.pre}}.v .after{width:${this.b};max-height:${this.suf}}`;
    return html`<div class=${this.v ? "v" : "h"}>
    <style>${hrstyle}</style>
      <hr class="before"/>
      <slot></slot>
      <hr class="after"/>
    </div>`;
  }
}
import { name } from './config.js';
customElements.define(name.tag('divier-line'), DivierLine);