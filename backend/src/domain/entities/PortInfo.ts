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

export class PortInfo {
    public readonly port: number;
    public readonly state: 'open' | 'closed' | 'filtered';
    public readonly protocol: 'tcp' | 'udp';
    public readonly service: string;
    public readonly version?: string;
    public readonly risk: SeverityLevel;
    public readonly details?: string;

    constructor(props: PortInfoProps) {
        this.port = props.port;
        this.state = props.state;
        this.protocol = props.protocol;
        this.service = props.service;
        this.version = props.version;
        this.risk = props.risk;
        this.details = props.details;
    }

    toJSON() {
        return {
            port: this.port,
            state: this.state,
            protocol: this.protocol,
            service: this.service,
            version: this.version || null,
            risk: this.risk.value,
            details: this.details || null,
        };
    }
}
