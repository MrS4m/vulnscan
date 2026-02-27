import './Header.css';

export function Header() {
    return (
        <header className="header" role="banner">
            <div className="header-content">
                <div className="header-logo">
                    <div className="header-icon" aria-hidden="true">
                        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20 2L4 10v10c0 9.55 6.82 18.48 16 20 9.18-1.52 16-10.45 16-20V10L20 2z"
                                stroke="url(#shield-gradient)"
                                strokeWidth="2"
                                fill="none"
                            />
                            <path
                                d="M20 8L10 13v6c0 6 4 11.5 10 13 6-1.5 10-7 10-13v-6L20 8z"
                                fill="url(#shield-fill)"
                                opacity="0.3"
                            />
                            <circle cx="20" cy="19" r="4" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none">
                                <animate attributeName="r" values="4;5;4" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="20" cy="19" r="1.5" fill="var(--accent-cyan)">
                                <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
                            </circle>
                            <defs>
                                <linearGradient id="shield-gradient" x1="4" y1="2" x2="36" y2="32">
                                    <stop offset="0%" stopColor="var(--accent-cyan)" />
                                    <stop offset="100%" stopColor="var(--accent-purple)" />
                                </linearGradient>
                                <linearGradient id="shield-fill" x1="10" y1="8" x2="30" y2="27">
                                    <stop offset="0%" stopColor="var(--accent-cyan)" />
                                    <stop offset="100%" stopColor="var(--accent-purple)" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="header-text">
                        <h1 className="header-title">
                            <span className="text-gradient">VulnScanner</span>
                        </h1>
                        <p className="header-subtitle">Network & Web Vulnerability Analysis</p>
                    </div>
                </div>
                <div className="header-status">
                    <span className="status-dot" aria-hidden="true"></span>
                    <span className="status-text">API Online</span>
                </div>
            </div>
        </header>
    );
}
