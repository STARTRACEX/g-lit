import { LitElement } from "lit";
export declare class BaseButton extends LitElement {
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    round: boolean;
    ghost: boolean;
    color: string;
    render(): import("lit-html").TemplateResult<1>;
    click(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "base-button": BaseButton;
    }
}
//# sourceMappingURL=base-button.d.ts.map