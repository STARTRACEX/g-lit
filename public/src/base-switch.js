import { LitElement, html, css } from '../core/lit-core.min.js';
import { name, theme } from "./config.js";
export class BaseSwitch extends LitElement {
  static styles = [theme, css`:host,span {
      display: inline-flex;
      font-size: inherit;
      position: relative;
      align-items: center;
      border-radius: inherit;
    }

    input {
      margin: 0;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      position: relative;
      font-size: inherit;
      width: 3em;
      height: 1.5em;
      background-color: var(--input-false);
      border-radius: inherit;
      transition: all .3s;
    }

    aside {
      pointer-events: none;
      transition: .3s;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      font-size: inherit;
      overflow: hidden;
      border-radius: inherit;
    }

    aside div {
      height: 100%;
    }

    input[disabled]~aside{
      filter:brightness(.87) ;
    }

    .rect .always {
      display: none;
    }

    .always {
      position: absolute;
    }

    .rect aside {
      height: 100%;
      width: 100%;
      left: 0;
    }

    .rect .true,
    .rect .false {
      width: 50%;
      text-align: center;
      transition: all .3s;
    }

    .rect input:checked~aside .true,
    .rect .false {
      background-color: var(--input-true);
    }

    .rect input:checked~aside .false,
    .rect .true {
      background-color: var(--input-false);
    }

    .fat aside {
      width: 1.20em;
      height: 1.20em;
      border-radius: 50%;
      background-color: var(--input-control);
      transition: .3s;
      left: .15em;
      top: .15em;
      bottom: .15em;
    }

    .fat {
      border-radius: 0.75em;
    }

    .fat input:checked {
      background-color: var(--input-true);
    }

    .fat input:checked~aside {
      left: calc(100% - .15em - 1.20em);
      right: 0.15em;
    }

    .fat input:checked~aside .true,
    .fat .false {
      display: block;
    }

    .fat input:checked~aside .false,
    .fat .true {
      display: none;
    }`];
  static properties = {
    fat: { type: Boolean },
    disabled: { type: Boolean },
    checked: { type: Boolean },
    def: {},
    name: {},
    value: {}
  };
  get _input() {
    return this.renderRoot?.querySelector('input') ?? null;
  }
  render() {
    return html`<span class=${this.fat ? "fat" : "rect"}>
    <input @change=${this._handleChange} ?disabled=${this.disabled} ?checked=${this.checked} name=${this.name || "checkbox"} value=${this.value || "on"} type="checkbox" >
    <aside>
      <div class="false"><slot name="false"></slot></div>
      <div class="always"><slot></slot><slot name="always"></slot></div>
      <div class="true"><slot name="true"></slot></div>
    </aside></span>`;
  }
  firstUpdated() {
    if (this.checked !== true)
      try {
        this.checked = JSON.parse(this.def);
      } catch {
        this.checked = false;
      }
  }
  reset() {
    if (this.def)
      try {
        this.checked = JSON.parse(this.def);
      } catch {
        this.checked = false;
      }
    this._input.checked = this.checked;
  }
  _handleChange(e) {
    this.checked = e.target.checked;
    this.dispatchEvent(new CustomEvent('change', { detail: this.checked }));
    this.dispatchEvent(new CustomEvent('input', { detail: this.checked }));
  }
  namevalue() {
    if (this._input.checked)
      return [this.name, this.value];
    return [undefined, undefined];
  }
}
customElements.define(name.tag('base-switch'), BaseSwitch);