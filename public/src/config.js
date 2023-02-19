import { css, html } from "../core/lit-core.min.js";
export const name = {
  host: html`Host`,
  prefix: "",
  suffix: "",
  tag: (origin) => name.prefix + origin + name.suffix,
};
export const theme = css`
/* @layer host{ */
  :host{
    
    --text:rgb(240 240 240);
    --shadow: rgb(0 0 0 / 55%);
    --nav-background: rgb(28  28  31);
    --nav-super: rgb(40 160 150 / 55%);
    
    --input-outline: rgb(25, 130, 180);
    --input-outline-focus: rgb(29, 155, 180);
    --input-background: rgb(36, 34, 34);
    --input-background-hover: rgb(42, 42, 42);
    
    --input-control:rgb(244 244 244);
    --input-true: rgb(47 129 237);
    --input-false: rgb(204 204 204);
    
  }
  *{
    color:inherit
  }
/* } */
`;
/**
* Create element with args append to target
* @param target Appended target element or use document.querySelector(target) or document.body
* @param args tag:tag name, props:attribute, children:appended chindren, html:innerHTML
*/
export const append = (target, args) => {
  if (!args) return;
  target = (typeof target === 'string' ? document.querySelector(target) : target) || document.body;
  const { tag, props, children, html } = args;
  const element = document.createElement(tag);
  if (props) {
    Object.keys(props).forEach((prop) => {
      // element[prop] = props[prop];
      element.setAttribute(prop, props[prop] === true ? '' : props[prop]);
    });
  };
  if (html) element.innerHTML = html;
  if (children) {
    if (children.length) /* Iterators exist */ {
      [...children].forEach((child) => {
        typeof child === "string" ? element.appendChild(document.createTextNode(child)) : element.appendChild(child);
      });
    } else {
      typeof children === "string" ? element.appendChild(document.createTextNode(children)) : element.appendChild(children);
    }
  }
  target.appendChild(element);
};