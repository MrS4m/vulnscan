import { IWebScanner } from '../../domain/interfaces/IWebScanner';
import { ScanResponseDto } from '../dtos/ScanResponseDto';
import { WebScanRequestDto } from '../dtos/WebScanRequestDto';
export declare class AnalyzeWebsiteUseCase {
    private readonly webScanner;
    constructor(webScanner: IWebScanner);
    execute(request: WebScanRequestDto): Promise<ScanResponseDto>;
}
//# sourceMappingURL=AnalyzeWebsiteUseCase.d.ts.map