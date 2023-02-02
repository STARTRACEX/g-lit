import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config";
@customElement(name.tag("shade-item"))
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
  @property({ type: Boolean }) key = false;
  @property({ type: Boolean }) scale = false;
  @property({ type: String }) call = "center";
  @property({ type: Function }) close = () => true;


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
    this.removeEventListener('wheel', this.wheel);
  }
  show() {
    console.log(this.key);
    if (this.scale)
      this.addEventListener('wheel', this.wheel);
    if (this.key)
      document.addEventListener('keydown', e => this.keydown(e));
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
  wheel(e) {
    e.preventDefault();
    e.stopPropagation();
    let s = this._aside.style.transform.match(/scale\((.*)\)/);
    var scale = 1;
    if (s) scale = Number(s[1]);
    if (e.deltaY > 0) scale -= 0.1;
    else scale += 0.1;
    this._aside.style.transform = `scale(${scale})`;
  }
  keydown(e) {
    if (e.key == 'Escape')
      this._close();
  }
}