import { LitElement } from "Lit";
export declare class DetailsItem extends LitElement {
    open: boolean;
    static styles: import("Lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    toggle(): void;
    isopen(): boolean;
}
declare global {
    interface HTMLElementTagNameMap {
        "details-item": DetailsItem;
    }
}
//# sourceMappingURL=details-item.d.ts.map