export declare const name: {
    prefix: string;
    suffix: string;
    tag: (origin: string) => string;
};
export declare const theme: import("lit").CSSResult;
/**
* Create element with args append to target
* @param target Appended target element or use document.querySelector(target) or document.body
* @param args tag:tag name, props:attribute, children:appended chindren, html:innerHTML
*/
export declare const append: (target: string | object, args: {
    tag: any;
    props?: any;
    children?: any;
    html?: any;
}) => void;
//# sourceMappingURL=config.d.ts.map