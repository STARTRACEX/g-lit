import { html, css, LitElement, ifDefined } from '../core/lit-all.min.js';
import { name, theme } from './config.js';
export class LoadTrack extends LitElement {
  static styles = [theme, css`
  :host,div{
    display:inline-flex;
  }
  div {
    position: relative;
    width: 10em;
    height: .5em;
    border-radius: .25em;
    background-color: var(--input-false);
    overflow: hidden;
    z-index: 1;
  }
    i {
    position: absolute;
    border-radius: inherit;
    top: 0;
    left: 0;
    height: 100%;
    width: 20%;
    background-color: var(--input-true);
    z-index: 2;
    transition: all .3s;
    animation: progress 1.5s ease-in-out infinite alternate;
  }
  @keyframes progress {
    from {
      left: 0%;
    }
    to {
      left: 80%;
    }
  }
  :host([value]) i {
    animation: none;
    left: 0 !important;
  }
  `];
  static properties = {
    current: { attribute: false },
    max: { type: Number },
    min: { type: Number },
    modify: { type: Boolean },
  };
  set value(val) {
    if (val === null || val === undefined || val === "") {
      this.removeAttribute("value");
      // return;
    } else {
      this.setAttribute("value", val);
    }
    this.current = this.parsePercent(val || "20");
  }
  get value() {
    return this.getAttribute("value");
  }
  constructor() {
    super();
    this.current = 20;
    this.max = 1;
    this.min = 0;
  }
  render() {
    return html`<div class="progress" @click=${this._handleClick} ><i style="width:${this.current}%;"><slot></slot></i></div>`;
  }
  firstUpdated() {
    this.current = this.parsePercent(this.value) || 20;
  }
  parsePercent(s = "0") {
    if (String(s).includes("%")) {
      return parseFloat(s);
    }
    return parseFloat(s) / (this.max - this.min) * 100;
  }
  _handleClick(e) {
    if (this.modify) {
      this.value = (e.offsetX / this.offsetWidth) * (this.max - this.min);
      this.dispatchEvent(new CustomEvent("change", { detail: e.offsetX / this.offsetWidth }));
    }
  }
  namevalue() {
    return [this.getAttribute("name"), this.getAttribute("value")];
  }
}
customElements.define(name.tag("load-track"), LoadTrack);