import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
type base = "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "image"
@customElement('label-input')
export class LabelInput extends LitElement {
  @property() type: base = "text"
  @property() label = ""
  @property() def = ""
  @property() pla = ""
  @property() name = this.type ?? ""
  @property() id = this.label ?? ""
  @property() value = this.def ?? ""

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

  get _input() {
    return this.renderRoot?.querySelector('input') ?? null
  }

  render() {
    return html`
    ${this.label && html`<label for=${this.id}>${this.label}</label>`}
      
      <input
      value=${this.value || this.def}
      @input=${this.handleinput}
      id=${this.id} 
      type=${this.type} 
      placeholder=${this.pla}
      name=${this.name} />
    `;
  }
  handleinput(i) {
    this.value = i.target.value;
  }

  clear() {
    this._input.value = this.def;
  }

  namevalue() {
    return [this.name, this.value];
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'label-input': LabelInput;
  }
}