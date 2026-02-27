import { z } from 'zod';

export const NetworkScanRequestSchema = z.object({
    target: z.string().min(1, 'IP address is required'),
    scanType: z.enum(['quick', 'full']).default('quick'),
});

export type NetworkScanRequestDto = z.infer<typeof NetworkScanRequestSchema>;
