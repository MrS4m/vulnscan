import type { PortDto } from '../types';
import './PortTable.css';

interface PortTableProps {
    ports: PortDto[];
}

export function PortTable({ ports }: PortTableProps) {
    if (ports.length === 0) return null;

    return (
        <section className="port-section" aria-label="Open ports">
            <h2 className="section-title">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
                    <line x1="7" y1="2" x2="7" y2="22" />
                    <line x1="17" y1="2" x2="17" y2="22" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
                Open Ports ({ports.length})
            </h2>

            <div className="port-table-wrapper glass">
                <table className="port-table" role="table">
                    <thead>
                        <tr>
                            <th scope="col">Port</th>
                            <th scope="col">Protocol</th>
                            <th scope="col">Service</th>
                            <th scope="col">Version</th>
                            <th scope="col">State</th>
                            <th scope="col">Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ports.map((port, index) => (
                            <tr
                                key={index}
                                className="animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.04}s` }}
                            >
                                <td className="port-number">{port.port}</td>
                                <td className="port-protocol">{port.protocol.toUpperCase()}</td>
                                <td className="port-service">{port.service}</td>
                                <td className="port-version">{port.version || '—'}</td>
                                <td>
                                    <span className={`state-badge state-${port.state}`}>
                                        <span className="state-dot" aria-hidden="true"></span>
                                        {port.state}
                                    </span>
                                </td>
                                <td>
                                    <span className={`severity-badge severity-${port.risk.toLowerCase()}`}>
                                        {port.risk}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
