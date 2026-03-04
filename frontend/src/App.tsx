import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthLayout } from './layouts/AuthLayout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import Scanner from './pages/Scanner';
import { ProtectedRoute } from './components/layouts/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
    const { user, isLoading } = useAuth();

    // Previne flickering renderizando a tela de carregamento até resolver o status do JWT
    if (isLoading) {
        return (
            <div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <div className="btn-spinner" style={{ width: 40, height: 40, borderTopColor: 'var(--accent-cyan)' }}></div>
            </div>
        );
    }

    return (
        <Routes>
            {/* Rotas Públicas (Autenticação) */}
            <Route element={<AuthLayout />}>
                {/* Se já estiver logado, redireciona para o scanner (dashboard) */}
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" replace /> : <Login />}
                />
                <Route
                    path="/register"
                    element={user ? <Navigate to="/" replace /> : <Register />}
                />
            </Route>

            {/* Rotas Privadas (Aplicações Core) */}
            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Scanner />} />
                {/* Adicione outras rotas privadas aqui (Settings, Histórico, etc) */}
            </Route>

            {/* Rota Fallback (404) */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
