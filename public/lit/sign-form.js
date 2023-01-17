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
    this.id = this.label??"";
  }

  get _input() {
    return (this.___input ??= this.renderRoot?.querySelector('input') ?? null);
  }

  render() {
    return html`
    <label for=${this.id}>${this.label}</label>
    <input
    value=${this.value}
    @input=${this.oninput}
    id=${this.id} 
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

export class SignForm extends LitElement {

  get _label_input() {
    return (this.__label_input ??= this.renderRoot?.querySelectorAll('label-input') ?? null);
  }
  /* 
    get _reset_input() {
      return (this.__reset_input ??= this.renderRoot?.querySelector('[type="reset"]') ?? null);
    }
  */
  /*
    get _submit_input() {
      return (this.__submit_input ??= this.renderRoot?.querySelector('[type="submit"]') ?? null);
    }
  */
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

  static properties = {
    method: {},
    reset: { type: Boolean },
  };

  constructor() {
    super();
    this.method = "post";
  }

  render() {
    return html`
    <form method=${this.method.toLocaleLowerCase()} >
      <main>
        <label-input
        pla="E-mail"
        label="E-mail"
        name="email"></label-input>
        <label-input
        pla="Password"
        label="Password"
        name="password"></label-input>
      </main>
      <div>
        ${this.reset ? html`<input type="reset"  @click=${this._reset} />` : ''}
        <input type="submit" @click=${this._submit} />
      </div>
    
    </form>`;
  }

  _reset() {
    this._label_input.forEach(element => {
      element.value = '';
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

    /* ... */
    console.log(x);
    /* ... */
  }
}
customElements.define('sign-form', SignForm);