import { LitElement } from "lit";
export declare class ShadeItem extends LitElement {
    static styles: import("lit").CSSResult;
    key: boolean;
    scale: boolean;
    call: string;
    close: () => boolean;
    get _aside(): HTMLElement;
    render(): import("lit-html").TemplateResult<1>;
    _close(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    show(): void;
    hide(): void;
    wheel(e: any): void;
    keydown(e: any): void;
}
//# sourceMappingURL=call-item.d.ts.map