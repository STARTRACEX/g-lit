import { LitElement } from "lit";
export declare class SectionGroup extends LitElement {
    current: number;
    all: number;
    get _main(): HTMLElement;
    get _act(): Element;
    static styles: import("lit").CSSResult;
    index: string;
    split: boolean;
    v: boolean;
    reversal: boolean;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    slots(): import("lit-html").TemplateResult<1>;
    bar(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    resetindex(name: any, current: any): void;
}
export declare class ContentGroup extends LitElement {
    get _loading(): Element;
    static styles: import("lit").CSSResult;
    sort: string;
    col: string;
    inner: any[];
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    content(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "section-group": SectionGroup;
        "content-group": ContentGroup;
    }
}
//# sourceMappingURL=content-group.d.ts.map