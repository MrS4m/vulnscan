import { z } from 'zod';
export declare const NetworkScanRequestSchema: z.ZodObject<{
    target: z.ZodString;
    scanType: z.ZodDefault<z.ZodEnum<["quick", "full"]>>;
}, "strip", z.ZodTypeAny, {
    target: string;
    scanType: "quick" | "full";
}, {
    target: string;
    scanType?: "quick" | "full" | undefined;
}>;
export type NetworkScanRequestDto = z.infer<typeof NetworkScanRequestSchema>;
//# sourceMappingURL=NetworkScanRequestDto.d.ts.map