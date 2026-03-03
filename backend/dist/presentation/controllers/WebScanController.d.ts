import { Request, Response, NextFunction } from 'express';
import { AnalyzeWebsiteUseCase } from '../../application/use-cases/AnalyzeWebsiteUseCase';
export declare class WebScanController {
    private readonly analyzeWebsiteUseCase;
    constructor(analyzeWebsiteUseCase: AnalyzeWebsiteUseCase);
    scan(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=WebScanController.d.ts.map