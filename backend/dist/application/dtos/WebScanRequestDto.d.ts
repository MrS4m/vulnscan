import { z } from 'zod';
export declare const WebScanRequestSchema: z.ZodObject<{
    target: z.ZodString;
    scanType: z.ZodDefault<z.ZodEnum<["quick", "full"]>>;
}, "strip", z.ZodTypeAny, {
    target: string;
    scanType: "quick" | "full";
}, {
    target: string;
    scanType?: "quick" | "full" | undefined;
}>;
export type WebScanRequestDto = z.infer<typeof WebScanRequestSchema>;
//# sourceMappingURL=WebScanRequestDto.d.ts.map