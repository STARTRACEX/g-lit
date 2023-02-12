import { LitElement, css, html } from "Lit";
import { property, customElement } from "lit/decorators.js";
import { name } from '../config';

@customElement(name.tag("details-item"))
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
}
declare global {
  interface HTMLElementTagNameMap {
    "details-item": DetailsItem;
  }
}