import { LitElement } from 'lit';
export declare class AsidenavLayout extends LitElement {
    m: number;
    static styles: import("lit").CSSResult;
    render(): import("lit-html").TemplateResult<1>;
}
export declare class NavLayout extends LitElement {
    static styles: import("lit").CSSResult;
    title: string;
    set: number;
    foo: boolean;
    render(): import("lit-html").TemplateResult<1>;
    subhead(): import("lit-html").TemplateResult<1>;
    opt(): import("lit-html").TemplateResult<1>;
    footer(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'nav-layout': NavLayout;
        'asidenav-layout': AsidenavLayout;
    }
}
//# sourceMappingURL=nav-layout.d.ts.map