import { Request, Response, NextFunction } from 'express';
import { AnalyzeNetworkUseCase } from '../../application/use-cases/AnalyzeNetworkUseCase';
import { NetworkScanRequestDto } from '../../application/dtos/NetworkScanRequestDto';

export class NetworkScanController {
    constructor(private readonly analyzeNetworkUseCase: AnalyzeNetworkUseCase) { }

    async scan(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto: NetworkScanRequestDto = req.body;
            const result = await this.analyzeNetworkUseCase.execute(dto);

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
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
