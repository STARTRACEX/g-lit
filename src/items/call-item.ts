import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config";
@customElement(name.tag("alert-item"))
export class AlertItem extends LitElement {
  static styles = css`
  :host{
    width: 100%;
    display: inline-block;
  }
  .hide{
    opacity: 0;
    transform: translateY(-50%);
  }
  .success {
    --color: #3c763d;
    --super: #2b542c;
    --background: #dff0d8;
    --border: #d6e9c6;
  }
  .info {
    --color: #31708f;
    --background: #d9edf7;
    --border: #bce8f1;
    --super: #245269;
  }
  .warning {
    --color: #8a6d3b;
    --background: #fcf8e3;
    --border: #faebcc;
    --soper: #66512c;
  }
  .danger {
    --color: #a94442;
    --background: #f2dede;
    --border: #ebccd1;
    --super: #843534;
  }
  .alert {
    display: flex;
    justify-content: space-between;
    padding: .2em .5em;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: all .25s;
    color: var(--color);
    background-color: var(--background);
    border-color: var(--border);
    animation: alert .25s ease-in-out;
  }
  @keyframes alert {
    0% {
      opacity: 0;
      transform: translateY(-50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .content {
    margin:0 .25em 0 .35em;
    min-height: 1.6em;
    line-height: 1.6em;
  }
  .close {
    border-radius: 50%;
    transition: all .3s;
  }
  .close:hover {
    backdrop-filter: contrast(115%);
  }
  svg {
    display: block;
    height: 1.6em;
    width: 1.6em;
  }
  .close:hover path {
    stroke: var(--super);
  }
  path {
    stroke: var(--color);
    transition: all .3s;
  }
  .alert ::slotted(a) {
    font-weight: bold;
    color: var(--super);
  }`;
  @property() call = "info";
  @property({ type: Number }) autoclose = 0;
  @property() title = "";
  @property() content = "";
  render() {
    if (this.autoclose) setTimeout(() => this.close(), this.autoclose);
    return html`<div class=${this.call + " alert"} role="alert">
    <div class="content">
      <strong><slot name=title></slot>${this.title}</strong>
      <slot></slot>${this.content}
    </div>
    <div class="close" @click=${this.close}>
      <svg viewBox="0 0 48 48" fill="none">
        <path d="M14 14L34 34" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 34L34 14" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>`;
  }
  close() {
    this.shadowRoot.querySelector('.alert').classList.add('hide');
    setTimeout(() => {
      this.remove();
    }, 300);
  }
}
@customElement(name.tag("dialog-item"))
export class DialogItem extends LitElement {
  static styles = css`:host {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      width: 100%;
      height: 100%;
    }
    aside {
      width: fit-content;
      height: fit-content;
      margin:auto;
      transition: all .3s;
      opacity: 1;
      transform: translateY(0);
    }
    .top{
      margin-top:0;
    }
    .right{
      margin-right:0;
    }
    .bottom{
      margin-bottom:0;
    }
    .left{
      margin-left:0;
    }
    aside.hide{
      opacity:0;
      transform:translateY(-15%);
    }
    `;
  @property({ type: Boolean }) key = false;
  @property({ type: Boolean }) scale = false;
  @property({ type: Boolean }) model = false;
  @property({ type: String }) call = "center";
  tempmodel: boolean;
  get _aside() {
    return this.shadowRoot.querySelector('aside');
  }
  render() {
    return html` <aside class=${this.call} @click=${(e => { e.stopPropagation(); })}>
      <slot></slot>
    </aside>`;
  }
  firstUpdated() {
    this.tempmodel = this.model;
    this.addEventListener('submit', e => {
      if ((e.target as HTMLFormElement).method === "dialog") this.close();
    });
    if (this.scale)
      this.addEventListener('wheel', this._handleWheel);
    this.show();
  }
  show() {
    if (this.key)
      document.addEventListener('keydown', e => this._handleKeydown(e));
    this.addEventListener('click', this._handleClick);
    this._aside.classList.remove('hide');
    this.style.pointerEvents = 'all';
  }
  showModel() {
    this.tempmodel = true;
    this.show();
  }
  close() {
    this.tempmodel = this.model;
    this._aside.classList.add('hide');
    this.style.pointerEvents = 'none';
    document.removeEventListener('keydown', e => this._handleKeydown(e));
  }
  _handleClick() {
    if (this.tempmodel) return;
    this.close();
  }
  _handleWheel(e) {
    e.preventDefault();
    e.stopPropagation();
    let s = this._aside.style.transform.match(/scale\((.*)\)/);
    var scale = 1;
    if (s) scale = Number(s[1]);
    if (e.deltaY > 0) scale -= 0.1;
    else scale += 0.1;
    this._aside.style.transform = `scale(${scale})`;
  }
  _handleKeydown(e) {
    if (e.key == 'Escape')
      this.close();
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "alert-item": AlertItem;
    "dialog-item": DialogItem;
  }
}