import { html, css, LitElement } from '../core/lit-core.min.js';

export class NavLayout extends LitElement {
  static styles = css`
  :host{
      --nav: rgb(28  28  31);
      --a: rgb(40 160 150 / 56%);
      --txt:rgb(240 240 240)
  }
  nav{
    background-color:var(--nav);
  }
  .option{
    background-color: var(--nav);
  }
  .option a:hover{
    background-color:var(--a)
  }
  h1,a{
    color:var(--txt);
  }
  nav{
    height:48px;
    z-index:999;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding:0 2.5%;
    box-sizing: border-box;
    margin: auto;
  }
  a{
    text-decoration:none;
    color:rgb(240, 240, 240);
  }
  h1 {
      font-weight:normal;
      margin:0;
      font-size: 145%;
  }
  nav>div{
    height:100%;
    display: flex;
    flex-direction: row;
  }
  .personal, .setting {
    height:40px;
    margin-top: 3px;
    padding :2.5px 5px;
    position: relative;
  }
  .option{
    width: max-content;
    visibility: hidden;
    overflow: hidden;
    position: absolute;
    top: 44px;
    z-index: 999;
  }
  .option:hover,
  .setting:hover>.option,
  .personal:hover>.option {
    visibility: visible;
  }
  .setting .option {
    right: -15.5%;
    padding-bottom: 0.2px;
  }
  .personal .option {
    right: -28.4%;
  }
  .option a {
    height:46px;
    line-height:46px;
    text-align:center;
    display: block;
    padding: 0px 18px;
    text-align: center;
    transition: background-color 152ms;
  }
  .option a:hover{
    transform: scale(1.025);
  }
  `;
  static properties = {
    title: { },
    set: { type: Number },
    foo: { type: Boolean },
  };

  constructor() {
    super();
    this.set = 2;
  }

  render() {
    return html`
    <nav>
      <h1>
        <a href="/">TITLE</a>
        ${this.subhead()}
      </h1>
      <div>
        ${this.opt()}
      </div>
    </nav>
      <slot></slot>
    ${this.footer()}
    `;
  }
  subhead() {
    if (!this.title) return;
    return html`
    <span>|</span>
    <span>${this.title}</span>
    `;
  }
  opt() {
    if (this.set >= 2) {
      return html`${personal}${setting}`;
    }
    if (this.set >= 1) {
      return setting;
    }
  }



  footer() {
    if (this.foo) return;
    return html`
    <footer>
      footer
    </footer>
    `;
  }
  // firstUpdated() {
  //   console.log(window.location.pathname);
  // }
}
customElements.define('nav-layout', NavLayout);
const personal = html`
  <div class="personal">
    <a href="/account">
      <svg t="1650462239564" class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="1703" width="32" height="32"><path d="M512 0a512 512 0 1 1 0 1024A512 512 0 0 1 512 0z m0 654.222222a425.927111 425.927111 0 0 0-336.440889 164.238222A454.087111 454.087111 0 0 0 512 967.111111a453.973333 453.973333 0 0 0 336.440889-148.593778A425.699556 425.699556 0 0 0 512 654.222222zM512 56.888889a455.111111 455.111111 0 0 0-372.849778 716.231111 482.247111 482.247111 0 0 1 280.519111-166.968889 227.555556 227.555556 0 1 1 184.604445 0.113778 482.133333 482.133333 0 0 1 280.576 166.684444A455.111111 455.111111 0 0 0 512 56.888889z m0 170.666667a170.666667 170.666667 0 1 0 0 341.333333 170.666667 170.666667 0 0 0 0-341.333333z m102.627556 176.526222a28.444444 28.444444 0 0 1 8.021333 35.555555l-2.730667 4.323556-8.817778 11.548444a125.553778 125.553778 0 0 1-209.237333-14.904889 28.444444 28.444444 0 0 1 49.607111-27.875555 68.664889 68.664889 0 0 0 109.909334 13.539555l4.551111-5.347555 8.817777-11.548445a28.444444 28.444444 0 0 1 39.879112-5.290666z" fill="#f7f7f7" p-id="1704"></path></svg></a>
    <div class="option" id="personalOption">
      <a href="/personal">个人</a>
    </div>
  </div>
`;
const setting = html`
<div class="setting">
  <a><svg width="32" height="32" viewBox="0 0 48 48" fill="none"><rect width="48" height="48" fill="white" fill-opacity="0.01" /><path d="M18.2838 43.1712C14.9327 42.1735 11.9498 40.3212 9.58787 37.8669C10.469 36.8226 11 35.4733 11 34C11 30.6863 8.31371 28 5 28C4.79955 28 4.60139 28.0098 4.40599 28.029C4.13979 26.7276 4 25.3801 4 24C4 21.9094 4.32077 19.8937 4.91579 17.9994C4.94381 17.9998 4.97188 18 5 18C8.31371 18 11 15.3137 11 12C11 11.0487 10.7786 10.1491 10.3846 9.34999C12.6975 7.19937 15.5205 5.5899 18.6521 4.72302C19.6444 6.66807 21.6667 8.00001 24 8.00001C26.3333 8.00001 28.3556 6.66807 29.3479 4.72302C32.4795 5.5899 35.3025 7.19937 37.6154 9.34999C37.2214 10.1491 37 11.0487 37 12C37 15.3137 39.6863 18 43 18C43.0281 18 43.0562 17.9998 43.0842 17.9994C43.6792 19.8937 44 21.9094 44 24C44 25.3801 43.8602 26.7276 43.594 28.029C43.3986 28.0098 43.2005 28 43 28C39.6863 28 37 30.6863 37 34C37 35.4733 37.531 36.8226 38.4121 37.8669C36.0502 40.3212 33.0673 42.1735 29.7162 43.1712C28.9428 40.7518 26.676 39 24 39C21.324 39 19.0572 40.7518 18.2838 43.1712Z" fill="none" stroke="#f7f7f7" stroke-width="3" stroke-linejoin="round" /><path d="M24 31C27.866 31 31 27.866 31 24C31 20.134 27.866 17 24 17C20.134 17 17 20.134 17 24C17 27.866 20.134 31 24 31Z" fill="none" stroke="#f7f7f7" stroke-width="3" stroke-linejoin="round" />  </svg>
  </a>
  <div class="option"> 
    <a id="lang_zh" href="">简体中文</a>
    <a id="lang_en" href="">English</a>
    <a id="lang_ru" href="">русский</a>
  </div>
</div>
`;