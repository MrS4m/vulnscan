"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyzeNetworkUseCase = void 0;
const IpAddress_1 = require("../../domain/value-objects/IpAddress");
const ScanResultMapper_1 = require("../mappers/ScanResultMapper");
class AnalyzeNetworkUseCase {
    constructor(networkScanner) {
        this.networkScanner = networkScanner;
    }
    async execute(request) {
        // Validate IP through Value Object
        const ipAddress = IpAddress_1.IpAddress.create(request.target);
        // Execute scan through the scanner port
        const scanResult = await this.networkScanner.scan(ipAddress.toString(), request.scanType);
        // Mark scan as completed
        scanResult.complete();
        // Map to DTO and return
        return ScanResultMapper_1.ScanResultMapper.toDto(scanResult);
    }
}
exports.AnalyzeNetworkUseCase = AnalyzeNetworkUseCase;
//# sourceMappingURL=AnalyzeNetworkUseCase.js.map