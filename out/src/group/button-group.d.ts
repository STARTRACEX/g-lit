import { LitElement } from "lit";
export declare class ButtonGroup extends LitElement {
    /**
     * @param h - Disable horizontal internal fillets 禁用水平内部圆角
     * @param v - Disable vertical interior fillets 禁用垂直内部圆角
     */
    h: boolean;
    v: boolean;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "button-group": ButtonGroup;
    }
}
//# sourceMappingURL=button-group.d.ts.map