export class SeverityLevel {
    private static readonly VALID_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const;

    private constructor(public readonly value: typeof SeverityLevel.VALID_LEVELS[number]) { }

    static create(level: string): SeverityLevel {
        const upper = level.toUpperCase() as typeof SeverityLevel.VALID_LEVELS[number];
        if (!SeverityLevel.VALID_LEVELS.includes(upper)) {
            throw new Error(`Invalid severity level: ${level}. Must be one of: ${SeverityLevel.VALID_LEVELS.join(', ')}`);
        }
        return new SeverityLevel(upper);
    }

    static LOW = new SeverityLevel('LOW');
    static MEDIUM = new SeverityLevel('MEDIUM');
    static HIGH = new SeverityLevel('HIGH');
    static CRITICAL = new SeverityLevel('CRITICAL');

    get numericValue(): number {
        const map: Record<string, number> = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
        return map[this.value];
    }

    isHigherThan(other: SeverityLevel): boolean {
        return this.numericValue > other.numericValue;
    }

    toString(): string {
        return this.value;
    }
}
