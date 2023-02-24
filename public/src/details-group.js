import { LitElement, html } from "../core/lit-core.min.js";
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
      if (!opened.open) {
        opened.toggle();
      }
      opened.setAttribute("open", "");
    }
    this.shadowRoot.querySelector("slot").assignedElements().forEach((e, i) => {
      if (i != this.index) {
        if (e.open) {
          e.toggle();
        }

        e.removeAttribute("open");
      }
    });
    this.pre = this.index;
  }
}
import { name } from './config.js';
customElements.define(name.tag("details-group"), DetailsGroup);