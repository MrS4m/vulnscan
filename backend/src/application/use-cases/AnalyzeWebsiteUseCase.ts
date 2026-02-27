import { WebUrl } from '../../domain/value-objects/WebUrl';
import { IWebScanner } from '../../domain/interfaces/IWebScanner';
import { ScanResultMapper } from '../mappers/ScanResultMapper';
import { ScanResponseDto } from '../dtos/ScanResponseDto';
import { WebScanRequestDto } from '../dtos/WebScanRequestDto';

export class AnalyzeWebsiteUseCase {
    constructor(private readonly webScanner: IWebScanner) { }

    async execute(request: WebScanRequestDto): Promise<ScanResponseDto> {
        // Validate URL through Value Object
        const webUrl = WebUrl.create(request.target);

        // Execute scan through the scanner port
        const scanResult = await this.webScanner.scan(
            webUrl.toString(),
            request.scanType
        );

        // Mark scan as completed
        scanResult.complete();

        // Map to DTO and return
        return ScanResultMapper.toDto(scanResult);
    }
}
