import { LitElement, html, css } from "lit";
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
@customElement("section-group")
export class SectionGroup extends LitElement {
  current: number;
  all: number;
  get _main() {
    return this.shadowRoot.querySelector('main');
  }
  get _act() {
    return this.shadowRoot?.querySelector('.active');
  }
  static styles = css`
  .active{
    color:#0095ff;
  }
  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  a {
    padding: .625em 1.25em;
  }
  main{
    background: rgb(66, 139, 199);
    display: inline-flex;
    width: 100%;
  }
  ::slotted(*[slot]){
    overflow: hidden;
    transition: width 0.35s;
    width:100%;
  }
  `;
  @property() index = this.children[0].slot
  @property({ type: Boolean }) split = false
  constructor() {
    super();
    this.current = 0
    this.all = this.children.length;
  }
  render() {
    return html`<nav>${this.bar()}</nav>
    <main>
      ${this.slots()}
      <slot></slot>
    </main>`;
  }
  slots() {
    return html`${[...this.children].map((v) => html`<slot name="${v.slot}" ></slot>`)}`;
  }
  bar() {
    return html`
    ${[...this.children].map((v, i) => html`<a
    class=${classMap({ active: !this.split && (this.index == v.slot) })}
    @click=${() => { this.resetindex(v.slot, i); }}>${v.slot}</a>`
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
      [...this.children].forEach(v => (<HTMLElement>v).style.width = '0');
      (<HTMLElement>this.children[this.current]).style.width = '100%';
    }
  }
  resetindex(name, current) {
    if (this.split) this.index = null;
    if (this.index === name) {
      if (this._act) {
        this._act.classList.remove('active');
        [...this.children].forEach(v => (<HTMLElement>v).style.width = '100%');
        this.index = null;
      }
      return;
    }
    (<HTMLElement>this.children[current]).style.width = '100%';
    var other = [...this.children].filter((v, i) => i != current);
    other.forEach(v => (<HTMLElement>v).style.width = '0');
    this.split = false;
    this.index = name;
  }
}

@customElement("content-group")
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
  @property() sort = "sort"
  @property() col = "1fr 1fr"
  @property({ attribute: false }) inner = []
  render() {
    return html`<main style=${styleMap({ "grid-template-columns": this.col })}>
    <slot name="loading" style="background-color:inherit;"></slot>
    ${this.content()}
    </main>`;
  }
  firstUpdated() {
    if (this._loading) (<HTMLElement>this._loading).style.display = 'none';
  }
  content() {
    if (this.sort) {
      let inner = [];
      [...this.children].forEach(e => {
        if (e.getAttribute(this.sort)) inner.push({ id: e.getAttribute(this.sort), el: e });
        (<HTMLElement>e).style.display = '';
      });
      this.inner = inner.sort((p, n) => p.id - n.id);
      return html`${repeat(this.inner, (innerdata) => innerdata.id, (innerdata) => html` ${innerdata.el}`)}`;
    }
    return html`${repeat(this.children, (el) => html`${el}`)}`;
  }
}
declare global{
  interface HTMLElementTagNameMap{
    "section-group": SectionGroup
    "content-group":ContentGroup
  }
}