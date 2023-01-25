import { html, css, LitElement } from '../core/lit-core.min.js';
export class BaseInput extends LitElement {
  get _input() {
    return this.shadowRoot.querySelector('input');
  }
  get _ranged() {
    return this.shadowRoot.querySelector('.range i');
  }
  static properties = {
    label: {},
    name: {},
    id: {},
    pla: {},
    type: {},
    value: {},
    def: {},
    min: {},
    max: {},
    step: {},
  };
  constructor() {
    super();
    this.type = "text";
    this.min = 0;
    this.max = 100;
    this.step = 1;
  }
  static styles = css`
  :host{
    --shadow: #000000ab;
    --control: #fafafa;
    --backgrond: #2f81ed;
    --surface: #4de11c;
  }
  main{
    width: 100%;
      display: inline-flex;
      align-items: center
  }
  .input[type="color"] {
      padding: 0;
      height: 100% !important;
    }
  .input {
    width: 100%;
    height: 1.6em;
    outline: 0;
    margin: 0;
    /* flex: 1; */
    border: none;
    color: inherit;
    background: transparent;
    border: 1px solid transparent;
    padding-left: .4em;
    padding-right: .4em;
  }
  .input:focus {
    border: 1px solid black;
  }
  .range{
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 .1em .1em var(--shadow);
    border-radius: .2em;
    background-color:var(--backgrond);
  }
  .range input~i {
    position: absolute;
    left: 0;
    width: 50%;
    pointer-events: none ;
    border-radius: 10px;
    background-color: var(--surface);
    height: calc(.5em - 1.1px);
  }

  .range input {
  margin: 0px -0.5em;
  width: calc(100% + 0.5em);
  appearance: none;
  -webkit-appearance: none;
  outline: none;
  border-radius: 10px;
  background-color: transparent;
  }

  .range input::-webkit-slider-runnable-track {
    height: .5em;
    border-radius: 10px;
  }

  .range input::-webkit-slider-thumb {
    z-index: 1;
    appearance: none;
    -webkit-appearance: none;
    position: relative;
    height: 1em;
    width: 1em;
    margin-top: -0.25em;
    background: var(--control);
    border-radius: 50%;
    border: solid 0.125em rgba(0, 221, 255, 0.5);
    box-shadow: 0 .1em .1em var(--shadow);
  }`;
  render() {
    if (!this.name) this.name = this.label || this.type;
    return html`<main>
      <slot name="pre"></slot>
    <slot></slot>
    ${this.returnbytype()}
    <slot name="suf"></slot>
    </main>
    
    `;
  }
  firstUpdated() {
    [...this.children].forEach((e) => {
      e.style.display = "";
    });
    if (!this.value) this.value = this.def;
    if (this.type === "range") this._ranged.style.width = 100 * (this.value / (this.max - this.min)) + '%';

  }
  handleRange(e) {
    this.value = e.target.value;
    this._ranged.style.width = 100 * e.target.value / (this.max - this.min) + '%';
  }
  handleInput(e) {
    this.value = e.target.value;
  }
  _clear() {
    if (this.type === "range") {
      this._input.value = this.def || (this.max - this.min) / 2;
      this.value = this.def || (this.max - this.min) / 2;
      this._ranged.style.width = 100 * (this.value / (this.max - this.min)) + '%';
    } else {
      this._input.value = this.def || "";
      this.value = this.def || "";
    }
  }
  returnbytype() {
    switch (this.type) {
      case "range":
        return html`
        <div style="margin:0 4px;"><div class="range"><input type="range" @input=${this.handleRange} min=${this.min} max=${this.max} step=${this.step} value=${this.value} ><i></i></div></div>`;
      default:
        return html`<input class="input" type=${this.type} name=${this.name} id=${this.id} placeholder=${this.pla} value=${this.value} @input=${this.handleInput} />`;
    }
  }
}
import { name } from './config.js';
customElements.define(name.tag('base-input'), BaseInput);