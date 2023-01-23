import { LitElement } from 'lit';
export declare class SignForm extends LitElement {
    reset: boolean;
    method: string;
    submit: (x: any) => void;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
    get _label_input(): NodeListOf<import("./label-input").LabelInput>;
    _reset(): void;
    _submit(e: any): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'sign-form': SignForm;
    }
}
//# sourceMappingURL=sign-form.d.ts.map