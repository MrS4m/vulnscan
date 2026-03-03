"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeWebsiteUseCase = void 0;
const WebUrl_1 = require("../../domain/value-objects/WebUrl");
const ScanResultMapper_1 = require("../mappers/ScanResultMapper");
class AnalyzeWebsiteUseCase {
    constructor(webScanner) {
        this.webScanner = webScanner;
    }
    async execute(request) {
        // Validate URL through Value Object
        const webUrl = WebUrl_1.WebUrl.create(request.target);
        // Execute scan through the scanner port
        const scanResult = await this.webScanner.scan(webUrl.toString(), request.scanType);
        // Mark scan as completed
        scanResult.complete();
        // Map to DTO and return
        return ScanResultMapper_1.ScanResultMapper.toDto(scanResult);
    }
}
exports.AnalyzeWebsiteUseCase = AnalyzeWebsiteUseCase;
//# sourceMappingURL=AnalyzeWebsiteUseCase.js.map