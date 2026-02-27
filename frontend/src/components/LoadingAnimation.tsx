import './LoadingAnimation.css';

export function LoadingAnimation() {
    return (
        <div className="loading-container" role="status" aria-label="Scanning in progress">
            <div className="loading-scanner">
                <div className="scanner-ring ring-1" aria-hidden="true"></div>
                <div className="scanner-ring ring-2" aria-hidden="true"></div>
                <div className="scanner-ring ring-3" aria-hidden="true"></div>
                <div className="scanner-core" aria-hidden="true">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                        <path d="M12 11v2" />
                    </svg>
                </div>
            </div>
            <div className="loading-text">
                <p className="loading-title">Analyzing target</p>
                <p className="loading-subtitle">
                    <span className="loading-dots">
                        <span>.</span><span>.</span><span>.</span>
                    </span>
                </p>
            </div>
        </div>
    );
}
