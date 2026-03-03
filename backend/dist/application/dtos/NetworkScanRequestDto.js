"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkScanRequestSchema = void 0;
const zod_1 = require("zod");
exports.NetworkScanRequestSchema = zod_1.z.object({
    target: zod_1.z.string().min(1, 'IP address is required'),
    scanType: zod_1.z.enum(['quick', 'full']).default('quick'),
});
//# sourceMappingURL=NetworkScanRequestDto.js.map