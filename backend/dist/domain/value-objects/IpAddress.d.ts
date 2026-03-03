export declare class IpAddress {
    readonly value: string;
    private constructor();
    static create(ip: string): IpAddress;
    private static isValid;
    private static isValidIPv4;
    private static isValidIPv6;
    get isPrivate(): boolean;
    toString(): string;
}
//# sourceMappingURL=IpAddress.d.ts.map