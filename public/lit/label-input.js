import { html, css, LitElement, nothing } from '../core/lit-core.min.js';

export class LabelInput extends LitElement {

  static styles = css`
  :host {
    width: 100%;
    display: flex;
    justify-content: space-between;
    }
  @media screen and (max-width:500px) {
    :host {
      justify-content: flex-start;
      flex-direction: column;
    }
  }
  `;

  static properties = {
    label: {},
    name: {},
    id: {},
    pla: {},
    type: {},
    value: { reflect: true },
    def: {}
  };

  constructor() {
    super();
    this.value = this.def ?? "";
  }

  get _input() {
    return (this.___input ??= this.renderRoot?.querySelector('input') ?? null);
  }

  render() {
    return html`
      <label for=${this.id || this.label}>${this.label}</label>
      <input
      value=${this.value || this.def || nothing}
      @input=${this.oninput}
      id=${this.id || this.label} 
      type=${this.type || nothing} 
      placeholder=${this.pla || nothing}
      name=${this.name} />
    `;
  }

  oninput(i) {
    this.value = i.target.value;
  }

  clear() {
    this._input.value = this.def || null;
  }

  namevalue() {
    // console.log("getvalue", this._input);
    return [this.name, this.value];
  }
}
customElements.define('label-input', LabelInput);