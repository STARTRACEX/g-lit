import { LitElement } from 'lit';
export declare class SelectInput extends LitElement {
    static styles: import("lit").CSSResult;
    pla: string;
    m: boolean;
    def: string;
    autofocus: boolean;
    value: any[];
    name: string;
    text: Array<string>;
    get assigned(): any;
    render(): import("lit-html").TemplateResult<1>;
    constructor();
    firstUpdated(): void;
    select(value: string, text?: any): void;
    focus(): void;
    close(): void;
    open(): void;
    _handleInput(): void;
    namevalue(): any[];
    reset(): void;
}
//# sourceMappingURL=select-input.d.ts.map