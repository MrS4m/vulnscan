import { Outlet } from 'react-router-dom';
import './AuthLayout.css';

export function AuthLayout() {
    return (
        <div className="auth-layout">
            {/* Background Animated Gradient from index.css applies naturally globally */}
            <div className="auth-container animate-fade-in-up">

                {/* Header / Logo Component */}
                <div className="auth-header">
                    <div className="auth-logo">
                        <img src="/logo.png" alt="FlashScan" style={{ width: '340px', height: 'auto', objectFit: 'contain' }} />
                    </div>
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
