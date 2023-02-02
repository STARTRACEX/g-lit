var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from "Lit";
import { property, customElement } from "lit/decorators.js";
import { name } from '../config';
export class AlertItem extends LitElement {
    constructor() {
        super(...arguments);
        this.call = "info";
        this.autoclose = 0;
    }
    get _alert() {
        return this.shadowRoot.querySelector('.alert');
    }
    render() {
        if (this.autoclose)
            setTimeout(() => this.close(), this.autoclose);
        return html `
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
AlertItem.styles = css `
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
AlertItem.properties = {
    autoclose: { type: Number },
    call: {}
};
__decorate([
    property()
], AlertItem.prototype, "call", void 0);
__decorate([
    property({ type: Number })
], AlertItem.prototype, "autoclose", void 0);
let DetailsItem = class DetailsItem extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
    }
    render() {
        return html `
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
};
DetailsItem.styles = css `
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
__decorate([
    property({ type: Boolean })
], DetailsItem.prototype, "open", void 0);
DetailsItem = __decorate([
    customElement(name.tag("detail-item"))
], DetailsItem);
export { DetailsItem };
let DetailsGroup = class DetailsGroup extends LitElement {
    constructor() {
        super();
        this.index = 0;
        this.only = false;
        this.pre = 0;
        this.addEventListener("click", this.itemclick);
    }
    render() {
        return html `
    <slot></slot>
    `;
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
};
DetailsGroup.styles = css `
  `;
__decorate([
    property()
], DetailsGroup.prototype, "index", void 0);
__decorate([
    property({ type: Boolean })
], DetailsGroup.prototype, "only", void 0);
DetailsGroup = __decorate([
    customElement(name.tag("details-group"))
], DetailsGroup);
export { DetailsGroup };
