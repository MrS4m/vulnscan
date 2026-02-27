export class WebUrl {
    private constructor(public readonly value: string) { }

    static create(url: string): WebUrl {
        if (!WebUrl.isValid(url)) {
            throw new Error(`Invalid URL: ${url}. Must start with http:// or https://`);
        }
        return new WebUrl(url.trim());
    }

    private static isValid(url: string): boolean {
        try {
            const parsed = new URL(url.trim());
            return ['http:', 'https:'].includes(parsed.protocol);
        } catch {
            return false;
        }
    }

    get protocol(): string {
        return new URL(this.value).protocol.replace(':', '');
    }

    get hostname(): string {
        return new URL(this.value).hostname;
    }

    get isHttps(): boolean {
        return this.protocol === 'https';
    }

    toString(): string {
        return this.value;
    }
}
