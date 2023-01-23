var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let SignForm = class SignForm extends LitElement {
    constructor() {
        super(...arguments);
        this.reset = false;
        this.method = "get";
        this.submit = (x) => {
            console.table(x);
            console.error("You need to process the acquired data\nuse\nelement.submit=(x)=>{...}\nor\nelement.submit=function(x){...}\n");
        };
    }
    render() {
        return html `
    <form>
      <main>
        <label-input label="E-mail" name="email" id="email" type="email"></label-input>
        <label-input label="Password" name="password" id="password" type="password"></label-input>
        <slot></slot>
      </main>
      <div>
        ${this.reset ? html `<input type="reset"  @click=${this._reset} />` : ''}
        <input type="submit" @click=${this._submit} />
      </div>
    </form> 
    `;
    }
    get _label_input() {
        var _a, _b;
        return (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll('label-input')) !== null && _b !== void 0 ? _b : null;
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
        this.submit(x);
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
  `;
__decorate([
    property({ type: Boolean })
], SignForm.prototype, "reset", void 0);
__decorate([
    property()
], SignForm.prototype, "method", void 0);
__decorate([
    property()
], SignForm.prototype, "submit", void 0);
SignForm = __decorate([
    customElement('sign-form')
], SignForm);
export { SignForm };
