import { IpAddress } from '../../domain/value-objects/IpAddress';
import { INetworkScanner } from '../../domain/interfaces/INetworkScanner';
import { ScanResultMapper } from '../mappers/ScanResultMapper';
import { ScanResponseDto } from '../dtos/ScanResponseDto';
import { NetworkScanRequestDto } from '../dtos/NetworkScanRequestDto';

export class AnalyzeNetworkUseCase {
    constructor(private readonly networkScanner: INetworkScanner) { }

    async execute(request: NetworkScanRequestDto): Promise<ScanResponseDto> {
        // Validate IP through Value Object
        const ipAddress = IpAddress.create(request.target);

        // Execute scan through the scanner port
        const scanResult = await this.networkScanner.scan(
            ipAddress.toString(),
            request.scanType
        );

        // Mark scan as completed
        scanResult.complete();

        // Map to DTO and return
        return ScanResultMapper.toDto(scanResult);
    }
}
