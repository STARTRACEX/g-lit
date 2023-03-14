var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { name } from "../config.js";
const selcls = `${name.tag('select-input')}-selected`;
let SelectInput = class SelectInput extends LitElement {
    constructor() {
        super(...arguments);
        this.pla = '';
        this.m = false;
        this.def = '';
        this.autofocus = false;
        this.value = [];
        this.name = '';
        this.text = [];
    }
    get assigned() {
        return this.shadowRoot.querySelector('slot').assignedElements();
    }
    render() {
        return html `<div>
      <section>
        ${this.lists()}
      </section>
      <input @focus=${this.focus} @input=${this._handleInput} placeholder=${this.pla} />
    <svg viewBox="0 0 48 48" fill="none"><path d="M36 19L24 31L12 19H36Z" fill="currentColor" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/></svg>
      <aside><slot></slot></aside>
    </div>
    `;
    }
    lists() {
        var itemTemplates = [];
        if (this.value.length)
            for (const i in this.value) {
                itemTemplates.push(html `<i class="selected-item">${this.text[i] || this.value[i]}
        <svg @click=${() => { this.select(this.value[i]); }} t="1678769821062" viewBox="0 0 1024 1024" version="1.1" p-id="2770"><path d="M960 512c0-249.6-198.4-448-448-448S64 262.4 64 512s198.4 448 448 448 448-198.4 448-448zM691.2 736L512 556.8 332.8 736c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-32 0-44.8L467.2 512 288 332.8c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0L512 467.2 691.2 288c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L556.8 512 736 691.2c12.8 12.8 12.8 32 0 44.8-12.8 12.8-32 12.8-44.8 0z" fill="currentColor" p-id="2771"></path></svg>
        </i>`);
            }
        return html `${itemTemplates}`;
    }
    firstUpdated() {
        this.reset();
        if (this.autofocus)
            this.focus();
        this.assigned.forEach((option) => {
            if (option.value) {
                option.addEventListener("click", () => {
                    this.select(option.value, option.innerText);
                });
            }
            else if (option.children) {
                [...option.children].forEach(option => {
                    option.addEventListener("click", () => {
                        this.select(option.value, option.innerText);
                    });
                });
            }
        });
        document.addEventListener("click", (e) => {
            if (!this.m && e.target != this || this.m && !this.contains(e.target)) {
                this.close();
            }
        });
    }
    select(value, text = undefined) {
        if (text === undefined) {
            this.assigned.forEach((option) => {
                if (option.value) {
                    if (option.value == value) {
                        text = option.innerText;
                    }
                }
                else if (option.children) {
                    [...option.children].forEach(option => {
                        if (option.value == value) {
                            text = option.innerText;
                        }
                    });
                }
            });
        }
        if (this.m) {
            if (this.value.includes(value)) {
                this.value = this.value.filter(v => v != value);
                this.text = this.text.filter(v => v != text);
            }
            else {
                this.value.push(value);
                this.text.push(text);
            }
            this.shadowRoot.querySelector("input").value = this.text.join("; ");
        }
        else {
            this.shadowRoot.querySelector("input").value = text;
            this.value[0] = value;
        }
        this.assigned.forEach((option) => {
            if (option.value) {
                if (this.value.includes(option.value)) {
                    option.classList.add(selcls);
                }
                else {
                    option.classList.remove(selcls);
                }
            }
            else if (option.children) {
                [...option.children].forEach(option => {
                    if (this.value.includes(option.value)) {
                        option.classList.add(selcls);
                    }
                    else {
                        option.classList.remove(selcls);
                    }
                });
            }
        });
        this.requestUpdate();
        this.dispatchEvent(new CustomEvent("change", { detail: this.namevalue() }));
    }
    focus() {
        this.shadowRoot.querySelector("input").focus();
        this.open();
    }
    close() {
        this.shadowRoot.querySelector("aside").style.visibility = "hidden";
    }
    open() {
        this.shadowRoot.querySelector("aside").style.visibility = "visible";
    }
    _handleInput() {
        let value = this.shadowRoot.querySelector("input").value.trim();
        if (this.m && value.includes(";")) {
            value = value.split(";").pop().trim();
        }
        this.assigned.forEach(option => {
            if (option.value) {
                option.style.display = "block";
            }
            if (option.children) {
                option.style.display = "block";
                [...option.children].forEach(option => {
                    option.style.display = "block";
                });
            }
        });
        if (value) {
            this.assigned.forEach(option => {
                if (option.value) {
                    if (option.value.toLowerCase().includes(value.toLowerCase())) {
                        option.style.display = "block";
                    }
                    else {
                        option.style.display = "none";
                    }
                }
                else if (option.children) {
                    [...option.children].forEach(option => {
                        if (option.value.toLowerCase().includes(value.toLowerCase())) {
                            option.style.display = "block";
                        }
                        else {
                            option.style.display = "none";
                        }
                    });
                    if ([...option.children].filter(option => option.style.display == "block").length == 0) {
                        option.style.display = "none";
                    }
                }
            });
        }
        this.dispatchEvent(new CustomEvent("input", { detail: this.namevalue() }));
    }
    namevalue() {
        if (!this.m) {
            return [this.name, this.value[0]];
        }
        return [this.name, this.value];
    }
    reset() {
        this.value = [];
        this.text = [];
        this.shadowRoot.querySelector("input").value = "";
        this.assigned.forEach((option) => {
            if (option.value) {
                option.classList.remove(selcls);
            }
            else if (option.children) {
                [...option.children].forEach(option => {
                    option.classList.remove(selcls);
                });
            }
        });
        if (this.def) {
            if (this.m) {
                this.def.split(";").forEach(def => {
                    if (def.trim())
                        this.select(def.trim(), undefined);
                });
            }
            else {
                if (this.def.split(";")[0].trim())
                    this.select(this.def.split(";")[0].trim(), undefined);
            }
        }
    }
};
SelectInput.styles = css `
  :host{
    display: inline-flex;
    border: 1px solid #192230;
    border-radius: 0.25em;
  }
  input{
    cursor:inherit;
    width: 100%;
    box-sizing: border-box;
    padding-right: 1.25em;
    border:inherit;
    outline: none;
    border-radius:inherit;
  }
  div{
    display: inline-flex;
    position: relative;
    width: 100%;
    border-radius:inherit;
  }
  input+svg{
    position: absolute;
    height: 100%;
    right: 0;
    pointer-events: none;
  }
  aside{
    margin-top: 1px;
    position: absolute;
    top:100%;
    width: 100%;
    visibility: hidden;
    z-index: 1;
    border-radius:inherit;
  }
  section{
    max-width:calc(100% - 1.2em);
    height: 100%;
    position: absolute;
    overflow: hidden;
    pointer-events: none;
    border-radius:inherit;
  }
  i.selected-item{
    height: 100%;
    display: inline-flex;
    font-family: normal;
    background-color: pink;
    align-items: center;
    border-radius:0;
  }
  i.selected-item svg{
    height:.8em;
    pointer-events: all;
  }
  `;
__decorate([
    property()
], SelectInput.prototype, "pla", void 0);
__decorate([
    property({ type: Boolean })
], SelectInput.prototype, "m", void 0);
__decorate([
    property()
], SelectInput.prototype, "def", void 0);
__decorate([
    property()
], SelectInput.prototype, "autofocus", void 0);
__decorate([
    property({ type: Array })
], SelectInput.prototype, "value", void 0);
__decorate([
    property()
], SelectInput.prototype, "name", void 0);
SelectInput = __decorate([
    customElement(name.tag('select-input'))
], SelectInput);
export { SelectInput };
