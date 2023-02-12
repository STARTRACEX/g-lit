import { LitElement, css, html } from "../core/lit-core.min.js";
export class DetailsItem extends LitElement {
  static properties = {
    open: { type: Boolean },
  };
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
    <dl class=${this.open ? "open" : "close"} >
      <dt @click=${this.toggle}><slot name="title"></slot>
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/></svg>
      </dt>
      <dd>
        <div>
          <slot></slot>
        </div>
      </dd>
    </dl>`;
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
export class DetailsGroup extends LitElement {
  static properties = {
    index: { type: Number },
    only: { type: Boolean }
  };
  constructor() {
    super();
    this.index = 0;
    this.pre = 0;
    this.only = false;
    this.addEventListener("click", this._handleClick);
  }
  render() {
    return html`<slot></slot>`;
  }
  firstUpdated() {
    const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.index];
    if (opened) {
      if (opened.toggle) {
        opened.toggle();
      }
      opened.setAttribute("open", "");
    }
    this.pre = this.index;
    // 添加唯一标识
    if (this.only) {
      this.shadowRoot.querySelector("slot").assignedElements().forEach((item, index) => {
        item.setAttribute("only", index);
      });
    }
  }
  _handleClick(e) {
    let target = e.target;
    while (target.parentNode != this) {
      target = target.parentNode;
    }
    if (target.hasAttribute("only")) {
      const index = target.getAttribute("only");
      if (this.pre != index) {
        const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.pre];
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
    const opened = this.shadowRoot.querySelector("slot").assignedElements()[this.index];
    if (opened) {
      if (opened.isopen && !opened.isopen()) {
        opened.toggle();
      }
      opened.setAttribute("open", "");
    }
    this.shadowRoot.querySelector("slot").assignedElements().forEach((e, i) => {
      if (i != this.index) {
        if (e.isopen) {
          if (e.isopen()) {
            e.toggle();
          }
        }
        e.removeAttribute("open");
      }
    });
    this.pre = this.index;
  }
}
import { name } from './config.js';
customElements.define(name.tag("details-item"), DetailsItem);
customElements.define(name.tag("details-group"), DetailsGroup);