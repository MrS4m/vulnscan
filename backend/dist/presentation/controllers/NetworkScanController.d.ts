import { Request, Response, NextFunction } from 'express';
import { AnalyzeNetworkUseCase } from '../../application/use-cases/AnalyzeNetworkUseCase';
export declare class NetworkScanController {
    private readonly analyzeNetworkUseCase;
    constructor(analyzeNetworkUseCase: AnalyzeNetworkUseCase);
    scan(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=NetworkScanController.d.ts.map