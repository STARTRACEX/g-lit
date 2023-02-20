import { html, css, LitElement } from '../core/lit-core.min.js';
export class SignForm extends LitElement {
  get _input() {
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
    // reset: { type: Boolean },
    // submit: { type: Function },
  };
  constructor() {
    super();
    this.method = "post";
    // this.submit = (x) => {
    //   console.table(x);
    //   console.error("You need to process the acquired data\nuse\nelement.submit=(x)=>{...}\nor element.submit=function(x){...}\n");
    // };
  }
  get assigned() {
    return this.shadowRoot.querySelector('slot').assignedNodes();
  }
  render() {
    return html`
    <form method=${this.method.toLocaleLowerCase()} >
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
    </form>`;
  }
  reset() {
    for (let i of this._input) {
      i.reset();
    }
    for (let i of this.assigned) {
      each(i, (node) => {
        if (node.reset) {
          node.reset();
        }
        else if (node.value) node.value = node.defaultValue ?? "";
      });
    }
  }
  namevalue() {
    var x = {};
    for (let i of this._input) {
      var [name, value] = i.namevalue();
      x[name] = value;
    }
    for (let i of this.assigned) {
      each(i, (node) => {
        if (node.namevalue) {
          var [name, value] = node.namevalue();
          x[name] = value;
        }
        else if (node.name) {
          if (node.type == "radio" || node.type == "checkbox") {
            if (node.checked) {
              x[node.name] = node.value;
            }
          }
          else {
            x[node.name] = node.value;
          }
        }
      });
    }
    return x;
  }
  submit() {
    const x = this.namevalue();
    this.dispatchEvent(new CustomEvent('submit', { detail: x }));
    return x;
  }
  firstUpdated() {

  }
}
import { name } from './config.js';
customElements.define(name.tag('sign-form'), SignForm);

// 递归遍历
function each(node, callback) {
  if (node) {
    callback(node);
    for (let i of node.childNodes) {
      each(i, callback);
    }
  }
}