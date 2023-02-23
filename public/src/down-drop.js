import { html, css, LitElement } from '../core/lit-core.min.js';
import { name } from './config.js';
export class DownDrop extends LitElement {
  static styles = css`
  main{
    height:100%;
    width:100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
  }
  div{
    background-color:inherit;
    position: absolute;
    visibility: hidden;
    top:100%;
  }
  slot[name="hover"]:hover~div,div:hover{
    visibility: visible;
  }
  `;
  get div() {
    return this.shadowRoot.querySelector("div");
  }
  render() {
    return html`
    <slot name="hover"></slot>
    <slot name="focus" @click=${this.toggle}></slot>
    <div><slot></slot></div>`;
  }
  firstUpdated() {
    if (this.querySelector('[slot="focus"]')) {
      document.addEventListener('click', (e) => {
        if (!this.contains(e.target)) {
          this.close();
        }
      });
    }
    this.asyncrect();
  }
  async asyncrect() {
    return new Promise(() => {
      setTimeout(() => {
        this.rect();
      }, 0);
    });
  }
  rect() {
    const offsets = this.offsetParent?.getBoundingClientRect() || document.body.getBoundingClientRect();
    const div = this.div;
    const divLeft = div.getBoundingClientRect().left;
    const divTop = div.getBoundingClientRect().top;
    const divRight = div.getBoundingClientRect().right;
    const RightWidth = offsets.width - (divRight - offsets.x);
    const LeftWidth = offsets.width - (offsets.right - divLeft);
    if (divLeft < 0) {
      div.style.transform = `translateX(${-LeftWidth}px)`;
    } else if (divRight > offsets.right) {
      div.style.transform = `translateX(${RightWidth}px)`;
    } else {
      div.style.transform = `translateX(0)`;
    }
  }
  close() {
    this.div.style.visibility = "hidden";
  }
  open() {
    this.div.style.visibility = "visible";
  }
  toggle() {
    this.div.style.visibility === "visible" ? this.close() : this.open();
  }
}
customElements.define(name.tag('down-drop'), DownDrop);