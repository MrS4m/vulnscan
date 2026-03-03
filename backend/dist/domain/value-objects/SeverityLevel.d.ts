export declare class SeverityLevel {
    readonly value: typeof SeverityLevel.VALID_LEVELS[number];
    private static readonly VALID_LEVELS;
    private constructor();
    static create(level: string): SeverityLevel;
    static LOW: SeverityLevel;
    static MEDIUM: SeverityLevel;
    static HIGH: SeverityLevel;
    static CRITICAL: SeverityLevel;
    get numericValue(): number;
    isHigherThan(other: SeverityLevel): boolean;
    toString(): string;
}
//# sourceMappingURL=SeverityLevel.d.ts.map