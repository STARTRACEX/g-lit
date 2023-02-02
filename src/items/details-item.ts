import { LitElement, css, html } from "Lit";
import { property, customElement } from "lit/decorators.js";
import { name } from '../config';
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
  @property() call = "info";
  @property({ type: Number }) autoclose = 0;
  static properties = {
    autoclose: { type: Number },
    call: {}
  };
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
    (<HTMLElement>this._alert).style.opacity = '0';
    (<HTMLElement>this._alert).style.transform = 'translateY(-100%)';
    setTimeout(() => {
      this.remove();
    }, 300);
  }
}
@customElement(name.tag("detail-item"))
export class DetailsItem extends LitElement {
  @property({ type: Boolean }) open = false;
  static styles = css`
  :host{
    --height:auto;
  }
  dl.open {
    height: calc(2em + var(--height));
  }
  svg{
    transition: all .3s ease-in-out;
    margin-left: auto;
  }
  .open svg{
    transform: rotate(-90deg);
  }
  dl{
    margin: 0;
    height: 2em;
    line-height: 2em;
    overflow: hidden;
    transition: all .3s ease-in-out;
  }
  dt{
    height: 2em;
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
  dd{
    display:flex;
    margin: 0;
  }
  div{
    height: fit-content;
  }
  `;
  render() {
    return html`
    <dl class=${this.open ? "open" : ""} >
      <dt @click=${this.toggle}><slot name="title"></slot>
        <svg width="16" height="16" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>
      </dt>
      <dd>
        <div>
          <slot></slot>
        </div>
      </dd>
    </dl>
    `;
  }
  firstUpdated() {
    this.shadowRoot.querySelector("dl").style.setProperty("--height", this.shadowRoot.querySelector("dd").clientHeight + "px");
  }
  toggle() {
    this.shadowRoot.querySelector("dl").style.setProperty("--height", this.shadowRoot.querySelector("dd").clientHeight + "px");
    this.shadowRoot.querySelector("dl").classList.toggle("open");
    this.open = !this.open;
  }
  isopen() {
    return this.open;
  }
}
@customElement(name.tag("details-group"))
export class DetailsGroup extends LitElement {
  @property() index = 0;
  @property({ type: Boolean }) only = false;

  static styles = css`
  `;
  pre: number;
  constructor() {
    super();
    this.pre = 0;
    this.addEventListener("click", this.itemclick);
  }
  render() {
    return html`
    <slot></slot>
    `;
  }
  firstUpdated() {
    const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.index] as DetailsItem;
    if (opened) {
      if (opened.toggle) {
        opened.toggle();
      }
      opened.setAttribute("open", "");
    }
    this.pre = this.index;
    if (this.only) {
      this.shadowRoot.querySelector("slot").assignedElements().forEach((item, index) => {
        item.setAttribute("only", String(index));
      });
    }
  }
  itemclick(e) {
    let target = e.target;
    while (target.parentNode != this) {
      target = target.parentNode;
    }
    if (target.hasAttribute("only")) {
      const index = target.getAttribute("only");
      if (this.pre != index) {
        const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.pre] as DetailsItem;
        if (opened) {
          if (opened.toggle) {
            opened.toggle();
          }
          opened.removeAttribute("open");
        }
        this.pre = index;
      }
    }
  }
  reset() {
    console.log(this.index);
    const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.index] as DetailsItem;
    if (opened) {
      if (opened.isopen && !opened.isopen()) {
        opened.toggle();
      }
      opened.setAttribute("open", "");
    }
    this.shadowRoot.querySelector("slot").assignedElements().forEach((e, i) => {
      if (i != this.index) {
        if ((<DetailsItem>e).isopen) {
          if ((<DetailsItem>e).isopen()) {
            (<DetailsItem>e).toggle();
          }
        }
        e.removeAttribute("open");
      }
    });
    this.pre = this.index;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "detail-item": DetailsItem;
    "details-group": DetailsGroup;
  }
}