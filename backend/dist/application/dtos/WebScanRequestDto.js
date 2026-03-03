"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebScanRequestSchema = void 0;
const zod_1 = require("zod");
exports.WebScanRequestSchema = zod_1.z.object({
    target: zod_1.z.string().url('A valid URL is required'),
    scanType: zod_1.z.enum(['quick', 'full']).default('quick'),
});
//# sourceMappingURL=WebScanRequestDto.js.map