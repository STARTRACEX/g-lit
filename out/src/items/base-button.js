var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { name } from "../config";
const originstyle = css `
  :host {
    --color: #f0f0f0;
    --border: #444444;
    --background: #2c2c2c;
    --hover: #fafafa;
    --border-hover: #5a5a5a;
    --background-hover: #303030;
    --active: #fafafa;
    --border-active: #9a9a9a;
    --background-active: #252525;
    display:inline-flex;
  }
  
  .round {
    border-radius: 1.2em;
  }
  .ghost,
  .ghost:hover {
    color: var(--background);
    background-color: transparent;
  }
  .ghost:active {
    color: var(--active);
    background-color: var(--background-active);
  }
  button{
    font-size:inherit;
    border-radius:inherit;
    border-width:.08em ;
    border-color:var(--border);
    border-style:solid;
  min-width:2em;min-height:2em;width:fit-content;display:inline-flex;align-items:center;color:var(--color);background-color:var(--background);cursor:pointer;transition:all .3s}div{display:inline-flex;justify-content:center;align-items:center;vertical-align:middle;margin-right:.1em;margin-left:.1em}div:first-child{margin-left:.5em}div:last-child{margin-right:.5em}button:hover{color:var(--hover);border-color:var(--border-hover);background-color:var(--background-hover)}button:active{color:var(--active);border-color:var(--border-active);background-color:var(--background-active)}button[disabled],button[disabled]:hover,button[disabled]:active{color:var(--color-disabled);border-color:var(--border-disabled);background-color:var(--background-disabled)}
  `;
const colorful = css `.white {
    --color: #2c2c2c;
    --border: #44444470;
    --background: #f8f8f8;
    --hover: #707070;
    --border-hover: #444444a0;
    --background-hover: #f4f4f4;
    --border-active: #aaaaaa;
    --background-active: #aaaaaa;
  }
  .yellow {
    --color: #fafafa;
    --border: #44444470;
    --background: #ebb10d;
    --hover: #ececec;
    --border-hover: #444444a0;
    --background-hover: #f9bd10;
    --background-active: #d7a422;
    --border-active: var(--background-active);
  }
  .gary {
    --color: #fafafa;
    --border: #44444470;
    --background: #51535e;
    --hover: #ececec;
    --border-hover: #444444a0;
    --background-hover: #5e616d;
    --background-active: #3f3d47;
    --border-active: var(--background-active);
  }
  .red {
    --color: #fafafa;
    --border: #44444470;
    --background: #d11a2d;
    --hover: #ececec;
    --border-hover: #444444a0;
    --background-hover: #c62828;
    --background-active: #a61b29;
    --border-active: var(--background-active);
  }
  .blue {
    --color: #fafafa;
    --border: #44444470;
    --background: #1177b0;
    --hover: #ececec;
    --border-hover: #444444a0;
    --background-hover: #11659a;
    --background-active: #144a74;
    --border-active: var(--background-active);
  }
  .green {
    --color: #fafafa;
    --border: #44444470;
    --background: #12aa8c;
    --hover: #ececec;
    --border-hover: #444444a0;
    --background-hover: #1db68f;
    --background-active: #248067;
    --border-active: var(--background-active);
  }`;
let BaseButton = class BaseButton extends LitElement {
    constructor() {
        super(...arguments);
        this.disabled = false;
        this.round = false;
        this.ghost = false;
        this.color = "";
    }
    render() {
        return html `<button @click=${this.click} ?disabled=${this.disabled} class=${classMap({ round: this.round, ghost: this.ghost, [this.color]: this.color })}>
        <div><slot name="pre"></slot></div>
        <div><slot></slot></div> 
        <div><slot name="suf"></slot></div>   
      </button>`;
    }
    click() {
        this.dispatchEvent(new CustomEvent('click', { bubbles: true }));
    }
};
BaseButton.styles = [originstyle, colorful];
__decorate([
    property({ type: Boolean })
], BaseButton.prototype, "disabled", void 0);
__decorate([
    property({ type: Boolean })
], BaseButton.prototype, "round", void 0);
__decorate([
    property({ type: Boolean })
], BaseButton.prototype, "ghost", void 0);
__decorate([
    property()
], BaseButton.prototype, "color", void 0);
BaseButton = __decorate([
    customElement(name.tag("base-button"))
], BaseButton);
export { BaseButton };
