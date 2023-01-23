import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
  render() {
    return html`
    <form>
      <main>
        <label-input label="E-mail" name="email" id="email" type="email"></label-input>
        <label-input label="Password" name="password" id="password" type="password"></label-input>
        <slot></slot>
      </main>
      <div>
        ${this.reset ? html`<input type="reset"  @click=${this._reset} />` : ''}
        <input type="submit" @click=${this._submit} />
      </div>
    </form> 
    `
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
    this.submit(x);
  }
}
declare global {
  interface HTMLElementTagNameMap {
    'sign-form': SignForm;
  }
}