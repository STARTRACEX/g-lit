var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config";
let ShadeItem = class ShadeItem extends LitElement {
    constructor() {
        super(...arguments);
        this.key = false;
        this.scale = false;
        this.call = "center";
        this.close = () => true;
    }
    get _aside() {
        return this.shadowRoot.querySelector('aside');
    }
    render() {
        return html ` <aside class=${this.call} @click=${(e => { e.stopPropagation(); })}>
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
        if (s)
            scale = Number(s[1]);
        if (e.deltaY > 0)
            scale -= 0.1;
        else
            scale += 0.1;
        this._aside.style.transform = `scale(${scale})`;
    }
    keydown(e) {
        if (e.key == 'Escape')
            this._close();
    }
};
ShadeItem.styles = css `:host {
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
__decorate([
    property({ type: Boolean })
], ShadeItem.prototype, "key", void 0);
__decorate([
    property({ type: Boolean })
], ShadeItem.prototype, "scale", void 0);
__decorate([
    property({ type: String })
], ShadeItem.prototype, "call", void 0);
__decorate([
    property({ type: Function })
], ShadeItem.prototype, "close", void 0);
ShadeItem = __decorate([
    customElement(name.tag("shade-item"))
], ShadeItem);
export { ShadeItem };
