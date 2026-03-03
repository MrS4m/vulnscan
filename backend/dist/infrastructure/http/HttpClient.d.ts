export interface HttpResponse {
    statusCode: number;
    headers: Record<string, string | string[] | undefined>;
    body: string;
}
export declare class HttpClient {
    get(url: string, timeoutMs?: number): Promise<HttpResponse>;
}
//# sourceMappingURL=HttpClient.d.ts.map