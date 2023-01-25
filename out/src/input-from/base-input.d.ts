import { LitElement } from 'lit';
declare type inputtype = "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "image";
export declare class BaseInput extends LitElement {
    get _input(): HTMLInputElement;
    get _ranged(): Element;
    label: string;
    name: string;
    id: string;
    pla: string;
    type: inputtype;
    value: string | number;
    def: string | number;
    min: number;
    max: number;
    step: number;
    constructor();
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    handleRange(e: any): void;
    handleInput(e: any): void;
    reset(): void;
    returnbytype(): import("lit-html").TemplateResult<1>;
    namevalue(): (string | number)[];
}
declare global {
    interface HTMLElementTagNameMap {
        "base-input": BaseInput;
    }
}
export {};
//# sourceMappingURL=base-input.d.ts.map