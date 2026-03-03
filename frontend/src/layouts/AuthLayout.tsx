import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export function AuthLayout() {
    return (
        <div className="auth-layout">
            {/* Background Animated Gradient from index.css applies naturally globally */}
            <div className="auth-container animate-fade-in-up">

                {/* Header / Logo Component */}
                <div className="auth-header">
                    <div className="auth-logo glow-cyan">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                            <path d="M12 8v4" />
                            <path d="M12 16h.01" />
                        </svg>
                    </div>
                    <h1>VulnScanner</h1>
                    <p className="auth-subtitle">Enterprise Security Assessment</p>
                </div>

                {/* Content Box (Login / Register Card) */}
                <div className="auth-content glass">
                    <Outlet />
                </div>

                {/* Footer info */}
                <div className="auth-footer">
                    <p>Authorized personnel only. All access is logged.</p>
                </div>

            </div>
        </div>
    );
}
