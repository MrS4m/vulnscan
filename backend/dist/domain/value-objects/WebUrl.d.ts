export declare class WebUrl {
    readonly value: string;
    private constructor();
    static create(url: string): WebUrl;
    private static isValid;
    get protocol(): string;
    get hostname(): string;
    get isHttps(): boolean;
    toString(): string;
}
//# sourceMappingURL=WebUrl.d.ts.map