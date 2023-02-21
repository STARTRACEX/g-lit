var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { name } from '../config';
let SignForm = class SignForm extends LitElement {
    get _from() {
        return this.shadowRoot.querySelector('form');
    }
    render() {
        return html `<form>
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
        for (let slot of [...this.shadowRoot.querySelectorAll('slot')])
            for (let i of slot.assignedNodes()) {
                slot.appendChild(i);
            }
    }
    reset() {
        each(this.shadowRoot.querySelector('form'), (node) => {
            if (node.reset) {
                node.reset();
            }
        });
    }
    namevalue() {
        var x = {};
        each(this._from, (node) => {
            var _a, _b;
            if (node.namevalue) {
                var [name, value] = node.namevalue();
                x[name] = value;
            }
            else if (node.name && node.tagName !== "SLOT") {
                if (node.type == "radio" || node.type == "checkbox") {
                    if (node.checked) {
                        x[node.name] = (_a = node.value) !== null && _a !== void 0 ? _a : "";
                    }
                }
                else {
                    x[node.name] = (_b = node.value) !== null && _b !== void 0 ? _b : "";
                }
            }
        });
        return x;
    }
    submit() {
        const x = this.namevalue();
        this.dispatchEvent(new CustomEvent('submit', { detail: x }));
        return x;
    }
};
SignForm.styles = css `
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
SignForm = __decorate([
    customElement(name.tag('sign-form'))
], SignForm);
export { SignForm };
function each(node, callback) {
    if (node) {
        callback(node);
        for (let i of node.childNodes) {
            each(i, callback);
        }
    }
}
