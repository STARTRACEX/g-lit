export const name = {
  prefix: "",
  suffix: "",
  tag: (origin) => name.prefix + origin + name.suffix,
};
import { css } from "../core/lit-core.min.js";
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