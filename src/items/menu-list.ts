import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config";
@customElement(name.tag("menu-list"))
export class MenuList extends LitElement {
  @property() summary = "";
  static styles = css`
  .no-title{
    display: none;
  }
  .no-title+ul{
    margin: 0;
  }
  div{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    transition: all .3s ease-in-out;
    background-color:inherit;
  }
  div:empty{
    display: none;
  }
  ul{
    margin: 0.1em 0px 0px 0.3em;
    padding:0;
    overflow: hidden;
    transition:inherit;
    transition: all .3s ease-in-out;
    background-color:inherit;
  }
  span{
    display: inline-flex;
    align-items: center;
    flex:1;
  }
  i,::slotted([slot="icon"]){
    height: fit-content;
    display: inline-flex;
    align-items: center;
    border-radius: 20%;
    transition:inherit;
  }
  i>*,::slotted([slot="icon"]){
    width: 2em;
    height: 2em;
    padding: 0.25em;
    border-radius: inherit;
    transition: all .3s ease-in-out;
  }
  div>i:hover, ::slotted([slot="icon"]:hover){
    background-color: rgb(0 0 0 /.075);
  }
  .open i>i{
    transform: rotate(90deg);
  }
  `;
  open: boolean;
  render() {
    return html`<div>
      <span>${this.summary}
      <slot name="summary"></slot></span>
      <i>
        <i @click=${this.toggle}>
          <svg viewBox="0 0 48 48" fill="none"><path d="M19 12L31 24L19 36" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </i>
      </i>
    </div>
    <ul>
      <slot></slot>
    </ul>`;
  }
  firstUpdated() {
    this.open = true;
    if (!this.summary && !this.shadowRoot.querySelector('slot[name="summary"]').assignedNodes().length) {
      this.shadowRoot.querySelector('div').classList.add('no-title');
    }
    this.toggle();
  }
  toggle() {
    this.shadowRoot.querySelector('ul').style.height = (this.open ? this.shadowRoot.querySelector('ul').scrollHeight : "0") + 'px';
    this.shadowRoot.querySelector('div').classList.toggle('open');
    this.open = !this.open;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "menu-list": MenuList;
  }
}