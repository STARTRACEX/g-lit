import { LitElement } from "Lit";
export declare class DetailsItem extends LitElement {
    summary: string;
    open: boolean;
    fill: boolean;
    static styles: import("Lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    toggle(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "details-item": DetailsItem;
    }
}
//# sourceMappingURL=details-item.d.ts.map