import { SeverityLevel } from '../value-objects/SeverityLevel';
export interface PortInfoProps {
    port: number;
    state: 'open' | 'closed' | 'filtered';
    protocol: 'tcp' | 'udp';
    service: string;
    version?: string;
    risk: SeverityLevel;
    details?: string;
}
export declare class PortInfo {
    readonly port: number;
    readonly state: 'open' | 'closed' | 'filtered';
    readonly protocol: 'tcp' | 'udp';
    readonly service: string;
    readonly version?: string;
    readonly risk: SeverityLevel;
    readonly details?: string;
    constructor(props: PortInfoProps);
    toJSON(): {
        port: number;
        state: "open" | "closed" | "filtered";
        protocol: "tcp" | "udp";
        service: string;
        version: string | null;
        risk: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
        details: string | null;
    };
}
//# sourceMappingURL=PortInfo.d.ts.map