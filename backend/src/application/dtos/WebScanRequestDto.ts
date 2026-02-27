import { z } from 'zod';

export const WebScanRequestSchema = z.object({
    target: z.string().url('A valid URL is required'),
    scanType: z.enum(['quick', 'full']).default('quick'),
});

export type WebScanRequestDto = z.infer<typeof WebScanRequestSchema>;
