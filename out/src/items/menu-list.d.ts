import { LitElement } from "lit";
export declare class MenuList extends LitElement {
    summary: string;
    static styles: import("lit").CSSResult;
    open: boolean;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    toggle(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "menu-list": MenuList;
    }
}
//# sourceMappingURL=menu-list.d.ts.map