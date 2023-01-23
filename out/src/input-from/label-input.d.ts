import { LitElement } from 'lit';
declare type base = "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "image";
export declare class LabelInput extends LitElement {
    type: base;
    label: string;
    def: string;
    pla: string;
    name: string;
    id: string;
    value: string;
    static styles: import("lit").CSSResult;
    get _input(): HTMLInputElement;
    render(): import("lit-html").TemplateResult<1>;
    handleinput(i: any): void;
    clear(): void;
    namevalue(): string[];
}
declare global {
    interface HTMLElementTagNameMap {
        'label-input': LabelInput;
    }
}
export {};
//# sourceMappingURL=label-input.d.ts.map