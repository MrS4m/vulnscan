import https from 'https';
import http from 'http';

export interface HttpResponse {
    statusCode: number;
    headers: Record<string, string | string[] | undefined>;
    body: string;
}

export class HttpClient {
    async get(url: string, timeoutMs: number = 10000): Promise<HttpResponse> {
        return new Promise((resolve, reject) => {
            const parsedUrl = new URL(url);
            const client = parsedUrl.protocol === 'https:' ? https : http;

            const req = client.get(
                url,
                {
                    timeout: timeoutMs,
                    headers: {
                        'User-Agent': 'FlashScan-API/1.0 (Security Research)',
                    },
                    rejectUnauthorized: false, // Allow self-signed certs for analysis
                },
                (res) => {
                    let body = '';
                    res.on('data', (chunk) => (body += chunk));
                    res.on('end', () => {
                        resolve({
                            statusCode: res.statusCode || 0,
                            headers: res.headers as Record<string, string | string[] | undefined>,
                            body,
                        });
                    });
                    res.on('error', (err) => {
                        reject(new Error(`Response stream error for ${url}: ${err.message}`));
                    });
                }
            );

            req.on('timeout', () => {
                req.destroy();
                reject(new Error(`Request to ${url} timed out after ${timeoutMs}ms`));
            });

            req.on('error', (err) => {
                reject(new Error(`HTTP request failed for ${url}: ${err.message}`));
            });
        });
    }
}
