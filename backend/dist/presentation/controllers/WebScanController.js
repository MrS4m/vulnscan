"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebScanController = void 0;
class WebScanController {
    constructor(analyzeWebsiteUseCase) {
        this.analyzeWebsiteUseCase = analyzeWebsiteUseCase;
    }
    async scan(req, res, next) {
        try {
            const dto = req.body;
            const result = await this.analyzeWebsiteUseCase.execute(dto);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            if (error.message?.includes('Invalid URL')) {
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
exports.WebScanController = WebScanController;
//# sourceMappingURL=WebScanController.js.map