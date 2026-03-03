"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IpAddress = void 0;
class IpAddress {
    constructor(value) {
        this.value = value;
    }
    static create(ip) {
        if (!IpAddress.isValid(ip)) {
            throw new Error(`Invalid IP address: ${ip}`);
        }
        return new IpAddress(ip.trim());
    }
    static isValid(ip) {
        return IpAddress.isValidIPv4(ip) || IpAddress.isValidIPv6(ip);
    }
    static isValidIPv4(ip) {
        const parts = ip.trim().split('.');
        if (parts.length !== 4)
            return false;
        return parts.every(part => {
            const num = Number(part);
            return Number.isInteger(num) && num >= 0 && num <= 255 && part === String(num);
        });
    }
    static isValidIPv6(ip) {
        const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$|^::$|^(([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4})?::(([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4})?$/;
        return ipv6Regex.test(ip.trim());
    }
    get isPrivate() {
        const parts = this.value.split('.').map(Number);
        if (parts.length !== 4)
            return false;
        // 10.0.0.0/8
        if (parts[0] === 10)
            return true;
        // 172.16.0.0/12
        if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
            return true;
        // 192.168.0.0/16
        if (parts[0] === 192 && parts[1] === 168)
            return true;
        // 127.0.0.0/8
        if (parts[0] === 127)
            return true;
        return false;
    }
    toString() {
        return this.value;
    }
}
exports.IpAddress = IpAddress;
//# sourceMappingURL=IpAddress.js.map