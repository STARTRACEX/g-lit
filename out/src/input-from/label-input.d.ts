import { LitElement } from 'lit';
declare type inputtype = "hidden" | "text" | "search" | "tel" | "url" | "email" | "password" | "datetime" | "date" | "month" | "week" | "time" | "datetime-local" | "number" | "range" | "color" | "checkbox" | "radio" | "file" | "image";
export declare class LabelInput extends LitElement {
    type: inputtype;
    label: string;
    def: string;
    pla: string;
    name: string;
    id: string;
    value: string;
    static styles: import("lit").CSSResult;
    get _input(): HTMLInputElement;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    input(i: any): void;
    clear(): void;
    namevalue(): string[];
    passwordtype(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'label-input': LabelInput;
    }
}
export {};
//# sourceMappingURL=label-input.d.ts.map