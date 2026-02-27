import { useState } from 'react';
import type { ScanType, ScanMode } from '../types';
import './ScanForm.css';

interface ScanFormProps {
    onScan: (target: string, scanType: ScanType, scanMode: ScanMode) => void;
    isLoading: boolean;
}

export function ScanForm({ onScan, isLoading }: ScanFormProps) {
    const [activeTab, setActiveTab] = useState<ScanType>('network');
    const [target, setTarget] = useState('');
    const [scanMode, setScanMode] = useState<ScanMode>('quick');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!target.trim()) return;
        onScan(target.trim(), activeTab, scanMode);
    };

    const placeholder = activeTab === 'network'
        ? 'Enter IP address (e.g. 192.168.1.1)'
        : 'Enter URL (e.g. https://example.com)';

    const icon = activeTab === 'network' ? '🔌' : '🌐';

    return (
        <section className="scan-form-section" aria-label="Vulnerability scan form">
            <div className="scan-form-card glass">
                {/* Tab Selector */}
                <div className="tab-selector" role="tablist" aria-label="Scan type">
                    <button
                        role="tab"
                        aria-selected={activeTab === 'network'}
                        className={`tab-button ${activeTab === 'network' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('network'); setTarget(''); }}
                        type="button"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                            <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                            <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                            <circle cx="12" cy="20" r="1" />
                        </svg>
                        Network Scan
                    </button>
                    <button
                        role="tab"
                        aria-selected={activeTab === 'web'}
                        className={`tab-button ${activeTab === 'web' ? 'active' : ''}`}
                        onClick={() => { setActiveTab('web'); setTarget(''); }}
                        type="button"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M2 12h20" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                        </svg>
                        Web Scan
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="scan-form">
                    <div className="input-row">
                        <div className="input-wrapper">
                            <span className="input-icon" aria-hidden="true">{icon}</span>
                            <input
                                id="scan-target"
                                type="text"
                                className="scan-input"
                                placeholder={placeholder}
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                disabled={isLoading}
                                aria-label={activeTab === 'network' ? 'IP address' : 'Website URL'}
                                autoComplete="off"
                                spellCheck={false}
                            />
                        </div>
                    </div>

                    <div className="form-controls">
                        <div className="mode-selector" role="radiogroup" aria-label="Scan mode">
                            <label className={`mode-option ${scanMode === 'quick' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="scanMode"
                                    value="quick"
                                    checked={scanMode === 'quick'}
                                    onChange={() => setScanMode('quick')}
                                    className="sr-only"
                                />
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                </svg>
                                Quick
                            </label>
                            <label className={`mode-option ${scanMode === 'full' ? 'active' : ''}`}>
                                <input
                                    type="radio"
                                    name="scanMode"
                                    value="full"
                                    checked={scanMode === 'full'}
                                    onChange={() => setScanMode('full')}
                                    className="sr-only"
                                />
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                    <circle cx="11" cy="11" r="8" />
                                    <path d="m21 21-4.35-4.35" />
                                </svg>
                                Full
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="scan-button"
                            disabled={isLoading || !target.trim()}
                            aria-busy={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="spinner" aria-hidden="true"></span>
                                    Scanning...
                                </>
                            ) : (
                                <>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <path d="M12 3l0 0" />
                                        <path d="M20 7l-8-4-8 4" />
                                        <path d="M20 7v3" />
                                        <path d="M4 7v3" />
                                    </svg>
                                    Start Scan
                                </>
                            )}
                        </button>
                    </div>
                </form>

                {/* Info box */}
                <div className="scan-info">
                    {activeTab === 'network' ? (
                        <p>
                            <strong>NMPA Engine</strong> — Analisa portas, serviços e vulnerabilidades conhecidas.
                            Suporta IPv4 e IPv6, redes internas e externas.
                        </p>
                    ) : (
                        <p>
                            <strong>ZAC Engine</strong> — Analisa headers HTTP, TLS, CORS, CSP, cookies e configurações de segurança do website.
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
}
