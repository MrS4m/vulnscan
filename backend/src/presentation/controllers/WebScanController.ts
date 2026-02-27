import { Request, Response, NextFunction } from 'express';
import { AnalyzeWebsiteUseCase } from '../../application/use-cases/AnalyzeWebsiteUseCase';
import { WebScanRequestDto } from '../../application/dtos/WebScanRequestDto';

export class WebScanController {
    constructor(private readonly analyzeWebsiteUseCase: AnalyzeWebsiteUseCase) { }

    async scan(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const dto: WebScanRequestDto = req.body;
            const result = await this.analyzeWebsiteUseCase.execute(dto);

            res.status(200).json({
                success: true,
                data: result,
            });
        } catch (error: any) {
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
