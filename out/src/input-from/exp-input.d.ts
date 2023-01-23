import { LitElement } from 'lit';
export declare class ExpInput extends LitElement {
    static styles: import("lit").CSSResult;
    label: string;
    name: string;
    id: string;
    pla: string;
    type: string;
    value: string;
    def: string;
    base: string;
    offset: string;
    get _input(): HTMLInputElement;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    input(i: any): void;
    _clear(): void;
    namevalue(): string[];
}
//# sourceMappingURL=exp-input.d.ts.map