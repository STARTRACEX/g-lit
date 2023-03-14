import { LitElement, html, css, ifDefined } from '../core/lit-all.min.js';
import { name, append } from './config.js';
export class AvatarAnchor extends LitElement {
  static properties = {
    src: {},
    href: {},
    name: {},
    more: { type: Number },
    call: {},
    gap: { type: Boolean }
  };
  static styles = css`
  :host{
    display: inline-block;
    height: fit-content;
  }
  *{
    border-radius: inherit;
  }
  header{
    display: flex; 
    flex-wrap: nowrap;
  }
  .center header{
    flex-direction: column;
  }
  .right header{
    flex-direction: row-reverse;
    justify-content: flex-start;
  }
  .left header{
    justify-content: flex-start;
  }
  img{
    width: 100%;
    height: 100%;
  }
  div{
    --ava:2.5em;
  }
  a{
    height: var(--ava);
    width:var(--ava);
    min-height: var(--ava);
    min-width:var(--ava);
    display: flex;
    position: relative;
  }
  span{
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .left{
    margin-right: 3em;
  }
  .right{
    margin-left: 3em;
  }
  .left .gap{
    margin-left:var(--ava);
  }
  .right .gap{
    margin-right:var(--ava);
  }
  slot[name="state"]{
    position: absolute;
    display: block;
    position: absolute;
    display: block;
    bottom: -.25em;
    right: -.25em;
  }
  .left section,.right section{
    height: var(--ava);
    display: flex;
    align-items: center;
    flex:1;
  }
  .right section{
    justify-content: flex-end;
  }
  `;
  constructor() {
    super();
    this.call = "center";
  }
  render() {
    return html`<div class=${this.call}>
      <header>
        <a href=${ifDefined(this.href)}>
          ${this.ava()}
          <slot name="state"></slot>
        </a>
        <section>
          <slot name="bar"></slot>
          ${this.gap ? html`<article><slot></slot></article>` : ''}
        </section>
      </header>
          ${!this.gap ? html`<article><slot></slot></article>` : ''}
    </div>`;
  }
  ava() {
    if (this.src) {
      return html`<img src=${this.src} />`;
    } else if (this.name) {
      var name = this.name.slice(0, 2);
      name = name[0].toUpperCase() + name.slice(1);
      return html`<span>${name}</span>`;
    } else if (this.more) {
      var more = this.more > 99 ? '...' : this.more;
      return html`<span>+${more}</span>`;
    }
    return html`<slot name="avatar"></slot>`;
  }
}

customElements.define(name.tag('avatar-anchor'), AvatarAnchor);
export class AvatarGroup extends LitElement {
  static properties = {
    rank: { type: Boolean },
    max: { type: Number }
  };
  static styles = css`
  :host{
    display: flex;
    border-radius: 50%;
    flex-direction: column;
  }
  div{
    display: flex;
    flex-direction: inherit;
    flex-wrap: nowrap;
    width: 100%;
    min-width:8em;
    overflow-y: auto;
    overflow-x: hidden;
  }
  div::slotted([call="left"]){
    margin-right: 2.5em;
  }
  div::slotted([call="right"]){
    margin-left: 2.5em;
  }
  `;
  get assigned() {
    return this.shadowRoot.querySelector('slot').assignedElements();
  }
  render() {
    if (this.rank)
      return html`<slot style="display: flex;flex-direction: row;"></slot>`;
    else {
      return html`<div><slot></slot></div>`;
    }
  }
  firstUpdated() {
    if (this.rank) {
      this.assigned.forEach((ava) => { ava.style.maxWidth = '2em'; });
      if (this.assigned[0]?.call == 'right')
        this.style.alignItems = 'flex-end';
    }
    if (this.max && this.assigned.length > this.max) {
      const length = this.assigned.length;
      console.log(this.assigned.length, this.max);
      this.assigned.slice(this.max).forEach(ava => ava.remove());
      // 添加more
      append(this, { tag: name.tag('avatar-anchor'), props: { more: length - this.max, } });
    }
  }
  append(args, bool) {
    if (this.max && this.assigned.length == this.max) {
      append(this, { tag: name.tag('avatar-anchor'), props: { more: '1', } });
      return;
    }
    if (this.max && this.assigned.length >= this.max) {
      this.assigned[this.max].more += 1;
      return;
    }
    if (!args.props.call)
      args.props.call = bool ? "left" : "right";
    append(this, args);
    if (this.rank) {
      this.assigned.pop().style.maxWidth = '2em';
      if (this.assigned[0].call == 'right')
        this.style.alignItems = 'flex-end';
    }
  }
  subtract() {
    if (this.max && this.assigned.length == this.max) {
      this.assigned[this.max - 1].remove();
      return;
    }
    if (this.max && this.assigned.length > this.max) {
      this.assigned[this.max].more -= 1;
      if (this.assigned[this.max].more == 0)
        this.assigned[this.max].remove();
      return;
    }
    this.assigned.pop().remove();
  }

}
customElements.define(name.tag('avatar-group'), AvatarGroup);