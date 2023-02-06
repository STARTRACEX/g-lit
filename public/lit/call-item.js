import { html, css, LitElement } from '../core/lit-core.min.js';
import { name } from "./config.js";
export class AlertItem extends LitElement {
  static styles = css`
  :host{
    display: inline-block;
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
    padding: 15px;
    border: 1px solid transparent;
    border-radius: 4px;
    transition: all .3s;
  }

  .content {
    min-height: 1.6em;
    line-height: 1.6em;
  }

  .close {
    height: fit-content;
    border-radius: 50%;
    transition: all .3s;
  }

  .close:hover {
    backdrop-filter: contrast(115%);
  }

  svg {
    display: block;
    height: 1.8em;
    width: 1.8em;
  }

  .alert {
    display: flex;
    justify-content: space-between;
  }

  .close:hover path {
    stroke: var(--super);
  }

  path {
    stroke: var(--color);
    transition: all .3s;
  }

  .alert {
    color: var(--color);
    background-color: var(--background);
    border-color: var(--border);
  }

  .alert ::slotted(a) {
    font-weight: bold;
    color: var(--super);
  }`;
  static properties = {
    autoclose: { type: Number },
    call: {}
  };
  constructor() {
    super();
    this.call = "info";
  }
  get _alert() {
    return this.shadowRoot.querySelector('.alert');
  }
  render() {
    if (this.autoclose) setTimeout(() => this.close(), this.autoclose);
    return html`
      <div class=${this.call + " alert"} role="alert">
    <div class="content">
      <strong><slot name=title></slot></strong>
      <slot></slot>
    </div>
    <div class="close" @click=${this.close}>
      <svg width="38" height="38" viewBox="0 0 48 48" fill="none">
        <path d="M14 14L34 34" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 34L34 14" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </div>
    `;
  }
  close() {
    this._alert.style.opacity = '0';
    this._alert.style.transform = 'translateY(-100%)';
    setTimeout(() => {
      this.remove();
    }, 300);
  }
}
customElements.define(name.tag('alert-item'), AlertItem);
export class ShadeItem extends LitElement {
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
  static properties = {
    key: { type: Boolean },
    scale: { type: Boolean },
    call: {},
    close: { type: Function },
  };
  constructor() {
    super();
    this.call = "center";
    this.close = (x) => true;
  }
  get _aside() {
    return this.shadowRoot.querySelector('aside');
  }
  render() {
    return html` <aside class=${this.call} @click=${(e => { e.stopPropagation(); })}>
      <slot></slot>
    </aside>`;
  }
  _close() {
    if (this.close())
      this.hide();
  }
  firstUpdated() {
    this.show();
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this._close);
    this.removeEventListener('wheel', this._handleWheel);
  }
  show() {
    if (this.scale)
      this.addEventListener('wheel', this._handleWheel);
    if (this.key)
      document.addEventListener('keydown', e => this._handleKeydown(e));
    this.addEventListener('click', this._close);
    this.style.width = '100%';
    this.style.height = '100%';
    this.style.pointerEvents = 'all';
    this._aside.classList.remove('hide');
  }
  hide() {
    this._aside.classList.add('hide');
    this.style.pointerEvents = 'none';
    setTimeout(() => {
      this.style.width = '0';
      this.style.height = '0';
    }, 500);
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
      this._close();
  }
}
customElements.define(name.tag('shade-item'), ShadeItem);