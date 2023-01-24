import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseInput } from './base-input';
@customElement('sign-form')
export class SignForm extends LitElement {
  @property({ type: Boolean }) reset = false
  @property() method = "get"
  @property() submit = (x) => {
    console.table(x)
    console.error("You need to process the acquired data\nuse\nelement.submit=(x)=>{...}\nor\nelement.submit=function(x){...}\n");
  }
  static styles = css`
  form {
    --hover:rgb(190 35 90);
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
  }
  main{
    display: flex;
    flex-direction: column;
  }
  input[type="submit"],input[type="reset"]{
    --submit: rgb(44, 194, 224);
    padding: 0.5em 1.8em;
    border-width: 0;
    font-size:95%;
    border-radius: .42em;
    margin:.25em;
    background-color: var(--submit);
    color: inherit;
  }
  input[type="submit"]:hover,input[type="reset"]:hover{
    background-color: var(--hover);
    transform: scale(1.02);
  }
  `;
  render() {
    return html`<form method=${this.method.toLocaleLowerCase()} >
      <main>
        <label-input
        label="E-mail"
        name="email">
      </label-input>
        <label-input
        label="Password"
        name="password"
        type="password"
        ></label-input>
        <slot></slot>
      </main>
      <div>
        ${this.reset ? html`<input type="reset" @click=${this._reset} style="--hover:rgb(190 35 90)" />`:""}
        <input type="submit" @click=${this._submit} style="--hover:rgb(44 194 224 / 85%)" />
      </div>
    </form>`
  }
  get _label_input() {
    return this.renderRoot?.querySelectorAll('label-input') ?? null
  }
  _reset() {
    this._label_input.forEach(element => {
      element.value = element.def || "";
      element.clear();
    });
  }
  _submit(e) {
    e.preventDefault();
    let x = {};
    this._label_input.forEach(element => {
      var [name, value] = element.namevalue();
      x[name] = value;
    });
    this.shadowRoot.querySelector('slot').assignedNodes().forEach((node) => {
      if ((node as HTMLInputElement).name) {
        x[(node as HTMLInputElement).name] = (node as HTMLInputElement).value;
      }
    });
    this.submit(x);
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'sign-form': SignForm;
  }
}