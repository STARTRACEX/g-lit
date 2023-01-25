import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { name } from "../config";
@customElement(name.tag("switch-item"))
export class BaseButton extends LitElement {
  get _input() {
    return this.renderRoot?.querySelector('input') ?? null;
  }
  static styles = css`:host,span {
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
      background: #ccc;
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
      background-color: #4aafdf;
    }

    .rect input:checked~aside .false,
    .rect .true {
      background-color: #ccc;
    }

    .fat aside {
      width: 1.26em;
      height: 1.26em;
      border-radius: 50%;
      background: #fafafa;
      transition: .3s;
      left: .12em;
      top: .12em;
      bottom: .12em;
    }

    .fat {
      border-radius: 0.75em;
    }

    .fat input:checked {
      background: #4AAFDF;
    }

    .fat input:checked~aside {
      left: calc(100% - .12em - 1.26em);
      right: 0.12em;
    }

    .fat input:checked~aside .true,
    .fat .false {
      display: block;
    }

    .fat input:checked~aside .false,
    .fat .true {
      display: none;
    }`;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) fat = false;
  @property() def = "";
  @property() name = "checkbox";
  @property() value = "on";
  render() {
    return html`<span class=${this.fat ? "fat" : "rect"}>
    <input @change=${this.changecheck} ?disabled=${this.disabled} ?checked=${this.checked} name=${this.name} value=${this.value} type="checkbox">
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
    try {
      this.checked = JSON.parse(this.def);
    } catch {
      this.checked = false;
    }
    this._input.checked = this.checked;
  }
  changecheck(e) {
    this.checked = e.target.checked;
  }
  namevalue() {
    if (this._input.checked)
      return [this.name, this.value];
    return [undefined, undefined];
  }
}