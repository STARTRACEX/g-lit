var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { name } from '../config';
let DownDrop = class DownDrop extends LitElement {
    render() {
        return html `
    <slot name="hover"></slot>
    <slot name="focus" @click=${this.toggle}></slot>
    <div><slot></slot></div>`;
    }
    firstUpdated() {
        let div = this.shadowRoot.querySelector("div");
        let divRect = div.getBoundingClientRect();
        if (divRect.right > document.body.clientWidth) {
            var x = divRect.right - document.body.clientWidth;
            div.style.left = -x + "px";
        }
        if (divRect.bottom > document.body.clientHeight) {
            div.style.bottom = "100%";
        }
    }
    close() {
        this.shadowRoot.querySelector("div").style.visibility = "hidden";
    }
    open() {
        this.shadowRoot.querySelector("div").style.visibility = "visible";
    }
    toggle() {
        this.shadowRoot.querySelector("div").style.visibility == "visible" ? this.close() : this.open();
    }
};
DownDrop.styles = css `
  :host{
    color:inherit;
    background-color:inherit;
    position: relative;
  }
  div{
    background-color:inherit;
    position: absolute;
    visibility: hidden;
  }
  slot[name="hover"]:hover~div,div:hover{
    visibility: visible;
  }
  `;
DownDrop = __decorate([
    customElement(name.tag('down-drop'))
], DownDrop);
export { DownDrop };
