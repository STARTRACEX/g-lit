import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { name } from '../config';
@customElement(name.tag('sign-form'))
export class SignForm extends LitElement {  
  static styles = css`
  form {
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
  get _from() {
    return this.shadowRoot.querySelector('form');
  }
  render() {
    return html`<form>
      <slot name="pre"></slot>
      <main>
        <label-input
        label="E-mail"
        name="email">
      </label-input>
        <label-input
        label="Password"
        type="password"
        ></label-input>
        <slot></slot>
      </main>
      <slot name="suf"></slot>
    </form>`;
  }
  firstUpdated() {
    for (let slot of [...this.shadowRoot.querySelectorAll('slot')]) for (let i of slot.assignedNodes()) { slot.appendChild(i); }
  }
  reset() {
    each(this.shadowRoot.querySelector('form'), (node) => {
      if (node.reset) { node.reset(); }
    });
  }
  namevalue() {
    var x = {};
    each(this._from, (node) => {
      if (node.namevalue) {
        var [name, value] = node.namevalue();
        x[name] = value;
      }
      else if (node.name && node.tagName !== "SLOT") {
        if (node.type == "radio" || node.type == "checkbox") { if (node.checked) { x[node.name] = node.value ?? ""; } }
        else { x[node.name] = node.value ?? ""; }
      }
    });
    return x;
  }
  submit() {
    const x = this.namevalue();
    this.dispatchEvent(new CustomEvent('submit', { detail: x }));
    return x;
  }
}
function each(node, callback) {
  if (node) {
    callback(node);
    for (let i of node.childNodes) {
      each(i, callback);
    }
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'sign-form': SignForm;
  }
}