"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeverityLevel = void 0;
class SeverityLevel {
    constructor(value) {
        this.value = value;
    }
    static create(level) {
        const upper = level.toUpperCase();
        if (!SeverityLevel.VALID_LEVELS.includes(upper)) {
            throw new Error(`Invalid severity level: ${level}. Must be one of: ${SeverityLevel.VALID_LEVELS.join(', ')}`);
        }
        return new SeverityLevel(upper);
    }
    get numericValue() {
        const map = { LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
        return map[this.value];
    }
    isHigherThan(other) {
        return this.numericValue > other.numericValue;
    }
    toString() {
        return this.value;
    }
}
exports.SeverityLevel = SeverityLevel;
SeverityLevel.VALID_LEVELS = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
SeverityLevel.LOW = new SeverityLevel('LOW');
SeverityLevel.MEDIUM = new SeverityLevel('MEDIUM');
SeverityLevel.HIGH = new SeverityLevel('HIGH');
SeverityLevel.CRITICAL = new SeverityLevel('CRITICAL');
//# sourceMappingURL=SeverityLevel.js.map