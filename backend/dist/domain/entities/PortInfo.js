"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortInfo = void 0;
class PortInfo {
    constructor(props) {
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
exports.PortInfo = PortInfo;
//# sourceMappingURL=PortInfo.js.map