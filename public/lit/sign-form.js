import { html, css, LitElement } from '../core/lit-core.min.js';
import './label-input.js';
export class SignForm extends LitElement {
  get _label_input() {
    return this.renderRoot?.querySelectorAll('label-input') ?? null;
  }
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
  static properties = {
    method: {},
    reset: { type: Boolean },
    submit: { type: Function },
  };
  constructor() {
    super();
    this.method = "post";
    this.submit = (x) => {
      console.table(x);
      console.error("You need to process the acquired data\nuse\nelement.submit=(x)=>{...}\nor element.submit=function(x){...}\n");
    };
  }
  render() {
    console.log(this);
    return html`
    <form method=${this.method.toLocaleLowerCase()} >
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
        ${this.reset && html`<input type="reset" @click=${this._reset} style="--hover:rgb(190 35 90)" />`}
        <input type="submit" @click=${this._submit} style="--hover:rgb(44 194 224 / 85%)" />
      </div>
    
    </form>`;
  }
  _reset() {
    this._label_input.forEach(element => {
      element.value = element.def;
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
      if (node.name) {
        x[node.name] = node.value;
      }
    });
    this.submit(x);
  }
}
import { name } from './config.js';
customElements.define(name.tag('sign-form'), SignForm);