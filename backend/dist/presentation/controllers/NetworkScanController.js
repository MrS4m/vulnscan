"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkScanController = void 0;
class NetworkScanController {
    constructor(analyzeNetworkUseCase) {
        this.analyzeNetworkUseCase = analyzeNetworkUseCase;
    }
    async scan(req, res, next) {
        try {
            const dto = req.body;
            const result = await this.analyzeNetworkUseCase.execute(dto);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error.message?.includes('Invalid IP')) {
                res.status(400).json({
                    success: false,
                    error: 'Validation Error',
                    message: error.message,
                });
                return;
            }
            next(error);
        }
    }
}
exports.NetworkScanController = NetworkScanController;
//# sourceMappingURL=NetworkScanController.js.map