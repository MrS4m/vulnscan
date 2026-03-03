"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebUrl = void 0;
class WebUrl {
    constructor(value) {
        this.value = value;
    }
    static create(url) {
        if (!WebUrl.isValid(url)) {
            throw new Error(`Invalid URL: ${url}. Must start with http:// or https://`);
        }
        return new WebUrl(url.trim());
    }
    static isValid(url) {
        try {
            const parsed = new URL(url.trim());
            return ['http:', 'https:'].includes(parsed.protocol);
        }
        catch {
            return false;
        }
    }
    get protocol() {
        return new URL(this.value).protocol.replace(':', '');
    }
    get hostname() {
        return new URL(this.value).hostname;
    }
    get isHttps() {
        return this.protocol === 'https';
    }
    toString() {
        return this.value;
    }
}
exports.WebUrl = WebUrl;
//# sourceMappingURL=WebUrl.js.map