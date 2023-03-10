import { html, css, LitElement, ifDefined } from '../core/lit-all.min.js';
import { name } from './config.js';
export class SuperAuchor extends LitElement {
  static properties = {
    href: {},
    target: {},
    active: {},
    arrow: {},
  };
  static styles = css`:host{
    color:currentColor;
    text-decoration: none;
    cursor: pointer;
    }
    a{
      display: inline-flex;
      align-items: center;
      color:inherit;
      text-decoration:inherit;
    }
    i,::slotted([slot="icon"]){
      display: inline-flex;
      border-radius: 20%;
    }
    i>*,::slotted([slot="icon"]){
      width: 1em;
      height: 1em;
      border-radius: inherit
    }
    i>*:hover, ::slotted([slot="icon"]:hover){
      background-color: rgb(0 0 0 /.075);
    }
    :host(:hover) i>*,:host(:hover) ::slotted([slot="icon"]){
      animation: arrow .3s linear;
    }
    @keyframes arrow{
      from {transform: translateX(0)}
      50%{
        transform:translateX(.05em);
      }
      to {transform: translateX(0)}
    }`;
  render() {
    return html`<a href=${ifDefined(this.href)} target=${this.target}>
    <slot name="pre"></slot>
    <slot></slot>
    <slot name="suf"></slot>
    <i style="font-style:normal"><slot name="icon"></slot> ${this._arrowSwitcher()}</i>
  </a>`;
  }
  firstUpdated() {
    if (this.active && this.href) {
      var x = new URL(this.href, location.href);
      if (x.host === location.host && x.pathname === location.pathname) {
        this.classList.add(this.active);
      }
    }
  }
  _arrowSwitcher() {
    switch (this.arrow) {
      case "delta":
        return html`<svg viewBox="0 0 48 48" fill="none"><path d="M20 12L32 24L20 36V12Z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`;
      case "arrow":
        return html`<svg width="38" height="38" viewBox="0 0 48 48" fill="none" ><path d="M36 24.0083H12" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 12L36 24L24 36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case "angle":
        return html`<svg viewBox="0 0 48 48" fill="none"><path d="M19 12L31 24L19 36" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      case "hand":
        return html`<svg viewBox="-10 -5 64 58" fill="none"><path d="M10.0264 40.9736L10.0264 18.9736H4.02637L4.02637 40.9736H10.0264Z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M10.0264 18.9738C17.1493 12.4548 21.2772 8.71418 22.4102 7.75192C24.1096 6.30854 26.0304 6.91463 26.0304 10.5268C26.0304 14.139 20.7449 16.2222 20.7449 18.9738C20.7415 18.9902 27.5007 18.9913 41.0223 18.9771C42.6797 18.9753 44.0246 20.3174 44.0264 21.9748L44.0264 21.9779C44.0264 23.6371 42.6814 24.9821 41.0222 24.9821H33.0128C31.8039 32.9549 31.137 37.2894 31.012 37.9858C30.8244 39.0303 29.8274 40.9738 26.9583 40.9738C25.0456 40.9738 20.0683 40.9738 10.0264 40.9738V18.9738Z" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>`;
    }
  }
}
customElements.define(name.tag('super-a'), SuperAuchor);