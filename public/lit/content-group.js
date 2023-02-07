import { html, css, LitElement, classMap, styleMap, repeat } from '../core/lit-all.min.js';
export class SectionGroup extends LitElement {
  get _main() {
    return this.shadowRoot.querySelector('main');
  }
  get _act() {
    return this.shadowRoot?.querySelector('.active');
  }
  static styles = css`
  :host{
    display: block;
    background-color: inherit;
  }
  .active{
    color:#0095ff;
  }
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
      background-color: inherit;
  }
  div{
    height:100%;
    background-color: inherit;
    display: flex;
    flex-direction: column
  }
  .reversal{
    flex-direction: column-reverse;
  }
  .v{
    flex-direction:row !important;
  }
  .v.reversal{
    flex-direction: row-reverse !important;
  }
  .v nav{
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: space-evenly;
  }
  a {
    padding: 0.625em 1.25em;
    flex: 1 1 0%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .v main{
    flex-direction: column;
  }
  main{
    background-color: rgb(66, 139, 199);
    display: inline-flex;
    width: 100%;
    height:100%;
  }
  ::slotted(*[slot]){
    overflow: hidden;
    transition: all 0.35s;
  }
  `;
  static properties = {
    index: {},
    split: { type: Boolean },
    v: { type: Boolean },
    reversal: { type: Boolean }
  };
  constructor() {
    super();
    this.index = this.children[0].slot;
    this.all = this.children.length;
    this.current = 0;
  }
  render() {
    return html`
    <div class=${classMap({ v: this.v, reversal: this.reversal })}>
      <nav>${this._bar()}</nav>
    <main>
      ${this._slots()}
      <slot></slot>
    </main>
    </div>
    `;
  }
  _slots() {
    return html`${[...this.children].map((v) => html`<slot name="${v.slot}" ></slot>`)}`;
  }
  _bar() {
    return html`
    ${[...this.children].map((v, i) => html`<a
    class=${classMap({ active: !this.split && (this.index == v.slot) })}
    @click=${() => { this._resetIndex(v.slot, i); }}>${v.slot}</a>`
    )}
    `;
  }
  firstUpdated() {
    if (!this.split) {
      [...this.children].forEach((v, i) => {
        if (v.slot == this.index) {
          this.current = i;
        }
      });
      if (this.v) {
        [...this.children].forEach(v => v.style.height = '0');
        this.children[this.current].style.height = '100%';
      } else {
        [...this.children].forEach(v => v.style.width = '0');
        this.children[this.current].style.width = '100%';
      }
    }
  }
  _resetIndex(name, current) {
    if (this.split) this.index = null;
    if (this.index === name) {
      if (this._act) {
        this._act.classList.remove('active');
        if (this.v)
          [...this.children].forEach(v => v.style.height = '100%');
        else
          [...this.children].forEach(v => v.style.width = '100%');
        this.index = null;
      }
      return;
    }
    if (this.v)
      this.children[current].style.height = '100%';
    else
      this.children[current].style.width = '100%';
    var other = [...this.children].filter((v, i) => i != current);
    if (this.v)
      other.forEach(v => v.style.height = '0');
    else
      other.forEach(v => v.style.width = '0');
    this.split = false;
    this.index = name;
  }
}

export class ContentGroup extends LitElement {
  get _loading() {
    return this.shadowRoot.querySelector('slot[name="loading"]');
  }
  static styles = css`
  :host{
    overflow:hidden;
    display:block;
  }
  main{
    height:100%;
    overflow:hidden;
    display:grid;
    grid-template-columns:1fr 1fr;
    justify-items: center;
    align-items: center;
    position: relative;
    background:inherit;
  }
  ::slotted([slot="loading"]){
    position: absolute;
    height:100%;
    width:100%;
    background-color:inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }`;
  static properties = {
    sort: { type: String },
    col: { type: String },
    inner: { attribute: false },
  };
  render() {
    return html`<main style=${styleMap({ "grid-template-columns": this.col })}>
    <slot name="loading" style="background-color:inherit;"></slot>
    ${this._content()}
    </main>`;
  }
  firstUpdated() {
    if (this._loading) this._loading.style.display = 'none';
  }
  _content() {
    if (this.sort) {
      let inner = [];
      [...this.children].forEach(e => {
        if (e.getAttribute(this.sort)) inner.push({ id: e.getAttribute(this.sort), el: e });
        e.style.display = '';
      });
      this.inner = inner.sort((p, n) => p.id - n.id);
      return html`${repeat(this.inner, (innerdata) => innerdata.id, (innerdata) => html` ${innerdata.el}`)}`;
    }
    return html`${repeat(this.children, (el) => html`${el}`)}`;
  }
}
import { name } from './config.js';
customElements.define(name.tag('section-group'), SectionGroup);
customElements.define(name.tag('content-group'), ContentGroup);