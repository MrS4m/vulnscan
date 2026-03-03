import { useAuth } from '../contexts/AuthContext';
import './Header.css';

export function Header() {
    const { user, profile, signOut } = useAuth();

    return (
        <header className="header" role="banner">
            <div className="header-content">
                <div className="header-logo">
                    <div className="header-icon" aria-hidden="true">
                        <img src="/logo.png" alt="FlashScan" style={{ height: '80px', width: 'auto', objectFit: 'contain' }} />
                    </div>
                </div>
                <div className="header-status">
                    <span className="status-dot" aria-hidden="true"></span>
                    <span className="status-text">API Online</span>
                </div>
                <div className="header-actions">
                    {(profile || user) && (
                        <span className="user-greeting">
                            {profile?.full_name || user?.email || 'Operator'}
                        </span>
                    )}
                    <span className="header-divider" aria-hidden="true">|</span>
                    <button
                        onClick={signOut}
                        className="btn-logout"
                        aria-label="Sair da conta"
                        title="Encerrar sessão"
                    >
                        Sair
                    </button>
                </div>
            </div>
        </header>
    );
}
