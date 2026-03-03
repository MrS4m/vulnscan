import { useState } from 'react';
import { Header } from '../components/Header';
import { ScanForm } from '../components/ScanForm';
import { ScanResults } from '../components/ScanResults';
import { VulnerabilityList } from '../components/VulnerabilityList';
import { PortTable } from '../components/PortTable';
import { LoadingAnimation } from '../components/LoadingAnimation';
import { api } from '../services/api';
import type { ScanResultDto, ScanType, ScanMode } from '../types';
import '../App.css';

function Scanner() {
  const [isLoading, setIsLoading] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResultDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async (target: string, scanType: ScanType, scanMode: ScanMode) => {
    console.log(`Starting ${scanType} scan for: ${target} (${scanMode})`);
    setIsLoading(true);
    setError(null);
    setScanResult(null);

    try {
      const response = scanType === 'network'
        ? await api.scanNetwork(target, scanMode)
        : await api.scanWeb(target, scanMode);

      if (response.success && response.data) {
        setScanResult(response.data);
      } else {
        setError(response.message || 'An unknown error occurred.');
      }
    } catch (err) {
      setError((err as Error).message || 'Failed to connect to the API. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Header />

      <main className="main-content" role="main">
        <ScanForm onScan={handleScan} isLoading={isLoading} />

        {/* Error State */}
        {error && (
          <div className="error-banner animate-fade-in-up" role="alert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            <div className="error-content">
              <strong>Error</strong>
              <p>{error}</p>
            </div>
            <button
              className="error-dismiss"
              onClick={() => setError(null)}
              aria-label="Dismiss error"
            >
              ×
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && <LoadingAnimation />}

        {/* Results */}
        {scanResult && !isLoading && (
          <div className="results-container animate-fade-in">
            <ScanResults result={scanResult} />
            {scanResult.ports.length > 0 && <PortTable ports={scanResult.ports} />}
            <VulnerabilityList vulnerabilities={scanResult.vulnerabilities} />
          </div>
        )}

        {/* Empty State */}
        {!scanResult && !isLoading && !error && (
          <div className="empty-state">
            <div className="empty-state-icon" aria-hidden="true">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1" opacity="0.4">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <path d="M12 3l0 0" />
                <path d="M20 7l-8-4-8 4" />
                <path d="M20 7v3" />
                <path d="M4 7v3" />
              </svg>
            </div>
            <h2 className="empty-state-title">Ready to scan</h2>
            <p className="empty-state-text">
              Enter an IP address or URL above to start analyzing vulnerabilities.
            </p>
          </div>
        )}
      </main>

      <footer className="app-footer">
        <p>
          <span className="footer-icon" aria-hidden="true">🛡️</span>
          VulnScanner API — Educational & Defensive Security Tool
        </p>
      </footer>
    </div>
  );
}

export default Scanner;
