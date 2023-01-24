import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('divier-line')
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
      -webkit-backdrop-filter: invert(0.2);
      background-color: rgb(119 136 153);
    }
    .v {
      height: 100%;
      display: flex;
      flex-direction: column;
    }`;

  @property() Before = "auto";
  @property() After = "auto";
  @property({ type: Boolean }) v = false;
  @property() b = "2.2";
  render() {
    var hrstyle = `.before{height:${this.b};max-width:${this.Before}}.after{height:${this.b};max-width:${this.After}}.v .before{width:${this.b};max-height:${this.Before}}.v .after{width:${this.b};max-height:${this.After}}`;
    return html`<div class=${this.v ? "v" : ""}>
    <style>${hrstyle}</style>
      <hr class="before"/>
      <slot></slot>
      <hr class="after"/>
    </div>`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'divier-line': DivierLine;
  }
}