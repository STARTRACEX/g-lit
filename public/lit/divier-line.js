import { html, css, LitElement } from '../core/lit-core.min.js';
export class DivierLine extends LitElement {
  static styles = css`
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
      -webkit-backdrop-filter: invert(0.2)
    }
    .v {
      height: 100%;
      display: flex;
      flex-direction: column;
    }`;
  static properties = {
    before: {},
    after: {},
    v: { type: Boolean },
    b: {}
  };
  constructor() {
    super();
    this.b = "2.2";
    this.before = "auto";
    this.after = "auto";
  }
  render() {
    var hrstyle = `.before{height:${this.b};max-width:${this.before}}.after{height:${this.b};max-width:${this.after}}.v .before{width:${this.b};max-height:${this.before}}.v .after{width:${this.b};max-height:${this.after}}`;
    return html`<div class=${this.v && "v"}>
    <style>${hrstyle}</style>
      <hr class="before"/>
      <slot></slot>
      <hr class="after"/>
    </div>`;
  }
}
customElements.define('divier-line', DivierLine);