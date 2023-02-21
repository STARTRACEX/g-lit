import { LitElement } from 'lit';
export declare class SignForm extends LitElement {
    static styles: import("lit").CSSResult;
    get _from(): HTMLFormElement;
    render(): import("lit-html").TemplateResult<1>;
    firstUpdated(): void;
    reset(): void;
    namevalue(): {};
    submit(): {};
}
declare global {
    interface HTMLElementTagNameMap {
        'sign-form': SignForm;
    }
}
//# sourceMappingURL=sign-form.d.ts.map