import { INetworkScanner } from '../../domain/interfaces/INetworkScanner';
import { ScanResponseDto } from '../dtos/ScanResponseDto';
import { NetworkScanRequestDto } from '../dtos/NetworkScanRequestDto';
export declare class AnalyzeNetworkUseCase {
    private readonly networkScanner;
    constructor(networkScanner: INetworkScanner);
    execute(request: NetworkScanRequestDto): Promise<ScanResponseDto>;
}
//# sourceMappingURL=AnalyzeNetworkUseCase.d.ts.map