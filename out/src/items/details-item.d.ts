import { LitElement } from "Lit";
export declare class AlertItem extends LitElement {
    static styles: import("Lit").CSSResult;
    call: string;
    autoclose: number;
    static properties: {
        autoclose: {
            type: NumberConstructor;
        };
        call: {};
    };
    get _alert(): Element;
    render(): import("lit-html").TemplateResult<1>;
    close(): void;
}
export declare class DetailsItem extends LitElement {
    open: boolean;
    static styles: import("Lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    toggle(): void;
    isopen(): boolean;
}
export declare class DetailsGroup extends LitElement {
    index: number;
    only: boolean;
    static styles: import("Lit").CSSResult;
    pre: number;
    constructor();
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    itemclick(e: any): void;
    reset(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "detail-item": DetailsItem;
        "details-group": DetailsGroup;
    }
}
//# sourceMappingURL=details-item.d.ts.map