var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, css, html } from "Lit";
import { property, customElement } from "lit/decorators.js";
import { name } from '../config';
let DetailsItem = class DetailsItem extends LitElement {
    constructor() {
        super(...arguments);
        this.open = false;
    }
    render() {
        return html `
    <dl class=${this.open ? "open" : "close"} >
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
    customElement(name.tag("details-item"))
], DetailsItem);
export { DetailsItem };
